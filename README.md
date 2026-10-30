# GuideHollow Weapons
한국어 무기·군사기술 백과사전 — https://weapons.guidehollow.com/

## 구동
서버 프레임워크에 의존하지 않는 정적 HTML/CSS/JS 입니다. GitHub Pages의 `main` root 배포와 GitHub Actions 배포에 대응합니다.

## 구조
- `index.html` : 메인
- `atlas/index.html` : 이름·국가·분야 검색
- `compare/index.html` : 브라우저에서 실행되는 비교 도구
- `weapons/<slug>/index.html` : 독립 URL의 도감 28건
- `assets/catalog.js` : 비교 데이터(정적 JSON JS)
- `assets/site.js` : 검색·비교·링크 복사
- `assets/style.css` : 모바일 우선 다크 테마
- `CNAME` : 사용자 연결 서브도메인
- `.github/workflows/deploy-pages.yml` : 자동 배포 워크플로

## 편집 정책
- 역사·공개 기술·제원과 비교에 집중
- 실제 운용·제조·개조·구매 지침 제공하지 않음
- 초기 그림은 종류별 개념 도식이며 정확한 외형 재현 아님
- 사진과 상세 제원은 출처·사용 권한을 확인한 뒤 추가
- 네이버 웹마스터 소유확인 메타태그 모든 페이지에 포함

## 주의
GitHub Pages 설정에서 Source가 `Deploy from a branch`이면 `main /(root)`로, `GitHub Actions`이면 워크플로 배포 결과로 사이트가 표시됩니다. 두 경로를 모두 지원하도록 순수 정적으로 작성했습니다.

## 이미지 공통 배경 규칙
- **고정 색상:** `#111C2B` (모든 썸네일, 상세 도감, 히어로, 모션 시연)
- **배경 요소 금지:** 풍경, 스튜디오 세트, 안개, 먼지, 광선, 하늘, 격자, 그라데이션, 장식 패턴
- **피사체:** 무기 한 대(또는 역사 자료의 개념 도식)만 중앙에 완전히 노출
- **표현:** 고해상도 도감용 스튜디오 렌더 또는 설명용 개념 일러스트
- **일관성:** 원본 이미지의 배경도 `#111C2B`로 제작. CSS 배경만 바꿔서 원본 풍경을 숨겼다고 주장하지 않음
- **표기:** AI 생성 컨셉 이미지는 'AI 생성 개념 이미지'로 명시, 실제 사진·정확한 도면으로 오인되지 않도록 함
- **동작:** 모션은 피사체의 느린 이동·확대와 최소한의 제목 등장만 사용

## 정적 AI 콘셉트 이미지 (2026-10-29)
- 초기 14종 이미지 제작 당시 `assets/weapons/*.webp` 총 14종이었으며, 이후 2차 확장 10종이 더해졌다. 현재 24종 보유.
- 모든 메인·카드·상세·비교 영역에 적용.
- 현재 일부 AI 개념 렌더는 실제 기종 외형과 다를 수 있으므로 구체적 자료 사진으로 취급하지 않습니다.
- 회전 뷰어 비활성화. `/motion/`은 정적 이미지 예시로 전환.

## 2차 도감 확장 · 2026-10-29
- 기존 14종에서 24종으로 확장. 신규 10종: K1A2 전차, K21 보병전투장갑차, K808 백호, K239 천무, K55A1 자주포, FA-50 파이팅 이글, KUH-1 수리온, 챌린저 2, 르클레르, 90식 전차
- 신규 WebP 이미지 10개 (AI 생성 개념 이미지, 단색 다크 배경) 및 출처 링크
- 검색·국가 필터·제원 비교·사이트맵 동기화
- AI 이미지의 실제 기종별 외형 일치 검증은 별도 필요

## 3차 항공기 확장 · 2026-10-29
- 25번째 도감 `weapons/lah-miron/index.html`: KAI LAH-1 미르온 공식 제원·개발 이력·육군 첫 인도·LCH 및 수리온과의 차이 수록
- 24종 이미지 중 타 기체 이미지를 재활용하지 않으며, LAH-1의 `imagePending` 항목은 단색 #111C2B 텍스트 플레이스홀더 표시
- LAH 이미지 완성 시 전용 `assets/weapons/lah-miron.webp`로 교체 후 카탈로그 `imagePending`을 제거하고 상세/홈/atlas/비교 전부 일관되게 수정
- 카탈로그, 홈 도감 수, 검색·분야 분류, 비교, 사이트맵 등록 동기화
- 미르온 이미지 제작·검수는 별도 이미지 담당 채팅이 담당. 공식 사진 링크를 실물 검증에만 활용하고 무단 재게시하지 않는다

## 4차 항공기 확장 · 2026-10-29
- KT-1 웅비 신규 도감 `weapons/kt1-woongbi/index.html` 추가(총 26종)
- KTX-1 최초 비행(1991), KT-1 양산기 납품(2000), KT-1B/T/P 수출형, KA-1 공중통제형과 KA-1S 구분
- KAI 및 국방과학연구소 자료를 근거로 제원·역사·사진 확인 링크 제공
- KT-1 웅비 신규 도감 이미지 제작 대기(`imagePending: true`); 다른 기체의 사진을 대체하지 않음
- 도감 26종, 군용항공기 8종으로 목록·홈·검색·제원비교·사이트맵 동기화

