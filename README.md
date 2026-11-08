# GuideHollow Weapons
한국어 무기·군사기술 백과사전 — https://weapons.guidehollow.com/

## 구동
서버 프레임워크에 의존하지 않는 정적 HTML/CSS/JS 입니다. GitHub Pages의 `main` root 배포와 GitHub Actions 배포에 대응합니다.

## 구조
- `index.html` : 메인
- `atlas/index.html` : 이름·국가·분야 검색
- `compare/index.html` : 브라우저에서 실행되는 비교 도구
- `weapons/<slug>/index.html` : 기종별 상세 도감
- `assets/catalog.js` : 비교 데이터(정적 JSON JS)
- `assets/site.js` : 검색·비교·링크 복사
- `assets/style.css` : 모바일 우선 다크 테마
- `CNAME` : 사용자 연결 서브도메인
- `.github/workflows/deploy-pages.yml` : 자동 배포 워크플로

## 편집 정책
- 역사·공개 기술·제원과 비교에 집중
- 실제 운용·제조·개조·구매 지침 제공하지 않음
- 도감과 비교 화면에는 기종과 편집·재사용 조건을 확인한 실물 사진을 바탕으로 제작한 AI 일러스트를 표시
- 실물 사진은 기종과 이용 조건을 확인해 촬영자·원본·라이선스를 표시. 상세 제원은 공개 원문을 확인한 뒤 추가
- 네이버 웹마스터 소유확인 메타태그 모든 페이지에 포함

## 주의
GitHub Pages 설정에서 Source가 `Deploy from a branch`이면 `main /(root)`로, `GitHub Actions`이면 워크플로 배포 결과로 사이트가 표시됩니다. 두 경로를 모두 지원하도록 순수 정적으로 작성했습니다.

## 현재 데이터 편집과 검증 · 2026-11-07

- 공개 상세 페이지 337개, 실물 사진 기반 AI 일러스트 265개, 이미지 자료 확인 중 72개. 페이지 공개·개별 자료 검토·이미지 준비는 서로 다른 상태다.
- `data/catalog.json`이 공개 항목·관련 국가·기존 별칭·개별 검토일·이미지 크레딧의 원본이다. `assets/catalog.js`는 브라우저용 생성물이다.
- `data/editorial.json`은 직접 검토한 공식 출처·형식별 비교 프로필·M1/F-35 본문의 원본이다. 대표 본문과 비교는 같은 프로필을 사용한다. 다른 글은 기존 HTML 본문을 유지하며 전체 문서 심층 검증을 뜻하지 않는다.
- `templates/home.html`과 `scripts/build.mjs`가 홈·도감 첫24개·337개 정적 이름 링크·기본 비교·대표 본문·공통 메타데이터와 에셋 해시를 생성한다. 기존 URL·GitHub Pages 배포 구조는 유지한다.
- 관련 국가는 명시된 개발·운용 등 관계를 포함한다. 기존 `대한민국 운용`과 복합 국가를 검색할 수 있으며 개발국 필터로 해석하지 않는다. ‘인도 발표’ 같은 일반 단어를 국가로 추출하지 않는다.
- 개별 자료를 실제 검토했을 때만 해당 글 검토일과 원본 데이터의 검토일을 갱신한다. 사이트 구성 수정일은 글의 검토일을 대신하지 않는다.

Node24와 Python3 표준 라이브러리로 실행하며 추가 패키지는 없다.

```sh
node --test tests/*.test.cjs
node scripts/build.mjs
node scripts/build.mjs --check
python3 scripts/validate.py
python3 -m http.server 8768 --bind 127.0.0.1
```

새 항목은 실제 상세 HTML·확인된 기본 데이터·출처를 준비한 뒤 카탈로그와 사이트맵에 함께 추가한다. 개수와 분야 합계는 데이터에서 계산된다. 이미지가 준비되지 않아도 상세 링크는 유지한다. 숫자나 생성된 카탈로그를 개별 HTML에서 따로 고치지 않는다.

PR/`codex/**` 브랜치 검증은 `.github/workflows/quality.yml`에서 실행한다. main 배포 워크플로는 변경하지 않았다. 이번 개선은 PR 검토 대상이며 main 병합·배포하지 않는다.


## 이미지 정렬·누락 표시 개선 (2026-11-08)

- 전체 337개 상세 페이지와 265개 전용 WebP를 점검했고, 피사체가 캔버스 중앙에서 벗어난 24개를 피사체 전체가 보이도록 단색 16:9 구도로 재배치했습니다. 나머지 241개는 원본 구도를 유지했습니다.
- 상단 대표 이미지·카테고리·목록·비교·본문에서 화면 비율에 맞춘 중앙 정렬과 모바일 레이아웃을 통일했습니다.
- 전용 이미지가 없는 72개 항목에는 목록 카드와 본문에 명확한 "이미지 자료 확인 중" 표시를 넣었습니다. 이는 이미지 제작 완료가 아니며 다른 기종 그림을 대체하지 않습니다.
- [이미지별 위치 점검 기록](docs/qa/2026-11-08/media-framing.json)과 이미지 정합성 검사 스크립트로 수정 내역을 확인할 수 있습니다. 새 이미지는 기종 외형·라이선스·크레딧 검토가 필요합니다.

## 이전 작업 기록

### 탐색 후속 개선 · 2026-11-08

