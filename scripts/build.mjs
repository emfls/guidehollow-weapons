import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import core from '../assets/catalog-core.js';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const e=core.escapeHTML,check=process.argv.includes('--check'),outputs=new Map();
const put=(p,s)=>outputs.set(p,s);
const editorial=JSON.parse(read('data/editorial.json'));
const source=JSON.parse(read('data/catalog.json'));
const items=source.map(item=>{
 const article=editorial.articles[item.slug];
 return {...item,...(article?{summary:article.summary,aliases:[...new Set([...item.aliases,...article.variants.map(x=>x.name)])],profileIds:article.profileIds,review:{status:'source-reviewed',date:editorial.reviewDate,note:article.reviewScope}}:{})};
});
const bySlug=Object.fromEntries(items.map(x=>[x.slug,x]));
assert.equal(items.length,new Set(items.map(x=>x.slug)).size);
for(const item of items){
 assert.match(item.slug,/^[a-z0-9-]+$/);assert.ok(fs.existsSync(path.join(root,'weapons',item.slug,'index.html')));
 for(const id of item.profileIds)assert.ok(editorial.profiles[id],id);
 if(item.illustration){const im=item.illustration;assert.ok(im.width>0&&im.height>0&&im.credit&&im.sourceUrl&&im.licenseUrl);}
}
for(const p of Object.values(editorial.profiles))for(const f of Object.values(p.fields))if(f.status==='known'){
 assert.ok(f.value&&f.condition&&editorial.sources[f.source]?.reviewedAt,'Known value requires direct reviewed source and conditions');
 assert.equal(new URL(editorial.sources[f.source].url).protocol,'https:');
}
const count=core.counts(items),categories=Object.keys(count.categories),modified='2026-11-07';
const runtime=items.map(item=>({...item,review:{status:item.review.status,date:item.review.date},...(item.illustration?{illustration:{alt:item.illustration.alt,credit:item.illustration.credit,width:item.illustration.width,height:item.illustration.height}}:{})}));
put('assets/catalog.js','window.GH_DATA='+JSON.stringify(runtime,null,0)+';\n');
put('assets/editorial.js','window.GH_EDITORIAL='+JSON.stringify(editorial)+';\n');
const template=read('templates/home.html');
const header=template.match(/<header\b[\s\S]*?<\/header>/)[0];
const footer=template.match(/<footer\b[\s\S]*?<\/footer>/)[0].replace(/마지막 자료 검토:[^<]+/,'사이트 구성 수정: '+modified+' · 글별 자료 검토일은 본문 참조');
function head(title,description,route){
 return `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#080f19"><meta name="naver-site-verification" content="5de654028d35e953db53c015396e799f5c7ae12d"><title>${e(title)} | GuideHollow Weapons</title><meta name="description" content="${e(description)}"><link rel="canonical" href="https://weapons.guidehollow.com${route}"><meta property="og:type" content="${route.startsWith('/weapons/')?'article':'website'}"><meta property="og:locale" content="ko_KR"><meta property="og:site_name" content="GuideHollow Weapons"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:url" content="https://weapons.guidehollow.com${route}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css"><script defer src="/assets/catalog-core.js"></script><script defer src="/assets/catalog.js"></script>${route==='/compare/'?'<script defer src="/assets/editorial.js"></script>':''}<script defer src="/assets/site.js"></script></head>`;
}
function document(title,description,route,main,page){return `<!doctype html>\n<html lang="ko">${head(title,description,route)}<body data-page="${page}"><a class="skip-link" href="#main-content">본문 바로가기</a>${header}${main}${footer}<div class="toast" role="status" aria-live="polite"></div></body></html>\n`;}
const breadcrumb=label=>`<div class="breadcrumbs"><a href="/">홈</a> / ${e(label)}</div>`;
const options=(values,current='',empty='전체')=>`<option value="">${e(empty)}</option>`+values.map(x=>`<option value="${e(x)}"${current===x?' selected':''}>${e(x)}</option>`).join('');
const cards=(rows,eager=false)=>rows.map((x,i)=>core.card(x,eager&&i===0)).join('');
const profileOptions=item=>item.profileIds.map(id=>`<option value="${e(id)}">${e(editorial.profiles[id].label)}</option>`).join('');
const sourceLink=id=>{const s=editorial.sources[id];assert.ok(s,id);return `<a href="${e(s.url)}">${e(s.title)}</a>`;};
const allNames=items.slice().sort((a,b)=>a.name.localeCompare(b.name,'ko')).map(x=>`<li><a href="/weapons/${e(x.slug)}/">${e(x.name)}</a></li>`).join('');

