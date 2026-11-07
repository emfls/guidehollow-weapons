const {test,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),fixture=fs.mkdtempSync(path.join(os.tmpdir(),'weapons-page-assets-'));
after(()=>fs.rmSync(fixture,{recursive:true,force:true}));
for(const rel of ['scripts','data','templates','weapons','about','privacy','motion','assets/catalog-core.js','assets/style.css','assets/site.js']){
 const target=path.join(fixture,rel);fs.mkdirSync(path.dirname(target),{recursive:true});fs.cpSync(path.join(root,rel),target,{recursive:true});
}
for(const rel of ['atlas','compare'])fs.mkdirSync(path.join(fixture,rel));
execFileSync(process.execPath,[path.join(fixture,'scripts/build.mjs')],{stdio:'pipe'});

test('generated pages load catalog scripts only where interactive data is used',()=>{
 const catalog=JSON.parse(fs.readFileSync(path.join(root,'data/catalog.json'),'utf8'));
 const pages=['index.html','atlas/index.html','compare/index.html','about/index.html','privacy/index.html','motion/index.html',...catalog.map(x=>'weapons/'+x.slug+'/index.html')];
 for(const file of pages){
  const html=fs.readFileSync(path.join(fixture,file),'utf8');
  const scripts=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)].map(m=>new URL(m[1],'https://weapons.guidehollow.com').pathname);
  const interactive=['atlas/index.html','compare/index.html'].includes(file);
  for(const asset of ['catalog-core.js','catalog.js'])assert.equal(scripts.filter(x=>x==='/assets/'+asset).length,Number(interactive),file+': '+asset);
  assert.equal(scripts.filter(x=>x==='/assets/site.js').length,Number(file!=='motion/index.html'),file+': shared interactions');
  if(interactive)for(const asset of ['catalog-core.js','catalog.js'])assert.ok(scripts.indexOf('/assets/'+asset)<scripts.indexOf('/assets/site.js'),file+': dependency order');
 }
 execFileSync(process.execPath,[path.join(fixture,'scripts/build.mjs'),'--check'],{stdio:'pipe'});
});

test('detail link copy works without downloading the catalog or its core',async()=>{
 let click,copied,shown=false;
 const url='https://weapons.guidehollow.com/weapons/k9-thunder/';
 const button={dataset:{copy:url},addEventListener:(type,fn)=>{if(type==='click')click=fn;}};
 const toast={textContent:'',classList:{add:()=>{shown=true;},remove:()=>{shown=false;}}};
 const document={getElementById:()=>null,querySelectorAll:selector=>selector==='.copy-link'?[button]:[],querySelector:selector=>selector==='.toast'?toast:null};
 vm.runInNewContext(fs.readFileSync(path.join(root,'assets/site.js'),'utf8'),{
  window:{},document,navigator:{clipboard:{writeText:async value=>{copied=value;}}},setTimeout:()=>1,clearTimeout:()=>{}
 });
 assert.equal(typeof click,'function','copy handler must be registered without GHCore');
 await click();
 assert.equal(copied,url);
 assert.equal(shown,true);
 assert.match(toast.textContent,/복사했습니다/);
});