- 홈·상세·안내 페이지는 도감 검색용 카탈로그를 다운로드하지 않는다. `catalog-core.js`와 `catalog.js`는 `/atlas/`, `/compare/`에만 포함된다. 상세 링크 복사는 카탈로그 없이 동작한다.
- 비교 선택기는 형식별 제원이 있는 기종을 먼저 표시한다. 양쪽의 자료 필터·검색·분야는 URL에 보존되며, 초기화는 선택한 기종과 세부 형식을 유지한다.
- 검색 중 비교 대상·형식이 바뀌지 않으면 비교표 DOM을 유지해 열린 기본 정보와 표 내부 상태를 보존한다.
- JavaScript가 꺼져 있으면 작동하지 않는 탐색·비교 조작부를 숨기고 전체 정적 링크와 기본 비교표를 제공한다.
- 검증 기록과 선택적으로 실행하는 브라우저 검사: [2026-11-08 QA](docs/qa/2026-11-08/report.md). Node/Python 기본 검증에는 새 패키지가 필요하지 않다.

아래 날짜별 기록의 개수·상태는 당시 작업 이력이며 현재 상태가 아니다. 현재 기준은 위 데이터 편집·검증 절차와 실제 생성 데이터다.

## 과거 이미지 공통 배경 규칙 (2026-10-29)
- **고정 색상:** `#111C2B` (모든 썸네일, 상세 도감, 히어로, 모션 시연)
- **배경 요소 금지:** 풍경, 스튜디오 세트, 안개, 먼지, 광선, 하늘, 격자, 그라데이션, 장식 패턴
- **피사체:** 무기 한 대(또는 역사 자료의 개념 도식)만 중앙에 완전히 노출
- **표현:** 고해상도 도감용 스튜디오 렌더 또는 설명용 개념 일러스트
- **일관성:** 원본 이미지의 배경도 `#111C2B`로 제작. CSS 배경만 바꿔서 원본 풍경을 숨겼다고 주장하지 않음
- **표기:** AI 생성 컨셉 이미지는 'AI 생성 개념 이미지'로 명시, 실제 사진·정확한 도면으로 오인되지 않도록 함
- **동작:** 모션은 피사체의 느린 이동·확대와 최소한의 제목 등장만 사용

## 정적 AI 콘셉트 이미지 (2026-10-29)
- 초기 14종 이미지 제작 당시 `assets/weapons/*.webp` 총 14종이었으며, 이후 2차 확장 10종이 더해졌다. 현재 24종 보유.
- 당시 메인·카드·상세·비교 영역에 적용.
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

## 실물 사진 및 도감 보강 · 2026-11-07

- 대기 원고 300종을 공식 출처가 있는 상세 도감으로 옮겼다. 로컬 작업본은 상세 도감 337편이며 도감 목록·검색·비교·사이트맵에 같은 기종을 연결한다.
- 기존 사진 없는 상세 글 28편에 검증된 실물 사진을 추가해 `assets/photos/`의 사진은 37장이다. 촬영된 세부 형식·저작자·원본·라이선스를 표시하고 크기와 파일 형식만 변경했다.
- 추가한 300편에는 실물 사진 확인 상태를 표시한다. 기존 AI 렌더는 도감, 목록, 홈, 비교, 공유 미리보기에서 제외했다.
- OH-6A는 미 육군 형식으로 분류하고 한국 육군 500MD와의 관계를 설명한다. EC-47Q는 미 공군 부대사, 사진 기록, 참전자 자료를 구분해 인용한다.
- 이 수치는 로컬 작업본 기준이다.

## 실물 사진 기반 일러스트 · 2026-11-07

- 도감 이미지 265장을 실제 기종 사진을 직접 참고한 AI 일러스트로 교체했다. `assets/illustrations/`에 보관한다.
- 각 일러스트의 상세 설명에 AI 제작 사실, 참고 사진, 저작자와 라이선스를 표시한다. 외형을 확인할 수 있는 공개 자료가 필요한 경우 참고 사진의 원본 링크를 이용한다.
- 승인된 일러스트가 없는 상세 글 72편은 도감 일러스트 준비 중으로 표시한다.

### 추가 일러스트 60종 · 2026-11-07

- 실제 기종과 편집 가능한 라이선스를 확인한 사진을 직접 입력해 일러스트 60장을 추가했다. 합계 97종, 이미지 준비 중 240종이다.
- 도감 카드·상세 글·관련 기종·비교 화면에 같은 이미지를 연결하고, 상세 글에 원본 사진·저작자·라이선스와 AI 제작 표시를 제공한다.
- 원본 사진에서 차체가 가려진 천마·레드백, 피사체가 작은 한국 해군 P-8A, 생성 검수를 통과하지 못한 K9 VIDAR·코멧은 이번 이미지 적용에서 제외했다.

### 남은 240종 이미지 조사 · 2026-11-07

- 240종 모두를 조사·판정했고, 실물 기종·촬영 사진·편집 허용 라이선스와 생성 결과를 대조한 신규 일러스트 168종을 적용했다. 합계 265종, 보류 72종이다.
- 도감·상세 글·관련 카드·비교 화면·공유 미리보기에 같은 일러스트를 연결했다. AI 제작 표시, 원본 링크, 저작자, 라이선스 및 필요한 동일조건변경허락 표기를 함께 제공한다.
- 원본 사진·영상 프레임은 제작 입력과 검증 자료로만 사용하며 사이트 이미지로 게시하지 않는다. 촬영된 세부 형식·운용국·실제 외형을 유지하고 보이지 않는 주요 형상을 임의로 완성하지 않았다.
- 보류 항목은 정확한 변형·운용국·편집 권리·촬영 사진 여부·주요 외형을 확인하지 못했거나 생성 도구에서 차단된 경우다. 신궁 홍보책자 컷과 소유권 분쟁 K2C1 사진은 제외했다. 보류 항목의 기본형·유사 기종 사진을 대신 사용하지 않는다.
