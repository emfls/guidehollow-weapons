const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
const data=JSON.parse(fs.readFileSync('data/editorial.json'));const catalog=JSON.parse(fs.readFileSync('data/catalog.json'));
test('each known specification has an actually reviewed direct source and conditions',()=>{
 for(const p of Object.values(data.profiles))for(const f of Object.values(p.fields)){
  assert.ok(['known','uncollected','undisclosed','not_applicable'].includes(f.status));
  if(f.status==='known'){assert.ok(f.value&&f.condition);const s=data.sources[f.source];assert.ok(s&&s.url.startsWith('https://')&&s.reviewedAt);}
 }
});
test('variant and measurement boundaries stay explicit',()=>{
 const p=data.profiles;assert.equal(p['m1a2-sepv3-us'].fields.combatMass.status,'uncollected');assert.equal(p['m1a2-sepv3-au'].fields.vehicleMass.unit,'t');
 assert.equal(p['m1a2-sepv3-us'].fields.roadSpeed.status,'uncollected');assert.ok(p['m1a2-sepv3-us'].fields.publishedSpeed);
 assert.notEqual(p.f35a.fields.takeoffMode.value,p.f35b.fields.takeoffMode.value);assert.notEqual(p.f35b.fields.takeoffMode.value,p.f35c.fields.takeoffMode.value);
 assert.equal(p.f35b.fields.maxTakeoffMass.status,'uncollected');assert.ok(p.f35b.fields.manufacturerWeightClass);
});
test('F35 common crew and engine provenance is NAVAIR, not a manufacturer table',()=>{
 for(const id of ['f35a','f35b','f35c'])for(const key of ['crew','engineCount']){const f=data.profiles[id].fields[key];assert.equal(f.source,'f35-single');assert.ok(f.condition.includes('NAVAIR'));assert.ok(!f.condition.includes('제조사'));}
});
test('every article, reference and related entry exists',()=>{
 const slugs=new Set(catalog.map(x=>x.slug));
 for(const [slug,a] of Object.entries(data.articles)){
  assert.ok(slugs.has(slug)&&a.summary&&a.description&&a.reviewScope);
  for(const id of a.profileIds)assert.ok(data.profiles[id]);for(const id of a.related)assert.ok(slugs.has(id));
  for(const row of [...a.timeline,...a.variants])assert.ok(data.sources[row.source]);
  for(const s of a.sections){assert.ok(s.paragraphs.length&&s.sources.length);for(const id of s.sources)assert.ok(data.sources[id]);}
 }
});
