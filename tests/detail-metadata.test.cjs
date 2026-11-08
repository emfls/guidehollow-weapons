const {test,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const os=require('node:os');const path=require('node:path');const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),fixture=fs.mkdtempSync(path.join(os.tmpdir(),'weapons-detail-meta-'));
after(()=>fs.rmSync(fixture,{recursive:true,force:true}));
for(const rel of ['scripts','data','templates','weapons','about','privacy','motion','assets/catalog-core.js','assets/style.css','assets/site.js']){
 const target=path.join(fixture,rel);fs.mkdirSync(path.dirname(target),{recursive:true});fs.cpSync(path.join(root,rel),target,{recursive:true});
}
const file=slug=>path.join(fixture,'weapons',slug,'index.html');
for(const route of ['atlas','compare'])fs.mkdirSync(path.join(fixture,route));
const originals=Object.fromEntries(['k9-thunder','kf21-boramae','k2-black-panther'].map(slug=>[slug,fs.readFileSync(file(slug),'utf8')]));
const typeTag=/<meta\b(?=[^>]*\sproperty\s*=\s*(["'])og:type\1)[^>]*>/gi;
fs.writeFileSync(file('k9-thunder'),originals['k9-thunder'].replace(typeTag,'<meta content="website" property="og:type"/>'));
fs.writeFileSync(file('kf21-boramae'),originals['kf21-boramae'].replace(typeTag,''));
fs.writeFileSync(file('k2-black-panther'),originals['k2-black-panther'].replace(typeTag,"<meta content='website' property='og:type'><meta property=\"og:type\" content=\"article\"/>"));
execFileSync(process.execPath,[path.join(fixture,'scripts/build.mjs')],{stdio:'pipe'});
function meta(html,key){
 return [...html.matchAll(/<meta\b[^>]*>/gi)].flatMap(([tag])=>{
  const attrs=Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m=>[m[1].toLowerCase(),m[3]]));
  return attrs.property===key?[attrs.content]:[];
 });
}
for(const [slug,scenario] of [['k9-thunder','existing website'],['kf21-boramae','missing tag'],['k2-black-panther','duplicate tags and reordered/single-quoted attributes']])test('builder emits one article OG type: '+scenario,()=>{
 assert.deepEqual(meta(fs.readFileSync(file(slug),'utf8'),'og:type'),['article']);
});
test('OG normalization preserves canonical, OG URL/image and structured data',()=>{
 for(const [slug,before] of Object.entries(originals)){
  const after=fs.readFileSync(file(slug),'utf8');
  for(const key of ['og:url','og:image'])assert.deepEqual(meta(after,key),meta(before,key));
  assert.equal(after.match(/<link\b[^>]*rel="canonical"[^>]*>/)[0],before.match(/<link\b[^>]*rel="canonical"[^>]*>/)[0]);
  assert.equal(after.match(/<script type="application\/ld\+json" data-generated="article">([\s\S]*?)<\/script>/)[1],before.match(/<script type="application\/ld\+json" data-generated="article">([\s\S]*?)<\/script>/)[1]);
 }
 execFileSync(process.execPath,[path.join(fixture,'scripts/build.mjs'),'--check'],{stdio:'pipe'});
});
const targets=['k9-thunder','fa50','k21-ifv','k55a1','kf21-boramae','kt1-woongbi','lah-miron','m109-paladin','t50-golden-eagle'];
const notice=html=>[...html.matchAll(/<div class="editor-note">([\s\S]*?)<\/div>/g)].map(m=>m[1]).join(' ');
test('display-image notices distinguish AI illustration from source photographs',()=>{
 for(const slug of targets){const html=fs.readFileSync(path.join(root,'weapons',slug,'index.html'),'utf8');const text=notice(html);assert.ok(text.includes('AI 일러스트'),slug);assert.ok(!/상단 사진은|현재 별도 T-50 도감 이미지는 검증·생성 전|이미지 담당 전달사항/.test(text),slug);}
});
test('K9 notice attribution agrees with actual photo-credit metadata',()=>{
 const item=JSON.parse(fs.readFileSync(path.join(root,'data/catalog.json'),'utf8')).find(x=>x.slug==='k9-thunder');
 const text=notice(fs.readFileSync(path.join(root,'weapons/k9-thunder/index.html'),'utf8'));
 assert.ok(text.includes(item.illustration.credit));assert.ok(text.includes('href="#photo-credit"'));assert.ok(!text.includes('국군이 공개한'));
});
test('image wording review keeps original review dates and valid source-photo notes',()=>{
 const catalog=JSON.parse(fs.readFileSync(path.join(root,'data/catalog.json'),'utf8'));
 for(const slug of targets){const html=fs.readFileSync(path.join(root,'weapons',slug,'index.html'),'utf8');const updated=html.match(/<p class="updated">([\s\S]*?)<\/p>/)[1];assert.ok(updated.includes(catalog.find(x=>x.slug===slug).review.date),slug);}
 for(const [slug,phrase] of [['k239-chunmoo','참고 사진의 촬영 상황과 출처'],['k808','미군의 참고 사진 원본 캡션'],['ka1-airborne-controller','참고 사진에는 공군'],['kuh1-surion','참고 사진에는 대한민국 육군']])assert.ok(notice(fs.readFileSync(path.join(root,'weapons',slug,'index.html'),'utf8')).includes(phrase),slug);
 assert.ok(!fs.readFileSync(path.join(root,'weapons/kt1-woongbi/index.html'),'utf8').includes('KT-1 전용 렌더 제작 대기'));
});
