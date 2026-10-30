(()=>{"use strict";const items=window.GH_DATA||[];const byId=x=>document.getElementById(x);
/* Image quality gate: keep original WebP assets in Git; show only explicitly approved renders.
   Reopen an image only after visual QC by adding its slug here AND to the CSS whitelist. */
const approvedWeaponImages=new Set(["k2-black-panther"]);
const qualityGate=()=>{
  for(const img of document.querySelectorAll('img[src^="/assets/weapons/"]')){
    const path=img.getAttribute("src")||"";
    const hit=path.match(/^\/assets\/weapons\/([a-z0-9-]+)\.webp(?:\?.*)?$/);
    if(!hit||approvedWeaponImages.has(hit[1]))continue;
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
const updateCounts=()=>{const total=document.querySelector(".numbers-inner .stat strong");if(total)total.textContent=String(items.length).padStart(2,"0");for(const tile of document.querySelectorAll(".category-tile")){const label=tile.querySelector("span");const digit=tile.querySelector(".category-number");if(label&&digit){const count=items.filter(i=>i.category===label.textContent.trim()).length;const arrow=digit.querySelector("span");digit.textContent=String(count).padStart(2,"0")+" ";if(arrow)digit.appendChild(arrow)}}};updateCounts();const toast=t=>{let e=document.querySelector(".toast");if(!e)return;e.textContent=t;e.classList.add("show");clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>e.classList.remove("show"),2300)};document.querySelectorAll(".copy-link").forEach(b=>b.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);toast("주소를 복사했습니다")}catch(e){toast("주소 복사 기능을 사용할 수 없습니다")}}));const q=byId("atlas-q"),cat=byId("atlas-cat"),country=byId("atlas-country"),stage=byId("atlas-stage");if(q&&cat&&country&&stage){const params=new URLSearchParams(location.search);q.value=params.get("q")||"";cat.value=params.get("category")||"";country.value=params.get("country")||"";stage.value=params.get("stage")||"";const cards=[...document.querySelectorAll("#atlas-grid .weapon-card")];const update=()=>{const term=q.value.toLocaleLowerCase().trim(),c=cat.value,n=country.value,v=stage.value;let num=0;cards.forEach(card=>{const ok=(!term||card.dataset.search.includes(term))&&(!c||card.dataset.category===c)&&(!n||card.dataset.country===n)&&(!v||card.dataset.stage===v);card.hidden=!ok;if(ok)num++});byId("result-count").textContent=num+"개 항목";byId("no-results").hidden=num!==0;const p=new URLSearchParams();if(term)p.set("q",q.value.trim());if(c)p.set("category",c);if(n)p.set("country",n);if(v)p.set("stage",v);history.replaceState(null,"",location.pathname+(p.size?"?"+p.toString():""))};q.addEventListener("input",update);cat.addEventListener("change",update);country.addEventListener("change",update);stage.addEventListener("change",update);byId("clear-filters").addEventListener("click",()=>{q.value="";cat.value="";country.value="";stage.value="";update();q.focus()});update()}const a=byId("compare-a"),b=byId("compare-b"),out=byId("compare-result");if(a&&b&&out){for(const sel of [a,b]){const have=new Set([...sel.options].map(o=>o.value));for(const item of items){if(!have.has(item.slug)){const option=document.createElement("option");option.value=item.slug;option.textContent=item.name+" · "+item.category;sel.appendChild(option)}}}const p=new URLSearchParams(location.search);a.value=items.some(i=>i.slug===p.get("a"))?p.get("a"):items[0].slug;b.value=items.some(i=>i.slug===p.get("b"))?p.get("b"):items[1].slug;const safe=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));const media=i=>(i.imagePending||!approvedWeaponImages.has(i.slug))?'<div class="compare-image-pending" role="img" aria-label="'+safe(i.name)+' 이미지 제작 대기">공식 외형 검증 이미지 제작 대기</div>':'<img src="/assets/weapons/'+safe(i.slug)+'.webp" alt="AI 생성 개념 이미지" width="960" height="540" loading="lazy"/>';const cell=(s,type)=>'<div class="'+type+'">'+safe(s||"정보 확인 필요")+"</div>";function draw(){let x=items.find(i=>i.slug===a.value),y=items.find(i=>i.slug===b.value);if(!x||!y)return;const rows=[["대상",x.name,y.name],["영문명",x.english,y.english],["분야",x.category,y.category],["유형",x.type,y.type],["국가",x.country,y.country],["시대",x.period,y.period],["제조·관련 기관",x.maker,y.maker],["핵심 설명",x.summary,y.summary]];const keys=[...new Set([...Object.keys(x.facts),...Object.keys(y.facts)])];keys.forEach(k=>rows.push([k,x.facts[k]||"—",y.facts[k]||"—"]));out.innerHTML='<div class="comparison-table">'+rows.map((r,i)=>cell(r[0],"label")+ (i===0?'<div class="value head compare-weapon-head">' + media(x) + '<a href="/weapons/'+x.slug+'/">'+safe(x.name)+'</a></div><div class="value head compare-weapon-head">' + media(y) + '<a href="/weapons/'+y.slug+'/">'+safe(y.name)+"</a></div>":cell(r[1],"value")+cell(r[2],"value"))).join("")+"</div>";const url=new URL(location.href);url.searchParams.set("a",x.slug);url.searchParams.set("b",y.slug);history.replaceState(null,"",url.pathname+url.search)}a.addEventListener("change",draw);b.addEventListener("change",draw);byId("swap-compare").addEventListener("click",()=>{const tmp=a.value;a.value=b.value;b.value=tmp;draw()});draw()}})();