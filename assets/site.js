(()=>{"use strict";const items=window.GH_DATA||[];const byId=x=>document.getElementById(x);
/* Keep legacy concept renders out of the reference-illustration atlas. */
const qualityGate=()=>{
  for(const img of document.querySelectorAll('img[src^="/assets/weapons/"]')){
    const path=img.getAttribute("src")||"";
    const hit=path.match(/^\/assets\/weapons\/([a-z0-9-]+)\.webp(?:\?.*)?$/);
    if(!hit)continue;
    const parent=img.parentElement;
    if(!parent)continue;
    const directLabel=parent.querySelector(":scope > .art-generated-label");
    if(directLabel)directLabel.remove();
    const pending=document.createElement("div");
    pending.setAttribute("role","img");
    pending.setAttribute("aria-label",hit[1]+" 도감 고화질 이미지 준비 중");
    if(parent.classList.contains("art-pane")){
      parent.classList.remove("static-media");
      parent.classList.add("media-pending","quality-hidden");
      pending.className="media-pending-note";
      const heading=document.createElement("strong");
      heading.textContent="도감 이미지 준비 중";
      const desc=document.createElement("span");
      desc.textContent="고화질 이미지 검수 후 공개됩니다";
      pending.append(heading,desc);
    }else if(parent.classList.contains("category-illustration")){
      pending.className="quality-pending-mini";
      pending.textContent="이미지 준비 중";
    }else if(img.classList.contains("side-photo")){
      pending.className="side-photo quality-pending-side";
      pending.textContent="이미지 준비 중";
    }else if(img.classList.contains("feature-photo")){
      pending.className="feature-photo quality-pending-feature";
      pending.textContent="도감 이미지 준비 중";
    }else{
      pending.className="quality-pending-mini";
      pending.textContent="이미지 준비 중";
    }
    img.removeAttribute("src");
    img.replaceWith(pending);
  }
};
qualityGate();
const C=window.GHCore;
if(!C)return;
const e=C.escapeHTML;
const toast=text=>{const el=document.querySelector('.toast');if(!el)return;el.textContent=text;el.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>el.classList.remove('show'),2300);};
const copy=async text=>{try{await navigator.clipboard.writeText(text);toast('주소를 복사했습니다');}catch{toast('주소 복사를 사용할 수 없습니다. 주소창의 링크를 복사해 주세요.');}};
document.querySelectorAll('.copy-link').forEach(button=>button.addEventListener('click',()=>copy(button.dataset.copy)));
const historyURL=(url,mode)=>{if(location.pathname+location.search!==url)history[mode==='push'?'pushState':'replaceState']({gh:true},'',url);};

if(byId('atlas-form')){
 const controls={q:byId('atlas-q'),category:byId('atlas-cat'),country:byId('atlas-country'),image:byId('atlas-image'),sort:byId('atlas-sort')};
 const grid=byId('atlas-grid'),pagination=byId('atlas-pagination');
 let state=C.readAtlasState(location.search,items),editing=false;
 function restoreControls(){
  if(state.country&&!Array.from(controls.country.options).some(x=>x.value===state.country)){
   const option=document.createElement('option');option.value=state.country;option.textContent=state.country+' (함께 관련)';controls.country.append(option);
  }
  for(const [key,el] of Object.entries(controls))el.value=state[key];
 }
 function render(mode='replace',scroll=false){
  const result=C.selectCatalog(items,state);state.page=result.page;
  grid.setAttribute('aria-busy','true');grid.innerHTML=result.items.map((item,i)=>C.card(item,i===0)).join('');grid.setAttribute('aria-busy','false');
  byId('result-count').textContent=result.total+'개 항목'+(result.total?' · '+result.start+'–'+result.end:'');
  byId('filter-summary').textContent=[state.q?'검색: '+state.q:'',state.category,state.country?state.country+' 관련':'',state.image==='ready'?'일러스트 있음':state.image==='pending'?'이미지 자료 확인 중':'',state.sort==='name'?'이름 가나다순':'대표 기종·이미지 우선'].filter(Boolean).join(' · ');
  byId('no-results').hidden=result.total!==0;pagination.hidden=result.total===0;
  pagination.innerHTML=`<button type="button" data-page="${result.page-1}"${result.page===1?' disabled':''}>이전</button><span>${result.page} / ${result.pages} 페이지</span><button type="button" data-page="${result.page+1}"${result.page===result.pages?' disabled':''}>다음</button>`;
  historyURL(C.atlasUrl(state),mode);
  if(scroll){byId('result-count').focus({preventScroll:true});byId('result-count').scrollIntoView({block:'start'});}
 }
 function change(mode){for(const [key,el] of Object.entries(controls))state[key]=el.value;state.page=1;render(mode);}
 controls.q.addEventListener('input',()=>{change(editing?'replace':'push');editing=true;});
 controls.q.addEventListener('change',()=>{editing=false;});
 for(const [key,el] of Object.entries(controls))if(key!=='q')el.addEventListener('change',()=>{editing=false;change('push');});
 byId('atlas-form').addEventListener('submit',event=>{event.preventDefault();change('push');});
 byId('clear-filters').addEventListener('click',()=>{state=C.readAtlasState('',items);restoreControls();editing=false;render('push');controls.q.focus();});
 pagination.addEventListener('click',event=>{const button=event.target.closest('button[data-page]');if(!button||button.disabled)return;state.page=Number(button.dataset.page);render('push',true);});
 const restore=()=>{state=C.readAtlasState(location.search,items);editing=false;restoreControls();render();};
 window.addEventListener('popstate',restore);window.addEventListener('pageshow',event=>{if(event.persisted)restore();});
 restoreControls();render();
}

if(byId('compare-result')){
 const data=window.GH_EDITORIAL||{profiles:{},sources:{}};
 const defaults={a:'k2-black-panther',b:'m1-abrams'};
 const elements=Object.fromEntries(['a','b'].map(side=>[side,{search:byId('compare-search-'+side),category:byId('compare-cat-'+side),select:byId('compare-'+side),profile:byId('compare-profile-'+side),count:byId('compare-count-'+side)}]));
 let state={},editing={a:false,b:false};
 function readState(){
  const p=new URLSearchParams(location.search);state={};
  for(const side of ['a','b']){
   state[side]=items.some(x=>x.slug===p.get(side))?p.get(side):defaults[side];
   state['p'+side]=p.get('p'+side)||'';state['q'+side]=(p.get('q'+side)||'').slice(0,200);
   state['c'+side]=items.some(x=>x.category===p.get('c'+side))?p.get('c'+side):'';
   elements[side].search.value=state['q'+side];elements[side].category.value=state['c'+side];
  }
 }
 function populate(side){
  const el=elements[side],selected=items.find(x=>x.slug===state[side]);
  const found=C.filterCatalog(items,{q:state['q'+side],category:state['c'+side]}).slice().sort((a,b)=>a.name.localeCompare(b.name,'ko'));
  const options=found.map(x=>`<option value="${x.slug}">${e(x.name)}</option>`).join('');
  el.select.innerHTML=found.some(x=>x.slug===selected.slug)?options:`<optgroup label="현재 선택"><option value="${selected.slug}">${e(selected.name)}</option></optgroup><optgroup label="검색 결과">${options}</optgroup>`;
  el.select.value=selected.slug;el.count.textContent=found.length+'개 기종 일치'+(!found.some(x=>x.slug===selected.slug)?' · 현재 선택은 유지됩니다':'');
  const ids=selected.profileIds||[];
  el.profile.innerHTML=ids.length?ids.map(id=>`<option value="${e(id)}">${e(data.profiles[id].label)}</option>`).join(''):'<option value="">형식별 제원 미수집</option>';
  if(!ids.includes(state['p'+side]))state['p'+side]=ids[0]||'';
  el.profile.value=state['p'+side];el.profile.disabled=!ids.length;
 }
 function render(mode='replace'){
  for(const side of ['a','b'])populate(side);
  const a=items.find(x=>x.slug===state.a),b=items.find(x=>x.slug===state.b);
  byId('compare-result').innerHTML=C.renderComparison(a,b,state.pa,state.pb,data);
  const p=new URLSearchParams();for(const key of ['a','b','pa','pb','qa','qb','ca','cb'])if(state[key])p.set(key,state[key]);
  historyURL('/compare/?'+p.toString(),mode);
 }
 for(const side of ['a','b']){
  const el=elements[side];
  el.search.addEventListener('input',()=>{state['q'+side]=el.search.value;render(editing[side]?'replace':'push');editing[side]=true;});
  el.search.addEventListener('change',()=>{editing[side]=false;});
  el.category.addEventListener('change',()=>{state['c'+side]=el.category.value;render('push');});
  el.select.addEventListener('change',()=>{state[side]=el.select.value;state['p'+side]='';render('push');});
  el.profile.addEventListener('change',()=>{state['p'+side]=el.profile.value;render('push');});
 }
 byId('swap-compare').addEventListener('click',()=>{for(const prefix of ['','p','q','c'])[state[prefix+'a'],state[prefix+'b']]=[state[prefix+'b'],state[prefix+'a']];for(const side of ['a','b']){elements[side].search.value=state['q'+side];elements[side].category.value=state['c'+side];}render('push');});
 byId('share-compare').addEventListener('click',()=>copy(location.href));
 const restore=()=>{editing.a=editing.b=false;readState();render();};window.addEventListener('popstate',restore);window.addEventListener('pageshow',event=>{if(event.persisted)restore();});
 restore();
}
})();