## 5차 항공기 확장 · 2026-10-29
- KA-1 공중통제기 신규 도감 `weapons/ka1-airborne-controller/index.html` 추가(총 27종)
- 과거 KO-1 명칭과 2005년 최초 비행, 2006년 공군 실전배치를 구분
- KT-1 기본훈련기와 KA-1의 임무·최대이륙중량 차이 및 페루·세네갈 수출형 설명
- KAI 제조사·방위사업청 공식 발표와 제조사 제공 실물 사진 링크 수록
- 전용 이미지 제작 대기(`imagePending:true`), 다른 기종 사진을 임시 재사용하지 않음
- 전체 27종, 군용항공기 9종으로 홈·도감·비교·사이트맵·카탈로그 동기화

## 6차 항공기 확장 · 2026-10-29
- T-50 골든이글 고등훈련기: `weapons/t50-golden-eagle/index.html` 신규 등록(총 28종)
- KAI/록히드마틴 공식 근거로 2001년 시제기 출고, 2002년 최초 비행, 2003년 첫 초음속 비행, 2005년 첫 양산기 납품, 2007년 학생 조종사 첫 비행훈련 구분
- T-50, TA-50, FA-50, T-50B 역할 및 기본형/개량형 제원 분리, 동남아·중동 수출 훈련형과 경전투기형 구분
- 이미지 `imagePending:true`, 실제 T-50 전용 렌더 없으므로 #111C2B 단색 대기 표시(타 항공기 이미지 재사용 금지)
- 홈·Atlas·비교·사이트맵·README 일치: 전체 28종, 군용항공기 10종


## 도감 증설 — 2026-10-30
- 기존 28종 + 신규 5종: 10식 전차, PzH 2000 자주포, M2 브래들리 보병전투장갑차, M109 팔라딘 자주포, M4 셔먼 전차 (합계 33종)
- 공식 출처 기반 원고를 개별 페이지로 통합하며 검색, 비교 선택지, 사이트맵을 동기화
- 신규 5종 이미지는 실제 기종 외형 검수 완료 전까지 의도적으로 '도감 이미지 준비 중' 상태 유지
- 원고 이전 출처: work/weapons-global-ground-m4-sherman 및 선행 PR #7, #9, #10, #13, #17


## Image quality publication gate (2026-10-30)
- The site currently publishes only the K2 Black Panther concept render. All other weapon imagery is suppressed in the homepage, categories, atlas cards, article pages, related cards and comparison tool.
- Do not delete any existing image binaries. Keep them available for image review/replacement.
- Controlled centrally by \`approvedWeaponImages\` in \`assets/site.js\` and the anti-flash CSS whitelist in \`assets/style.css\`.
- A larger file size alone does not establish quality. Require a reviewed, recognizable, crisp, correct-weapon render before adding a slug to both whitelists.
- The actual encyclopedia articles remain publicly accessible. Missing visuals show a uniform \`도감 이미지 준비 중\` state.


## Editorial backlog (2026-10-30)
- 64 independent weapons have been added to `data/weapon-backlog.json`, assigned 16 each to editorial chats 1–4.
- All 64 are visible under `/atlas/` as nonclickable `원고 준비 중` entries, searchable/filterable by country, category and status.
- Distinguish 97 total listed subjects from 33 completed articles. The new entries are not in `GH_DATA` comparison results or sitemap until their factual pages are ready.
- After an editorial PR publishes an entry: remove its item from backlog, replace its atlas article with a linked card, and update the count. Only approve a weapon image after separate visual QA.


## Weapons backlog batch B (2026-10-30)
- 80 additional planned subjects added: 20 each for editors 1/2/3/4.
- Public atlas: 177 cards total = 33 published article cards + 144 clearly marked editorial placeholders.
- Exact item slugs and editorial assignment: `data/weapon-backlog.json` (includes `batch: "2026-10-30-b"`).
- Planned entries remain unlinked and do not enter `assets/catalog.js`, detailed URLs or sitemap until specialists complete their fact-checked articles.
- Publication of any queued weapon must also remove that entry from the backlog to avoid duplicates. Image display continues to require separate visual-quality approval.


## Editorial backlog batch C (2026-10-30)
- 80 new planned weapon subjects, 20 per specialist editing group (1–4), `batch: 2026-10-30-c`.
- Atlas now lists 257 weapons: 33 published articles and 224 clearly marked planned entries.
- Each planned entry has a unique slug and remains unlinked, unindexed as an individual article and without unverified imagery.
- On article completion remove the matching queue record, publish a source-backed page, replace planned card with a linked card, and add verified metadata to catalog and sitemap.


## Editorial backlog batch D (2026-10-30)
- New entries: 80 (20 per specialist editorial group 1-4); batch flag `2026-10-30-d`.
- Atlas now shows 337 entries = 33 published, 304 queued. Planned entries are explicitly unlinked and carry no speculative specifications.
- Never promote a queued entry to catalog/compare/sitemap until the article is researched, checked and published. Remove the queue card when publishing to prevent duplication.
- Retain the image quality gate: only visually approved weapon imagery is displayed.

## K1 전차 원고 완성 — 2026-10-30
- `weapons/k1-mbt/index.html`: 최초 한국형 전차 K1의 개발사·시험·배치·105mm 강선포·유기압 현수장치·K1A1/K1E1/K1A2 구분·운용·외형·FAQ·기관 출처 6건.
- 기존 337종 전체 목록 유지: 공개 원고 34종 / 편집 대기 303종. 편집 대기 원장에서 `k1-mbt`만 제거하고 고유 상세 URL·홈/도감/비교실/사이트맵에 1회 등록.
- `imagePending: true`. 승인 이미지 없이 텍스트 대기 상태 유지. `assets/site.js`, `assets/style.css`, 기존 바이너리, 이미지 승인 목록 미변경.
