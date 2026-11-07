const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const C=require('../assets/catalog-core.js');const data={window:{}};vm.runInNewContext(fs.readFileSync('assets/catalog.js','utf8'),data);
// Only the native element/event surface is modeled; production state/render code runs unchanged.
function harness(page){
 const ids={},listeners={},mutations=[];
 const document={body:{},activeElement:null,querySelectorAll:()=>[],querySelector:()=>null,getElementById:id=>ids[id]||null};
 class Element{
  constructor(){this.value='';this.options=[];this.events={};this.dataset={};}
  addEventListener(type,fn){this.events[type]=fn;}
  setAttribute(){}scrollIntoView(){}focus(){document.activeElement=this;}
  fire(type,event={}){this.events[type](event);}
 }
 const names=page==='compare'?['compare-result','swap-compare','share-compare',...['a','b'].flatMap(s=>['compare-search-'+s,'compare-cat-'+s,'compare-'+s,'compare-profile-'+s,'compare-count-'+s])]:['atlas-form','atlas-q','atlas-cat','atlas-country','atlas-image','atlas-sort','atlas-grid','atlas-pagination','result-count','filter-summary','no-results','clear-filters'];
 for(const id of names)ids[id]=new Element();
 const location={pathname:'/'+page+'/',search:''};
 const history=Object.fromEntries(['pushState','replaceState'].map(method=>[method,(_state,_title,url)=>{mutations.push({method,url});const parsed=new URL(url,'https://weapons.guidehollow.com');location.pathname=parsed.pathname;location.search=parsed.search;}]));
 const window={GHCore:C,GH_DATA:data.window.GH_DATA,GH_EDITORIAL:JSON.parse(fs.readFileSync('data/editorial.json')),addEventListener:(type,fn)=>{listeners[type]=fn;}};
 vm.runInNewContext(fs.readFileSync('assets/site.js','utf8'),{window,document,history,location,URLSearchParams,URL,setTimeout,clearTimeout,navigator:{}});
 return {ids,mutations,document,back:()=>{location.search='';listeners.popstate();}};
}
for(const side of ['a','b'])test('new comparison query after Back preserves restored history: '+side,()=>{
 const h=harness('compare'),input=h.ids['compare-search-'+side];input.value='F';input.fire('input');h.back();input.value='K';input.fire('input');assert.equal(h.mutations.at(-1).method,'pushState');
});
test('keyboard pagination moves focus to the announced results',()=>{
 const h=harness('atlas');const button={dataset:{page:'2'},disabled:false};h.ids['atlas-pagination'].fire('click',{target:{closest:()=>button}});assert.equal(h.document.activeElement,h.ids['result-count']);
});