const tiles=categories.map(category=>{
 const candidate=items.find(x=>x.category===category&&x.featured&&x.illustration)||items.find(x=>x.category===category&&x.illustration);
 const im=candidate?.illustration;
 return `<a class="category-tile" href="/atlas/?category=${encodeURIComponent(category)}"><div class="category-illustration">${im?`<img class="category-photo" src="/assets/illustrations/${candidate.slug}.webp" alt="${e(im.alt)}" width="${im.width}" height="${im.height}" loading="lazy" decoding="async">`:''}</div><span>${e(category)}</span><span class="category-number">${count.categories[category]} <span aria-hidden="true">↗</span></span></a>`;
}).join('');
let home=template.replaceAll('{{articleCount}}',String(count.total)).replaceAll('{{categoryCount}}',String(categories.length).padStart(2,'0')).replace('{{categoryTiles}}',tiles).replace('{{homeCards}}',cards(core.selectCatalog(items).items.slice(0,8))).replace('{{heroCredit}}',`<a href="/weapons/k2-black-panther/#photo-credit">실물 사진 기반 AI 일러스트 · ${e(bySlug['k2-black-panther'].illustration.credit)} · 원본 안내</a>`);
home=home.replace(/마지막 자료 검토:[^<]+/,'사이트 구성 수정: '+modified+' · 글별 자료 검토일은 본문 참조');
put('index.html',home.trimEnd()+'\n');

const initial=core.selectCatalog(items);
const atlas=`<main id="main-content" class="wrap"><section class="page-head">${breadcrumb('무기 도감')}<span class="section-kicker">EXPLORE THE ARCHIVE</span><h1>무기 도감</h1><p>${count.total}개 공개 상세 페이지에서 이름·분야·관련 국가로 찾으세요. 이미지 준비 상태와 자료 검토 상태는 서로 다릅니다.</p></section>
<form class="catalog-controls" id="atlas-form" role="search"><div class="catalog-primary"><label class="search-field" for="atlas-q">이름·모델·별칭<input id="atlas-q" name="q" type="search" placeholder="F35, K-9, KF 21, 흑표…" maxlength="200" autocomplete="off"></label><button type="button" id="clear-filters" class="clear-button">초기화</button></div><details class="catalog-options"><summary>필터·정렬</summary><div class="catalog-options-grid"><label class="filter-field" for="atlas-cat">분야<select id="atlas-cat" name="category">${options(categories)}</select></label><label class="filter-field" for="atlas-country">관련 국가<select id="atlas-country" name="country">${options(core.countries(items))}</select></label><label class="filter-field" for="atlas-image">이미지<select id="atlas-image" name="image">${options(['ready','pending']).replace('>ready<','>일러스트 있음<').replace('>pending<','>자료 확인 중<')}</select></label><label class="filter-field" for="atlas-sort">정렬<select id="atlas-sort" name="sort"><option value="featured">대표 기종·이미지 우선</option><option value="name">이름 가나다순</option></select></label></div><p class="filter-summary">관련 국가는 개발·운용 등 명시된 관계를 포함하며 개발국만을 뜻하지 않습니다.</p></details></form>
<div class="results-line"><p id="result-count" tabindex="-1" role="status" aria-live="polite" aria-atomic="true">${count.total}개 항목 · ${initial.start}–${initial.end}</p><p>공개 페이지 ${count.total} · 일러스트 ${count.illustrated} · 이미지 자료 확인 중 ${count.pending}</p></div><p id="filter-summary" class="filter-summary"></p><div id="atlas-grid" class="weapon-grid">${cards(initial.items,true)}</div><div id="no-results" class="empty-state" hidden><h2>검색 결과가 없습니다</h2><p>검색어나 필터를 바꾸거나 초기화하세요. F35와 F-35처럼 표기가 달라도 검색됩니다.</p></div><nav id="atlas-pagination" class="atlas-pagination" aria-label="도감 목록 페이지"><button type="button" data-page="1" disabled>이전</button><span>1 / ${initial.pages} 페이지</span><button type="button" data-page="2">다음</button></nav><details class="all-entries"><summary>전체 ${count.total}종을 이름으로 보기</summary><ul class="static-entry-links">${allNames}</ul></details><noscript><p>아래 전체 기종 이름 목록에서 모든 상세 페이지로 이동할 수 있습니다.</p><style>.catalog-controls{display:none}.all-entries:not([open])>ul{display:grid}</style></noscript></main>`;
put('atlas/index.html',document('무기 도감 — 이름·분야·국가 검색',`${count.total}개 공개 도감을 모델명·한국어·영문·관련 국가로 찾고 이미지 준비 상태로 좁혀 보세요.`,'/atlas/',atlas,'atlas'));

