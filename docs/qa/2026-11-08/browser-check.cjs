// Optional browser QA; production and CI still require only Node/Python standard libraries.
// Pass current and baseline repository directories. Install Playwright/Chromium separately.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.WEAPONS_PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(process.argv[2]||'.'),before=path.resolve(process.argv[3]||'../weapons-before');
const out=path.join(root,'docs/qa/2026-11-08'),shots=path.join(out,'screenshots');fs.mkdirSync(shots,{recursive:true});
const report={timestamp:new Date().toISOString(),baseline:'e7ad202dc1f983008963bc57d390ef29cd260ca4',cases:[],screens:[],scriptRequests:[],errors:[]};
async function serve(dir){
 const server=http.createServer((req,res)=>{
  let file=path.resolve(dir,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(dir+path.sep)&&file!==dir){res.writeHead(403);return res.end();}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404);return res.end('not found');}
  const type={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml'};
  res.writeHead(200,{'Content-Type':type[path.extname(file)]||'application/octet-stream','Content-Length':fs.statSync(file).size,'Cache-Control':'no-store'});fs.createReadStream(file).pipe(res);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));return {server,url:'http://127.0.0.1:'+server.address().port};
}
async function check(name,run){try{await run();report.cases.push({name,status:'pass'});}catch(e){report.cases.push({name,status:'fail',error:e.message});throw e;}}
async function snapshot(page,name){await page.screenshot({path:path.join(shots,name+'.png')});report.screens.push(name+'.png');}
async function main(){
 const current=await serve(root),baseline=await serve(before);let browser;
 try{
  browser=await chromium.launch({headless:true,...(process.env.WEAPONS_BROWSER_EXECUTABLE?{executablePath:process.env.WEAPONS_BROWSER_EXECUTABLE}:{})});
  report.browser=await browser.version();report.environment='Linux headless Chromium, local HTTP, no throttling, cache disabled';
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();page.on('pageerror',error=>report.errors.push(error.message));page.on('console',message=>{if(message.type()==='error')report.errors.push(message.text());});
  await page.goto(current.url+'/compare/');
  await check('337 comparison choices; sourced profiles are grouped first',async()=>{
   assert.equal(await page.locator('#compare-a option').count(),337);assert.equal(await page.locator('#compare-a optgroup').first().getAttribute('label'),'형식별 제원 있음');assert.equal(await page.locator('#compare-a optgroup').first().locator('option').count(),6);
  });
  const table=await page.locator('#compare-result table').elementHandle();
  await check('profile filter keeps the current pair and existing table',async()=>{
   await page.locator('#compare-ready-a').check();assert.equal(await page.locator('#compare-a option').count(),6);assert.equal(await page.locator('#compare-a').inputValue(),'k2-black-panther');assert.equal(await table.evaluate(el=>el.isConnected),true);assert.equal(new URL(page.url()).searchParams.get('ra'),'1');
  });
  await check('profile filter is restored by reload and Back/Forward',async()=>{
   await page.reload();assert.equal(await page.locator('#compare-ready-a').isChecked(),true);await page.locator('#compare-ready-a').uncheck();await page.goBack();assert.equal(await page.locator('#compare-ready-a').isChecked(),true);await page.goForward();assert.equal(await page.locator('#compare-ready-a').isChecked(),false);
  });
  await check('search and profile scope intersect, preserving open basic information',async()=>{
   await page.locator('.legacy-facts summary').first().click();await page.locator('#compare-ready-a').check();await page.locator('#compare-search-a').fill('F35');assert.match(await page.locator('#compare-count-a').innerText(),/^3개/);assert.equal(await page.locator('.legacy-facts').first().getAttribute('open'),'');
  });
  await check('variant selection updates the comparison and URL',async()=>{
   await page.locator('#compare-a').selectOption('f35-lightning-ii');await page.locator('#compare-profile-a').selectOption('f35b');assert.equal(new URL(page.url()).searchParams.get('pa'),'f35b');assert.match(await page.locator('#subject-a .profile-label').innerText(),/F-35B/);
  });
  await check('zero search results keep equipment and reset restores focus and filters',async()=>{
   await page.locator('#compare-cat-a').selectOption('해군함정');assert.match(await page.locator('#compare-count-a').innerText(),/^0개.*현재 선택/);assert.equal(await page.locator('#compare-a').inputValue(),'f35-lightning-ii');await page.locator('#compare-reset-a').click();assert.equal(await page.locator('#compare-search-a').inputValue(),'');assert.equal(await page.locator('#compare-cat-a').inputValue(),'');assert.equal(await page.locator('#compare-ready-a').isChecked(),false);assert.equal(await page.locator('#compare-profile-a').inputValue(),'f35b');assert.equal(await page.evaluate(()=>document.activeElement.id),'compare-search-a');
  });
  await check('selection outside profile filter remains available exactly once',async()=>{
   await page.locator('#compare-a').selectOption('leopard-2');await page.locator('#compare-ready-a').check();assert.equal(await page.locator('#compare-a option').count(),7);assert.equal(await page.locator('#compare-a option[value="leopard-2"]').count(),1);assert.equal(await page.locator('#compare-profile-a').isDisabled(),true);
  });
  await check('swap and shared URL retain side-specific filters and variants',async()=>{
   await page.goto(current.url+'/compare/?a=f35-lightning-ii&pa=f35b&qa=F35&ra=1&b=m1-abrams&pb=m1a2-sepv3-au');await page.locator('#swap-compare').click();assert.equal(await page.locator('#compare-b').inputValue(),'f35-lightning-ii');assert.equal(await page.locator('#compare-ready-b').isChecked(),true);assert.equal(await page.locator('#compare-search-b').inputValue(),'F35');assert.equal(await page.locator('#compare-profile-a').inputValue(),'m1a2-sepv3-au');await page.locator('#share-compare').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),page.url());
  });
  for(const width of [360,390,768,1440]){
   await page.setViewportSize({width,height:1000});await page.goto(current.url+'/compare/');
   await check('responsive comparison '+width+'px: no outer overflow, 44px label/button targets',async()=>{
    const values=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,targets:[...document.querySelectorAll('.profile-only,.picker-reset,.compare-actions button')].map(el=>({height:el.getBoundingClientRect().height,width:el.getBoundingClientRect().width})),broken:[...document.images].filter(im=>im.complete&&im.naturalWidth===0).length}));assert.ok(values.overflow<=1);assert.ok(values.targets.every(x=>x.height>=44&&x.width>=44));assert.equal(values.broken,0);
   });await snapshot(page,'after-compare-'+width);
  }
  await page.setViewportSize({width:390,height:1000});await page.locator('#compare-ready-a').focus();await page.keyboard.press('Space');await check('profile scope is operable from keyboard',async()=>assert.equal(await page.locator('#compare-ready-a').isChecked(),true));
  await page.locator('#compare-a').selectOption('f35-lightning-ii');await page.locator('#compare-search-a').fill('F35');await snapshot(page,'after-profile-filter-390');
  for(const width of [390,1440]){await page.setViewportSize({width,height:1000});await page.goto(baseline.url+'/compare/');await snapshot(page,'before-compare-'+width);}
  for(const [label,base] of [['before',baseline],['after',current]])for(const route of ['/','/weapons/k9-thunder/']){
   await page.goto(base.url+route);const requested=await page.evaluate(()=>performance.getEntriesByType('resource').filter(x=>x.initiatorType==='script').map(x=>new URL(x.name).pathname));
   const scripts=requested.map(file=>({path:file,fileBytes:fs.statSync(path.join(label==='before'?before:root,file)).size}));
   report.scriptRequests.push({label,route,scripts,requestedFileBytes:scripts.reduce((n,x)=>n+x.fileBytes,0)});
  }
  await check('home and detail no longer request catalog assets',async()=>{for(const row of report.scriptRequests.filter(x=>x.label==='after')){assert.equal(row.scripts.length,1);assert.ok(row.scripts.every(x=>!x.path.includes('catalog')));}});
  await check('detail permalink copy works with no catalog scripts',async()=>{await page.locator('.copy-link').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'https://weapons.guidehollow.com/weapons/k9-thunder/');assert.match(await page.locator('.toast').innerText(),/복사했습니다/);});
  await check('home search still navigates and filters the atlas',async()=>{await page.goto(current.url+'/');await page.getByRole('searchbox',{name:'무기 검색'}).fill('K9');await page.getByRole('button',{name:'검색',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/atlas/');assert.equal(await page.locator('#atlas-q').inputValue(),'K9');assert.ok(await page.locator('#atlas-grid .weapon-card').count()>0);});
  await check('atlas pagination retains keyboard focus and history',async()=>{await page.locator('#clear-filters').click();await page.locator('#atlas-pagination button').last().click();assert.equal(new URL(page.url()).searchParams.get('page'),'2');assert.equal(await page.evaluate(()=>document.activeElement.id),'result-count');await page.goBack();assert.equal(new URL(page.url()).searchParams.has('page'),false);});
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:1000}}),staticPage=await nojs.newPage();
  await check('without JavaScript the atlas offers all 337 links and hides inactive controls',async()=>{await staticPage.goto(current.url+'/atlas/');assert.equal(await staticPage.locator('.catalog-controls').isVisible(),false);assert.equal(await staticPage.locator('.atlas-pagination').isVisible(),false);await staticPage.locator('.all-entries summary').click();assert.equal(await staticPage.locator('.static-entry-links a').count(),337);assert.equal(await staticPage.locator('.static-entry-links a').first().isVisible(),true);await staticPage.locator('.all-entries').scrollIntoViewIfNeeded();await snapshot(staticPage,'after-nojs-atlas-390');await staticPage.locator('.static-entry-links a').first().click();assert.match(new URL(staticPage.url()).pathname,/^\/weapons\//);});
  await check('without JavaScript the default comparison remains readable without inactive controls',async()=>{await staticPage.goto(current.url+'/compare/');assert.equal(await staticPage.locator('.compare-pickers').isVisible(),false);assert.equal(await staticPage.locator('.compare-actions').isVisible(),false);assert.equal(await staticPage.locator('.comparison-coverage').isVisible(),false);assert.equal(await staticPage.locator('#compare-result table').isVisible(),true);await snapshot(staticPage,'after-nojs-compare-390');});
  await check('no page errors or console errors in tested flows',async()=>assert.deepEqual(report.errors,[]));
  await nojs.close();await context.close();
 }finally{
  await browser?.close();await Promise.all([new Promise(r=>current.server.close(r)),new Promise(r=>baseline.server.close(r))]);
  fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({cases:report.cases.length,passed:report.cases.filter(x=>x.status==='pass').length,screens:report.screens.length,scriptRequests:report.scriptRequests,errors:report.errors},null,2));
 }
}
main().catch(error=>{console.error(error.stack);process.exitCode=1;});
