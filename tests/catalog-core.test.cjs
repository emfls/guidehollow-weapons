const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const core=require('../assets/catalog-core.js');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('assets/catalog.js','utf8'),ctx);
const items=JSON.parse(JSON.stringify(ctx.window.GH_DATA));
const slugs=q=>core.filterCatalog(items,{q}).map(x=>x.slug).sort();
for(const forms of [['F35','F-35','f 35','Ｆ３５'],['K9','K-9','K 9'],['KF21','KF-21','KF 21']])
 test('equivalent model spellings '+forms[0],()=>{for(const q of forms)assert.deepEqual(slugs(q),slugs(forms[0]));assert.ok(slugs(forms[0]).length>0);});
test('mixed terms, Korean and slug lookup',()=>{assert.ok(slugs('미국 F35').includes('f35-lightning-ii'));assert.ok(slugs('흑표').includes('k2-black-panther'));assert.ok(slugs('f35-lightning-ii').includes('f35-lightning-ii'));});
test('related country membership includes service and both compound orders',()=>{
 const found=core.filterCatalog(items,{country:'대한민국'}).map(x=>x.slug);
 for(const slug of ['f15k-slam-eagle','homar-k','k2gf'])assert.ok(found.includes(slug));
 assert.deepEqual(core.countryTokens('폴란드·대한민국'),core.countryTokens('대한민국·폴란드'));
 assert.equal(core.filterCatalog(items,{country:'대한민국'}).length,items.filter(x=>core.countryTokens(x.country).includes('대한민국')).length);
});
test('country membership does not scan delivery or museum prose',()=>{
 assert.ok(!core.filterCatalog(items,{country:'인도'}).some(x=>x.slug==='aw159-wildcat-rok'));
 assert.ok(!core.filterCatalog(items,{country:'영국'}).some(x=>x.slug==='kv1'));
});
test('all filters intersect before pagination',()=>{
 const result=core.selectCatalog(items,{q:'F15K',country:'대한민국',category:'군용항공기',image:'ready',page:1,sort:'name'});
 assert.deepEqual(result.items.map(x=>x.slug),['f15k-slam-eagle']);assert.equal(result.total,1);
});
test('page bounds and zero results',()=>{
 assert.equal(core.selectCatalog(items,{page:9999}).page,Math.ceil(items.length/24));
 const none=core.selectCatalog(items,{q:'<script>never-a-weapon</script>',page:99});assert.equal(none.total,0);assert.equal(none.page,1);assert.equal(none.items.length,0);
 assert.equal(core.selectCatalog(items,{page:1}).items.length,24);
});
test('URL round-trip preserves all atlas state and legacy country meaning',()=>{
 const state=core.readAtlasState('?q=F+35&category=군용항공기&country=대한민국+운용&image=ready&sort=name&page=2',items);
 assert.equal(state.country,'대한민국');assert.equal(state.q,'F 35');assert.equal(state.page,2);
 const round=core.readAtlasState(core.atlasUrl(state).split('?')[1],items);assert.deepEqual(round,state);
 const legacy=core.readAtlasState('?country=폴란드·대한민국',items);assert.equal(legacy.country,'대한민국·폴란드');assert.equal(core.filterCatalog(items,legacy).length,4);
});
test('invalid URL state falls back deterministically',()=>{
 const s=core.readAtlasState('?page=-2&sort=popular&image=fake&category=no&country=no',items);assert.equal(s.page,1);assert.equal(s.sort,'featured');assert.equal(s.image,'');assert.equal(s.category,'');assert.equal(s.country,'');
});
test('counts separate public pages and image availability',()=>{
 const c=core.counts(items);assert.equal(c.total,items.length);assert.equal(c.illustrated,items.filter(x=>x.illustration).length);assert.equal(c.pending,items.filter(x=>!x.illustration).length);assert.equal(Object.values(c.categories).reduce((a,b)=>a+b,0),items.length);const extra={...items[0],slug:'fixture-new-entry',category:'추가 분야'};const next=core.counts([...items,extra]);assert.equal(next.total,c.total+1);assert.equal(next.categories['추가 분야'],1);
});
test('field aliases preserve measurement meaning',()=>{
 assert.equal(core.FIELD_LABELS.width,'너비');
 assert.equal(core.fieldId('승무원','지상무기'),'crew');assert.equal(core.fieldId('전투 중량','지상무기'),'combatMass');
 assert.notEqual(core.fieldId('중량','지상무기'),core.fieldId('전투중량','지상무기'));
 assert.notEqual(core.fieldId('전투행동반경','군용항공기'),core.fieldId('항속거리','군용항공기'));
 assert.notEqual(core.fieldId('배수량','해군함정'),core.fieldId('만재배수량','해군함정'));
 assert.equal(core.fieldId('중량','개인화기 역사'),'weaponMass');
 assert.ok(!core.CATEGORY_FIELDS['개인화기 역사'].includes('vehicleMass'));
});
test('comparison distinguishes unavailable states and shared sourced facts',()=>{
 const left={crew:{status:'known',value:'3',unit:'명',source:'s'},combatMass:{status:'undisclosed'}};
 const right={crew:{status:'known',value:'4',unit:'명',source:'s'},combatMass:{status:'not_applicable'}};
 const rows=core.comparisonRows(left,right,['crew','combatMass','roadSpeed']);assert.deepEqual(rows.shared.map(x=>x.id),['crew']);
 assert.equal(rows.other.find(x=>x.id==='combatMass').left.status,'undisclosed');assert.equal(rows.other.find(x=>x.id==='roadSpeed').left.status,'uncollected');
});

test('existing Japanese alias survives generated catalog',()=>{assert.ok(slugs('10式戦車').includes('type-10'));});