function picker(side,label,item){return `<fieldset class="compare-picker" data-side="${side}"><legend>${label}</legend><label class="picker-search" for="compare-search-${side}">이름으로 찾기<input id="compare-search-${side}" type="search" placeholder="모델명·한국어·영문" maxlength="200" autocomplete="off"></label><div class="picker-filters"><label for="compare-cat-${side}">분야<select id="compare-cat-${side}">${options(categories)}</select></label><label for="compare-${side}">대상 기종<select id="compare-${side}">${items.map(x=>`<option value="${x.slug}"${x.slug===item.slug?' selected':''}>${e(x.name)}</option>`).join('')}</select></label></div><label class="profile-select" for="compare-profile-${side}">제원 기준 형식<select id="compare-profile-${side}">${profileOptions(item)||'<option value="">형식별 제원 미수집</option>'}</select></label><p class="picker-count" id="compare-count-${side}" role="status" aria-live="polite">${count.total}개 기종</p></fieldset>`;}
const a=bySlug['k2-black-panther'],b=bySlug['m1-abrams'];
const compare=`<main id="main-content" class="wrap"><section class="page-head">${breadcrumb('제원 비교')}<span class="section-kicker">SOURCES SIDE BY SIDE</span><h1>무기 비교실</h1><p>이름과 분야로 대상을 찾고, 비교할 세부 형식과 출처를 확인하세요. 성능 점수나 우열 순위는 만들지 않습니다.</p></section><div class="compare-pickers">${picker('a','첫 번째 대상',a)}${picker('b','두 번째 대상',b)}</div><div class="compare-actions"><button id="swap-compare" class="outline-button" type="button">⇄ 순서 바꾸기</button><button id="share-compare" class="outline-button" type="button">비교 링크 복사</button></div><div id="compare-result">${core.renderComparison(a,b,a.profileIds[0],b.profileIds[0],editorial)}</div><noscript><p>기본 K2·M1 비교표는 아래에서 읽을 수 있습니다. 다른 기종은 <a href="/atlas/">전체 도감</a>에서 찾아보세요.</p></noscript></main>`;
put('compare/index.html',document('무기 비교실 — 형식별 제원과 출처','분야와 이름으로 대상을 찾아 형식·단위·조건·출처가 연결된 공개 제원을 비교합니다.','/compare/',compare,'compare'));

