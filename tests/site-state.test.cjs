const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const C=require('../assets/catalog-core.js');const data={window:{}};vm.runInNewContext(fs.readFileSync('assets/catalog.js','utf8'),data);
// Only the native element/event surface is modeled; production state/render code runs unchanged.
function harness(page,search=''){
 const ids={},listeners={},mutations=[];
 const document={body:{},activeElement:null,querySelectorAll:()=>[],querySelector:()=>null,getElementById:id=>ids[id]||null};
 class Element{
  constructor(){this.value='';this.options=[];this.events={};this.dataset={};this.checked=false;this.writes=0;}
  set innerHTML(value){this.html=value;this.writes++;}get innerHTML(){return this.html;}
  addEventListener(type,fn){this.events[type]=fn;}
  setAttribute(){}scrollIntoView(){}focus(){document.activeElement=this;}
  fire(type,event={}){this.events[type](event);}
 }
 const names=page==='compare'?['compare-result','swap-compare','share-compare',...['a','b'].flatMap(s=>['compare-search-'+s,'compare-cat-'+s,'compare-ready-'+s,'compare-reset-'+s,'compare-'+s,'compare-profile-'+s,'compare-count-'+s])]:['atlas-form','atlas-q','atlas-cat','atlas-country','atlas-image','atlas-sort','atlas-grid','atlas-pagination','result-count','filter-summary','no-results','clear-filters'];
 for(const id of names)ids[id]=new Element();
 const location={pathname:'/'+page+'/',search};
 const history=Object.fromEntries(['pushState','replaceState'].map(method=>[method,(_state,_title,url)=>{mutations.push({method,url});const parsed=new URL(url,'https://weapons.guidehollow.com');location.pathname=parsed.pathname;location.search=parsed.search;}]));
 const window={GHCore:C,GH_DATA:data.window.GH_DATA,GH_EDITORIAL:JSON.parse(fs.readFileSync('data/editorial.json')),addEventListener:(type,fn)=>{listeners[type]=fn;}};
 vm.runInNewContext(fs.readFileSync('assets/site.js','utf8'),{window,document,history,location,URLSearchParams,URL,setTimeout,clearTimeout,navigator:{}});
 return {ids,mutations,document,location,back:()=>{location.search='';listeners.popstate();}};
}
for(const side of ['a','b'])test('new comparison query after Back preserves restored history: '+side,()=>{
 const h=harness('compare'),input=h.ids['compare-search-'+side];input.value='F';input.fire('input');h.back();input.value='K';input.fire('input');assert.equal(h.mutations.at(-1).method,'pushState');
});
test('keyboard pagination moves focus to the announced results',()=>{
 const h=harness('atlas');const button={dataset:{page:'2'},disabled:false};h.ids['atlas-pagination'].fire('click',{target:{closest:()=>button}});assert.equal(h.document.activeElement,h.ids['result-count']);
});
test('profile-only filtering preserves the chosen pair and survives URL restoration',()=>{
 const h=harness('compare');h.ids['compare-ready-a'].checked=true;h.ids['compare-ready-a'].fire('change');
 assert.match(h.ids['compare-count-a'].textContent,/^6개/);
 assert.equal((h.ids['compare-a'].innerHTML.match(/<option /g)||[]).length,6);
 assert.equal(h.ids['compare-a'].value,'k2-black-panther');
 assert.equal(h.ids['compare-result'].writes,1,'filtering should not recreate the comparison table');
 const restored=harness('compare',h.location.search);
 assert.equal(restored.ids['compare-ready-a'].checked,true);
 assert.match(restored.ids['compare-count-a'].textContent,/^6개/);
 h.back();assert.equal(h.ids['compare-ready-a'].checked,false);assert.match(h.ids['compare-count-a'].textContent,/^337개/);
});
test('empty comparison results recover without losing the selected equipment or profile',()=>{
 const h=harness('compare','?a=m1-abrams&pa=m1a2-sepv3-au');
 h.ids['compare-search-a'].value='없는기종zzzz';h.ids['compare-search-a'].fire('input');
 h.ids['compare-ready-a'].checked=true;h.ids['compare-ready-a'].fire('change');
 assert.match(h.ids['compare-count-a'].textContent,/^0개 기종 일치.*현재 선택/);
 assert.match(h.ids['compare-a'].innerHTML,/현재 선택 · 검색 조건 밖/);
 assert.equal(h.ids['compare-reset-a'].disabled,false);
 h.ids['compare-reset-a'].fire('click');
 assert.equal(h.ids['compare-a'].value,'m1-abrams');assert.equal(h.ids['compare-profile-a'].value,'m1a2-sepv3-au');
 assert.equal(h.ids['compare-search-a'].value,'');assert.equal(h.ids['compare-ready-a'].checked,false);
 assert.equal(h.ids['compare-reset-a'].disabled,true);assert.equal(h.document.activeElement,h.ids['compare-search-a']);
 assert.equal(h.ids['compare-result'].writes,1);
 const params=new URLSearchParams(h.location.search);assert.equal(params.has('qa'),false);assert.equal(params.has('ra'),false);
});
test('swapping comparisons moves the profile filter with its equipment and search',()=>{
 const h=harness('compare','?a=f35-lightning-ii&pa=f35b&qa=F35&ra=1&b=m1-abrams&pb=m1a2-sepv3-au');
 h.ids['swap-compare'].fire('click');
 assert.equal(h.ids['compare-b'].value,'f35-lightning-ii');assert.equal(h.ids['compare-profile-b'].value,'f35b');
 assert.equal(h.ids['compare-ready-b'].checked,true);assert.equal(h.ids['compare-ready-a'].checked,false);
 assert.equal(h.ids['compare-search-b'].value,'F35');assert.equal(h.ids['compare-profile-a'].value,'m1a2-sepv3-au');
 assert.equal(new URLSearchParams(h.location.search).get('rb'),'1');
 assert.equal(h.ids['compare-result'].writes,2);
});
test('comparison choices put sourced profiles first while retaining every public entry once',()=>{
 const items=data.window.GH_DATA,selected=items.find(x=>x.slug==='k2-black-panther'),html=C.comparisonOptions(items,selected);
 assert.ok(html.indexOf('형식별 제원 있음')<html.indexOf('기본 정보 · 형식별 제원 미수집'));
 const slugs=[...html.matchAll(/<option value="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(slugs.length,items.length);assert.equal(new Set(slugs).size,items.length);
 assert.ok(slugs.slice(0,6).every(slug=>items.find(x=>x.slug===slug).profileIds.length));
 assert.equal((html.match(/ selected/g)||[]).length,1);
 const outside=C.comparisonOptions(items.filter(x=>x.slug!==selected.slug),selected);
 assert.equal((outside.match(/<option /g)||[]).length,items.length);assert.match(outside,/현재 선택 · 검색 조건 밖/);
});
