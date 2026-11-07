(function(root){
  'use strict';
  const PAGE_SIZE=24;
  const normalizeSearch=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
  const queryTokens=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/([a-z])[\s\p{Pd}]+(?=\d)/gu,'$1').trim().split(/\s+/).map(normalizeSearch).filter(Boolean);
  const countryTokens=value=>[...new Set(String(value||'').split('·').map(x=>x.trim().replace(/\s*운용$/,'')).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'ko'));
  const relatedCountries=item=>item.relatedCountries||countryTokens(item.country);
  const countries=items=>[...new Set(items.flatMap(relatedCountries))].sort((a,b)=>a.localeCompare(b,'ko'));
  function filterCatalog(items,state={}){
    const terms=queryTokens(state.q),nations=countryTokens(state.country);
    return items.filter(item=>{
      const index=normalizeSearch([item.name,item.english,item.slug,item.category,item.country,item.type,...(item.aliases||[])].join(' '));
      return terms.every(term=>index.includes(term))&&(!state.category||item.category===state.category)&&nations.every(n=>relatedCountries(item).includes(n))&&(!state.image||(state.image==='ready'?!!item.illustration:!item.illustration));
    });
  }
  function selectCatalog(items,state={}){
    const all=filterCatalog(items,state).slice().sort((a,b)=>{
      if(state.sort!=='name'){
        const rank=(a.featured||999)-(b.featured||999);if(rank)return rank;
        const media=Number(!!b.illustration)-Number(!!a.illustration);if(media)return media;
      }
      return a.name.localeCompare(b.name,'ko')||a.slug.localeCompare(b.slug);
    });
    const pages=Math.max(1,Math.ceil(all.length/PAGE_SIZE));
    const page=Math.min(pages,Math.max(1,Number.isSafeInteger(Number(state.page))?Number(state.page):1));
    return {items:all.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE),total:all.length,page,pages,start:all.length?(page-1)*PAGE_SIZE+1:0,end:Math.min(page*PAGE_SIZE,all.length)};
  }
  function readAtlasState(search,items){
    const p=new URLSearchParams(search),category=p.get('category')||'',nation=countryTokens(p.get('country')).join('·');
    const allowed=countries(items);
    return {q:(p.get('q')||'').slice(0,200),category:items.some(x=>x.category===category)?category:'',country:countryTokens(nation).every(x=>allowed.includes(x))?nation:'',image:['ready','pending'].includes(p.get('image'))?p.get('image'):'',sort:p.get('sort')==='name'?'name':'featured',page:/^[1-9]\d*$/.test(p.get('page')||'')&&Number.isSafeInteger(Number(p.get('page')))?Number(p.get('page')):1};
  }
  function atlasUrl(state){
    const p=new URLSearchParams();for(const k of ['q','category','country','image'])if(state[k])p.set(k,state[k]);
    if(state.sort==='name')p.set('sort','name');if(state.page>1)p.set('page',state.page);
    return '/atlas/'+(p.size?'?'+p.toString():'');
  }
  function counts(items){const categories={};for(const item of items)categories[item.category]=(categories[item.category]||0)+1;const illustrated=items.filter(x=>x.illustration).length;return {total:items.length,categories,illustrated,pending:items.length-illustrated};}
  const FIELD_LABELS={crew:'승무원',combatMass:'전투중량',vehicleMass:'자료상 차량중량',weaponMass:'장비 중량',mainArmament:'주포 구경',enginePower:'엔진 출력',roadSpeed:'포장도로 최고속도',publishedSpeed:'자료 공개 속도 (도로 기준 미기재)',standardTerrainSpeed:'일반 지형 속도',crossCountrySpeed:'험지 속도',length:'길이',width:'차체 너비',span:'날개폭',height:'높이',maxTakeoffMass:'최대이륙중량',manufacturerWeightClass:'제조사 최대중량 등급',maxSpeed:'최고속도',combatRadius:'전투행동반경',range:'항속거리',engineCount:'엔진 수',takeoffMode:'이착륙 방식',caliber:'구경',displacement:'배수량 (기준 미기재)',fullDisplacement:'만재배수량',beam:'함폭',endurance:'체공시간',mission:'체계 역할',components:'구성 장비',operatingSystem:'작동 방식'};
  const CATEGORY_FIELDS={
    '지상무기':['crew','combatMass','mainArmament','enginePower','roadSpeed','length','width','height'],
    '포병체계':['crew','combatMass','mainArmament','enginePower','roadSpeed'],
    '군용항공기':['crew','takeoffMode','length','span','height','maxTakeoffMass','maxSpeed','engineCount','combatRadius','range'],
    '해군함정':['fullDisplacement','displacement','length','beam','crew','maxSpeed'],
    '방공체계':['mission','components'],
    '무인체계':['mission','length','span','maxTakeoffMass','endurance','range'],
    '개인화기 역사':['caliber','weaponMass','operatingSystem']
  };
  function fieldId(label,category){
    const aliases={'승무원':'crew','전투중량':'combatMass','중량':'vehicleMass','주포':'mainArmament','구경':'caliber','엔진출력':'enginePower','도로최고속도':'roadSpeed','최고속도':'maxSpeed','전투행동반경':'combatRadius','행동반경':'combatRadius','항속거리':'range','배수량':'displacement','만재배수량':'fullDisplacement','기체길이':'length','전장':'length','날개폭':'span'};
    if(category==='개인화기 역사'&&normalizeSearch(label)==='중량')return 'weaponMass';
    return aliases[normalizeSearch(label)]||'legacy:'+category+':'+normalizeSearch(label);
  }
  const missing=()=>({status:'uncollected'});
  function comparisonRows(left,right,ids){
    const shared=[],other=[];
    for(const id of [...new Set([...ids,...Object.keys(left),...Object.keys(right)])]){
      const a=left[id]||missing(),b=right[id]||missing();
      const row={id,label:FIELD_LABELS[id]||id,left:a,right:b};
      (a.status==='known'&&b.status==='known'&&a.source&&b.source?shared:other).push(row);
    }
    return {shared,other};
  }
  const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const e=escapeHTML;
  function media(item,eager=false){
    if(!item.illustration)return '<span class="compact-status">일러스트 자료 확인 중</span>';
    const im=item.illustration;
    return `<figure class="compare-photo"><img src="/assets/illustrations/${e(item.slug)}.webp" alt="${e(im.alt)}" width="${im.width}" height="${im.height}" loading="${eager?'eager':'lazy'}"${eager?' fetchpriority="high"':''} decoding="async"><figcaption class="media-credit"><a href="/weapons/${e(item.slug)}/#photo-credit">실물 사진 기반 AI 일러스트 · ${e(im.credit)}</a></figcaption></figure>`;
  }
  function card(item,eager=false){
    const im=item.illustration;
    return `<a class="weapon-card${im?'':' no-illustration'}" href="/weapons/${e(item.slug)}/" data-category="${e(item.category)}" data-country="${e(item.country)}">${im?`<div class="art-pane static-media reference-illustration"><img src="/assets/illustrations/${e(item.slug)}.webp" alt="${e(im.alt)}" width="${im.width}" height="${im.height}" loading="${eager?'eager':'lazy'}"${eager?' fetchpriority="high"':''} decoding="async"><span class="art-generated-label">실물 사진 기반 AI 일러스트</span></div>`:''}<div class="card-content"><div class="eyebrow">${e(item.category)} · ${e(item.country)}</div><h3>${e(item.name)}</h3><p class="english">${e(item.english)}</p>${im?`<p class="media-credit">참고 원본·촬영자·라이선스는 상세 안내 · ${e(im.credit)}</p>`:'<p class="compact-status">일러스트 자료 확인 중 · 본문 열람 가능</p>'}<div class="card-bottom"><span>${e(item.type)}</span><b aria-hidden="true">↗</b></div></div></a>`;
  }
  function profileFor(item,id,editorial){
    const ids=item.profileIds||[];
    const selected=ids.includes(id)?id:ids[0];
    return editorial.profiles[selected]||{label:'형식별 제원 미수집',category:item.category,role:item.type,fields:{}};
  }
  function fieldHTML(field,editorial){
    const labels={uncollected:'미수집',undisclosed:'비공개',not_applicable:'해당 없음'};
    const source=editorial.sources[field.source];
    const value=field.status==='known'?`${e(field.value)}${field.unit?' '+e(field.unit):''}`:(labels[field.status]||'미수집');
    return `<span class="spec-value${field.status==='known'?'':' data-state'}">${value}</span>${field.condition?`<small class="spec-condition">${e(field.condition)}</small>`:''}${source&&source.reviewedAt?`<small class="spec-source"><a href="${e(source.url)}">${e(source.title)}</a> · 자료 검토 ${e(source.reviewedAt)}</small>`:''}`;
  }
  function renderComparison(a,b,pa,pb,editorial){
    const left=profileFor(a,pa,editorial),right=profileFor(b,pb,editorial);
    const ids=[...(CATEGORY_FIELDS[a.category]||[]),...(CATEGORY_FIELDS[b.category]||[])];
    const rows=comparisonRows(left.fields,right.fields,ids);
    const group=(title,list,prefix)=>list.length?`<tbody><tr class="comparison-group"><th colspan="3">${title}</th></tr>${list.map((r,i)=>`<tr><th scope="row" id="${prefix}-${i}">${e(r.label)}</th><td headers="subject-a ${prefix}-${i}">${fieldHTML(r.left,editorial)}</td><td headers="subject-b ${prefix}-${i}">${fieldHTML(r.right,editorial)}</td></tr>`).join('')}</tbody>`:'';
    const heads=[a,b].map((item,i)=>`<th scope="col" id="subject-${i?'b':'a'}">${media(item)}<a href="/weapons/${e(item.slug)}/">${e(item.name)}</a><span class="profile-label">${e(i?right.label:left.label)}</span></th>`).join('');
    const note=a.category!==b.category?'서로 다른 분야입니다. 역할과 측정 기준이 달라 수치의 우열을 판단할 수 없습니다.':a.type!==b.type?'같은 분야라도 역할·형식·측정 조건이 다를 수 있습니다.':'같은 역할의 장비도 형식·단위·측정 조건을 함께 확인하세요.';
    return `<p class="comparison-note">${note} 미수집은 자료 미확보, 비공개는 출처의 비공개 명시, 해당 없음은 적용되지 않는 항목입니다.</p><div class="comparison-scroll" role="region" aria-label="제원 비교표, 필요하면 영역 안에서 가로 스크롤" tabindex="0"><table class="spec-table"><caption>${e(a.name)} / ${e(b.name)} · 형식별 공개 자료 비교<small class="table-scroll-hint">표 영역을 좌우로 밀어 두 대상의 값을 확인하세요.</small></caption><thead><tr><th scope="col">항목</th>${heads}</tr></thead>${group('양쪽에 직접 출처가 연결된 항목',rows.shared,'shared')}${group('한쪽 자료·추가 조건·미수집 항목',rows.other,'other')}</table></div>${[a,b].map(item=>`<details class="legacy-facts"><summary>${e(item.name)}의 기존 기본 정보</summary><p>아래 정보는 형식별 직접 출처와 연결되기 전의 기본 분류입니다. 수치 비교 항목으로 합치지 않습니다.</p><dl>${Object.entries(item.facts).map(([k,v])=>`<dt>${e(k)}</dt><dd>${e(v)}</dd>`).join('')}</dl></details>`).join('')}`;
  }
  const api={PAGE_SIZE,normalizeSearch,queryTokens,countryTokens,relatedCountries,countries,filterCatalog,selectCatalog,readAtlasState,atlasUrl,counts,fieldId,FIELD_LABELS,CATEGORY_FIELDS,comparisonRows,escapeHTML,card,media,profileFor,fieldHTML,renderComparison};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.GHCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