function articleMain(item,data,original){
 const start=original.search(/<div\b[^>]*class="[^"]*article-art[^"]*"/);assert.ok(start>=0,item.slug);
 const stop=original.indexOf('</p>',original.indexOf('id="photo-credit"',start))+4;assert.ok(stop>start);
 let photo=original.slice(start,stop);
 if(item.illustration.licenseUrl.includes('dvidshub.net/about/copyright')&&!photo.includes('does not imply or constitute DoW endorsement'))photo=photo.replace('</p>',' The appearance of U.S. Department of War (DoW) visual information does not imply or constitute DoW endorsement.</p>');
 const sections=data.sections.map(s=>`<section class="prose-section" id="${e(s.id)}"><h2>${e(s.title)}</h2>${s.paragraphs.map(p=>`<p>${e(p)}</p>`).join('')}${s.bullets?`<ul>${s.bullets.map(p=>`<li>${e(p)}</li>`).join('')}</ul>`:''}<p class="spec-source">근거: ${s.sources.map(sourceLink).join(' · ')}</p></section>`).join('');
 const timeline=`<section class="prose-section" id="timeline"><h2>주요 연표</h2><div class="comparison-scroll"><table class="spec-table"><caption>${e(item.name)} 개발·인도 이력</caption><thead><tr><th scope="col">시기</th><th scope="col">확인한 사건</th></tr></thead><tbody>${data.timeline.map(x=>`<tr><th scope="row">${e(x.date)}</th><td>${e(x.event)}<small class="spec-source">${sourceLink(x.source)}</small></td></tr>`).join('')}</tbody></table></div></section>`;
 const variants=`<section class="prose-section" id="variants"><h2>주요 형식의 차이</h2><dl>${data.variants.map(x=>`<dt>${e(x.name)}</dt><dd>${e(x.description)} · ${sourceLink(x.source)}</dd>`).join('')}</dl></section>`;
 const specs=`<section class="prose-section" id="specifications"><h2>형식을 명시한 공개 제원</h2><p>자료의 단위·등급 표현·측정 조건을 보존했습니다. 미수집 항목은 추정해서 채우지 않습니다.</p>${data.profileIds.map(id=>{const p=editorial.profiles[id];return `<div class="comparison-scroll" tabindex="0" role="region" aria-label="${e(p.label)} 공개 제원"><table class="spec-table"><caption>${e(p.label)}</caption><thead><tr><th scope="col">항목</th><th scope="col">값·조건·직접 출처</th></tr></thead><tbody>${Object.entries(p.fields).map(([key,f])=>`<tr><th scope="row">${e(core.FIELD_LABELS[key]||key)}</th><td>${core.fieldHTML(f,editorial)}</td></tr>`).join('')}</tbody></table></div>`;}).join('')}</section>`;
 const used=[...new Set([...data.sections.flatMap(s=>s.sources),...data.timeline.map(x=>x.source),...data.variants.map(x=>x.source),...data.profileIds.flatMap(id=>Object.values(editorial.profiles[id].fields).map(f=>f.source).filter(Boolean))])];
 const sources=`<section class="prose-section" id="sources"><h2>직접 확인한 자료</h2><ul>${used.map(id=>`<li>${sourceLink(id)}${editorial.sources[id].notes?' — '+e(editorial.sources[id].notes):''}</li>`).join('')}</ul><p class="updated">이 문서의 자료 검토일: ${e(editorial.reviewDate)} · ${e(data.reviewScope)}</p></section>`;
 const related=cards(data.related.map(id=>bySlug[id]));
 return `<main id="main-content" class="wrap article-layout"><article class="article-main"><section class="article-hero">${breadcrumb(item.name)}<div class="eyebrow">${e(item.category)} · ${e(item.country)}</div><h1>${e(item.name)}</h1><p class="article-english">${e(item.english)}</p><p>${e(data.summary)}</p><div class="article-actions"><a class="outline-button" href="/compare/?a=${item.slug}&b=${data.related[0]}">관련 기종과 비교 ↗</a><button class="copy-link outline-button" data-copy="https://weapons.guidehollow.com/weapons/${item.slug}/" type="button">링크 복사</button></div>${photo}</section><nav class="article-index" aria-label="이 페이지에서"><a href="#overview">핵심 요약</a><a href="#timeline">연표</a><a href="#variants">형식 구분</a><a href="#specifications">공개 제원</a><a href="#sources">출처</a></nav>${sections}${timeline}${variants}${specs}${sources}<section class="section"><h2>함께 읽을 자료</h2><div class="weapon-grid related-grid">${related}</div></section></article><aside class="article-aside"><div class="quick-file"><span class="section-kicker">READING GUIDE</span><h2>${e(item.english)}</h2><p>계열 역사와 형식별 제원을 구분합니다.</p><a href="#specifications">형식별 제원 보기 ↗</a></div></aside></main>`;
}
for(const [slug,data] of Object.entries(editorial.articles)){
 const item=bySlug[slug],original=read(`weapons/${slug}/index.html`);
 put(`weapons/${slug}/index.html`,document(`${item.name} (${item.english})`,data.description,`/weapons/${slug}/`,articleMain(item,data,original),'article'));
}

// Existing articles keep their own review dates; only common presentation metadata changes.
for(const item of items){
 const file=`weapons/${item.slug}/index.html`;let html=outputs.get(file)||read(file);
 const title=`${item.name} (${item.english}) | GuideHollow Weapons`,description=editorial.articles[item.slug]?.description||item.summary;
 html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${e(title)}</title>`);
 for(const [key,value] of [['name="description"',description],['property="og:title"',title],['property="og:description"',description]]){
  const attr=key.startsWith('name')?'name':'property',tag=key.split('"')[1];
  const re=new RegExp('<meta\\b(?=[^>]*'+attr+'="'+tag+'")[^>]*>');
  html=html.replace(re,`<meta ${attr}="${tag}" content="${e(value)}">`);
 }
 if(item.illustration&&!html.includes('property="og:image"'))html=html.replace('</head>',`<meta property="og:image" content="https://weapons.guidehollow.com/assets/illustrations/${item.slug}.webp"></head>`);
 const url='https://weapons.guidehollow.com/weapons/'+item.slug+'/';
 const structured={'@context':'https://schema.org','@graph':[{'@type':'TechArticle',headline:item.name,description,url,mainEntityOfPage:url,...(item.illustration?{image:'https://weapons.guidehollow.com/assets/illustrations/'+item.slug+'.webp'}:{}),...(editorial.articles[item.slug]?{dateModified:editorial.reviewDate}:{})},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'홈',item:'https://weapons.guidehollow.com/'},{'@type':'ListItem',position:2,name:'무기 도감',item:'https://weapons.guidehollow.com/atlas/'},{'@type':'ListItem',position:3,name:item.name,item:url}]}]};
 html=html.replace(/<script type="application\/ld\+json" data-generated="article">[\s\S]*?<\/script>/g,'');
 html=html.replace('</head>',`<script type="application/ld+json" data-generated="article">${JSON.stringify(structured).replaceAll('<','\\u003c')}</script></head>`);
 html=html.replace(/마지막 자료 검토:[^<]+/,'사이트 구성 수정: '+modified+' · 글별 자료 검토일은 본문 참조');
 put(file,html);
}
for(const file of ['about/index.html','privacy/index.html','motion/index.html'])put(file,read(file).replace(/마지막 자료 검토:[^<]+/,'사이트 구성 수정: '+modified+' · 글별 자료 검토일은 본문 참조'));

const assets=['style.css','catalog-core.js','catalog.js','editorial.js','site.js'];
const versions=Object.fromEntries(assets.map(name=>[name,crypto.createHash('sha256').update(outputs.get('assets/'+name)||read('assets/'+name)).digest('hex').slice(0,12)]));
for(const [file,initialHTML] of outputs){
 if(!file.endsWith('.html'))continue;let html=initialHTML;
 if(!html.includes('/assets/catalog-core.js'))html=html.replace(/(<script\b[^>]*src="\/assets\/catalog\.js[^>]*>)/,`<script defer src="/assets/catalog-core.js"></script>$1`);
 for(const asset of assets)html=html.replace(new RegExp('/assets/'+asset.replace('.','\\.')+'(?:\\?v=[a-f0-9]+)?','g'),'/assets/'+asset+'?v='+versions[asset]);
 outputs.set(file,html);
}
let stale=[];
for(const [file,content] of outputs){if(!fs.existsSync(path.join(root,file))||read(file)!==content){if(check)stale.push(file);else fs.writeFileSync(path.join(root,file),content);}}
if(check&&stale.length){console.error('Generated files are stale:',stale.join(', '));process.exitCode=1;}
else console.log(`${check?'Checked':'Generated'} ${outputs.size} files; public=${count.total}, illustrated=${count.illustrated}, pending=${count.pending}; category sum=${Object.values(count.categories).reduce((a,b)=>a+b,0)}`);
