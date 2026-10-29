# 해외 항공·해군·방공·무인체계 도감: 초기 품질 점검 및 신규 후보

- 검토일: 2026-10-29 (KST)
- 담당: 채팅 4 / `work/weapons-systems`
- 대상 저장소: `emfls/guidehollow-weapons`
- 기준: `main` 커밋 `186655b3f37e022ff5549e0c8fc5b34ed0ce76e3`
- 문서 성격: **편집 점검 및 차기 원고 계획**. 이 문서만으로 기존 도감 내용이 수정되거나 신규 도감이 발행되는 것은 아님.

## 1. 범위와 중복 조사

기준 main의 `weapons/*/index.html`에는 24개 도감이 있다. 이 가운데 채팅 4 담당은 해군 2개, 방공 2개, 무인체계 1개, 해외 전투기 3개로 **8개**다.

| 분야 | 기준 main에 존재하는 항목 |
|---|---|
| 해군함정 (2) | `arleigh-burke`, `sejong-the-great` |
| 방공체계 (2) | `patriot-system`, `iron-dome` |
| 무인체계 (1) | `mq9-reaper` |
| 해외 전투기 (3) | `f16-fighting-falcon`, `f22-raptor`, `f35-lightning-ii` |

조사 시작 시 열린 PR은 없었고, `main`과 별도 지상무기 담당 브랜치가 관찰되었다. **이 목록은 해당 시점의 스냅샷**이며 신규 원고 작성 전에는 열린 PR과 모든 작업 브랜치를 다시 조회한다. 한국 군용항공기는 채팅 2, 해외 지상무기·개인화기는 채팅 3, 한국 지상무기·포병은 채팅 1의 소관이므로 여기서 다루지 않는다.

## 2. 기존 해군·방공·무인체계 5개 도감 점검

현재 5개 문서 모두 '핵심 요약 / 개발과 역사 / 어떻게 이해해야 할까 / 참고 자료' 구조를 갖췄으나, 실제 설명은 대체로 한두 문장에 머문다. 출처도 상당수가 제조사 또는 기관의 **상위 홈페이지**이므로 항목별 사실을 직접 확인하기 어렵다. 특정 수치가 틀렸다는 판정이 아니라 **공개 검증 정보를 충분히 제공하지 못했다는 품질 진단**이다.

### [높음] 알레이 버크급 구축함 — `weapons/arleigh-burke/index.html`

- 현황: Flight I·II·IIA·III 구분을 제시하나, 각 단계의 변화와 최초 함정 연혁 설명이 부족함. 링크는 미 해군 홈페이지 또는 포괄적인 팩트파일 목록.
- 보강: DDG-51부터의 개발·취역 연혁, 건조사, 주요 임무, Flight별 변화와 공개 크기·승조원 수치(적용 형식 명시).
- 공식 확인: 미 해군은 Flight III 초도함 DDG-125 Jack H. Lucas의 2023년 10월 취역과 AN/SPY-6(V)1 레이더 도입을 확인함.
- 근거: https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/Article/2169871/destroyers-ddg-51/destroyers-ddg-51/ ; https://www.navsea.navy.mil/Media/News/Article/3509924/uss-jack-h-lucas-to-commission-in-tampa-florida/

### [높음] 세종대왕급 구축함 — `weapons/sejong-the-great/index.html`

- 현황: 이지스 탑재와 2000년대 사업이라는 요약만 있고 건조·취역 연혁, 배수량·치수의 공개 근거, 계열 차이 설명이 없음. 방위사업청·해군 홈페이지 링크가 포괄적.
- 보강: KDX-III **Batch I(세종대왕급)**의 형성 및 공개 임무, 개별 함정 연혁, **Batch II(정조대왕급)**와의 차이를 별도 문단에서 설명. Batch II 제원을 기존 Batch I의 제원으로 혼용하지 않기.
- 공식 확인: 방위사업청은 정조대왕함을 광개토-III Batch II 초도함으로 명시하며, 2024년 11월 27일 해군에 인도했다고 발표함. 정조대왕급을 장차 **별도 신규 도감**으로 다룰 가치가 있음.
- 근거: https://dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=15491&menuSeq=3069 ; https://dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=20270&menuSeq=3069

### [높음] 패트리엇 — `weapons/patriot-system/index.html`

- 현황: 레이더·지휘통제·발사장치가 결합된 시스템이라고 설명하나 주요 개량 계열, 체계와 요격탄의 관계 및 직접 출처가 빠짐.
- 보강: Patriot 체계의 역사와 역할, 레이더·지휘통제·발사기·요격탄 구분, PAC-2 GEM-T 계열과 PAC-3 및 PAC-3 MSE의 **명칭·업체·개발 계보**를 구별하여 기술.
- 주의: 제조사별 공개 홍보 성능, 시험 성과, 실전 요격률을 동일한 측정치처럼 혼합하거나 무조건적 성공률을 기재하지 않기. 방어·회피·타격 절차는 쓰지 않기.
- 근거: https://www.rtx.com/raytheon/what-we-do/integrated-air-and-missile-defense/global-patriot-solutions ; https://sustainability.lockheedmartin.com/content/dam/lockheed-martin/mfc/pc/meads/mfc-pac-3-mse-pc.pdf

### [높음] 아이언 돔 — `weapons/iron-dome/index.html`

- 현황: 이스라엘의 방공체계라는 문장만으로는 개발 배경, 시기, 구성 요소, Rafael의 역할을 파악하기 어려움. 현재 출처는 제조사 홈페이지 최상위.
- 보강: 2007년 개발 결정, 2010년 체계 인도, 2011년 최초 요격의 연혁; Rafael 개발사·Tamir 요격탄의 관계; 지상형과 C-Dome의 별개 함정 탑재형 명칭 구분.
- 공식 확인: Rafael의 Iron Dome 제품 페이지는 개발 결정 및 최초 요격 연도를 직접 명시함.
- 근거: https://www.rafael.co.il/system/iron-dome/ ; https://www.rafael.co.il/our-story/

### [높음] MQ-9 리퍼 — `weapons/mq9-reaper/index.html`

- 현황: 원격 조종 항공체계의 일반적인 구성만 설명하며 개발 동기·초기 운용능력 확보·공개 치수·파생형 구분이 누락됨. 미국 공군 인용 링크가 개별 MQ-9 팩트시트가 아닌 목록으로 연결됨.
- 보강: MQ-1과의 계보, 2007년 10월 초기 운용능력 확보, 항공기와 지상 통제체계의 역할, 검증 가능한 기초 제원. 기초형/ER 등 형식별 데이터 혼동 금지.
- 미 공군 공개값 예시: 기본형 날개폭 20.1m, 길이 11m, 원격 승무원 2명. 이 수치는 **미 공군 팩트시트의 해당 형식과 갱신시점에 한정**해 인용.
- 주의: RAF Protector RG Mk1(MQ-9B 계열)은 MQ-9 리퍼 기본형과 동일 제원으로 취급하지 않음.
- 근거: https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104470/mq-9-reaper/ ; https://www.raf.mod.uk/aircraft/current-aircraft/protector-rg-mk-1-mq-9b11/

## 3. 추가 편집 개선 사항

1. **출처 직접성**: '해군 공식 홈페이지'가 아니라 해당 함급 팩트시트, 공문·보도자료, 제조사 제품의 정확한 URL을 붙인다.
2. **제원표 분리**: 함급·항공기·유도탄의 버전, 기준시점, 측정 단위, 배수량 기준 또는 기본형/개량형을 표 안에 명시한다. 미확인 값은 표에서 제외한다.
3. **사실과 계획 구분**: 현재 운용·과거 취역·계약·예정·시험 단계는 별도 상태로 기재한다. 업체 홍보 문구는 공식 발표에 따른 주장으로 한정한다.
4. **독립적 검색 가치**: '왜 개발했나', '무엇이 달라졌나', '어떤 형식이 있나', '다른 동급 체계와 무엇이 다른가'를 항목별로 구체화한다.
5. **도감 내부 연결**: 세종대왕급 ↔ 알레이 버크급 ↔ 정조대왕급; 패트리엇 ↔ 아이언 돔 ↔ SAMP/T NG; MQ-9 ↔ RQ-4 ↔ MQ-4C 등 맥락 있는 연결을 추가한다.
6. **이미지 처리**: AI 생성 시각자료는 본 채팅에서 제작하지 않는다. 이미지 전담 채팅으로 외형 검증·단색 #111C2B 배경·출처 기준을 전달한다.

## 4. 신규 도감 후보 — 현재 24종과 제목/검색 의도 중복 없음

| 우선순위 | 후보 / 제안 slug | 구별되는 독립 주제 | 1차 공식 근거 |
|---|---|---|---|
| P1 | 버지니아급 공격원잠 / `virginia-class-submarine` | 잠수함 Block별 발전·VPM과 함정 역사 | https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/article/2169558/attack-submarines-ssn/ |
| P1 | RQ-4 글로벌 호크 / `rq4-global-hawk` | 고고도 장기체공 **비무장** 감시정찰체계; MQ-9과 용도 대비 | https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/196043/northrop-grumman-rq-4-global-hawk/ |
| P1 | SAMP/T NG / `samp-t-ng` | 프랑스·이탈리아의 지상 방공체계 및 유럽 산업협력 | https://www.mbda-systems.com/products/area-protection/aster-family/sampt-ng |
| P2 | 정조대왕급 구축함 / `jeongjo-the-great-class` | KDX-III Batch II 독립 사업과 Batch I 비교 | https://dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=20270&menuSeq=3069 |
| P2 | MQ-4C 트라이튼 / `mq4c-triton` | 해상 정찰 무인기, RQ-4에서 파생된 임무 차이 | https://www.navair.navy.mil/product/MQ-4C |
| P2 | 모가미급 호위함 / `mogami-class-frigate` | 일본 해상자위대 신형 다목적 호위함의 공개 연혁 | https://www.mod.go.jp/msdf/equipment/ships/ffm/mogami/ |
| P2 | 제럴드 R. 포드급 항공모함 / `gerald-r-ford-class` | 항공모함 세대교체와 전자기 사출체계 등 공개 기술사 | https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/Article/2169795/aircraft-carriers-cvn |
| P2 | Protector RG Mk1 / `protector-rg1` | RAF의 MQ-9B 계열 운용, MQ-9 리퍼와 형식 구분 | https://www.raf.mod.uk/aircraft/current-aircraft/protector-rg-mk-1-mq-9b11/ |
| P3 | NASAMS / `nasams-air-defense` | 협력 개발·중거리 방공의 산업사와 체계 구성 | https://www.rtx.com/raytheon/what-we-do/integrated-air-and-missile-defense |

우선순위는 **편집상 추천 순서**다. 검색량, 광고수익, 실제 독자 수요를 검증한 순위로 해석하지 않는다. 신규 페이지 착수 시 다른 채팅의 PR·브랜치를 다시 조회하고, 주제가 겹치면 중단하거나 범위를 조정한다.

## 5. 다음 PR의 실행 기준

1. 이번 PR은 **기존 글을 직접 고치지 않은 감사·편집 계획 PR**로 제한한다.
2. 다음 PR부터 기존 5개 원고를 각각 개정한다. 개정 시 `assets/catalog.js`의 사실값과 소개문을 일치시키고 내부 링크를 점검한다.
3. 그 다음 P1 신규 3종을 원고/카탈로그/사이트맵/내부링크에 일관되게 반영한다. HTML-only 배포 구조를 유지한다.
4. 신규 도감 추가 시 관련 페이지 링크 동작, 모바일 내용 가독성, 출처 URL, 카탈로그 검색·비교 동기화, 변경 파일을 검수한다.
5. 이미지 생성이나 `main` 직접 병합은 별도 작업의 명시적 승인 없이 수행하지 않는다.

## 6. 공식 출처 사용 원칙

- 1차 출처 우선순위: 정부·군 공식 팩트시트 → 방위사업청/해군·공군 발표 → 제작사 제품 설명 → 공인 박물관의 역사 설명.
- 제원 수치에 '최대/순항', '표준/만재/수중배수량', '기본형/ER/Block/Flight'를 명시.
- 공개 데이터라도 전술적 배치·작전 절차·탐지 회피·교전 최적화 등 현실 운용 가이드는 제공하지 않음.
- 오래된 공식 자료는 **역사적 시점의 자료**로 사용하고 2026년 최신 현황이라고 단정하지 않음.


## 2026-10-29 진행 업데이트 — 신규 도감 확장

- 기존 심화 개정 5종 완료(알레이 버크급·세종대왕급·패트리엇·아이언 돔·MQ-9 리퍼). `work/weapons-systems`의 PR #2에서 검토 대기.
- **RQ-4 글로벌 호크 신규 추가**: `weapons/rq4-global-hawk/index.html`, 도감·메인·비교·사이트맵 등록 완료.
- **버지니아급 잠수함 신규 추가**: `weapons/virginia-class-submarine/index.html`, Block I~V와 VPM 없는 초기 Block V(SSN-802) 및 최초 VPM형(803)의 구분을 공식 미 해군 자료로 확인하고 도감·메인·비교·사이트맵 등록 완료.
- 최신 형식 분류 유의: 미 해군이 2026-08-03 VPM 계획형 19척을 SSGN으로 재분류한다고 발표. 기존 SSN 전부가 SSGN으로 바뀐 것이 아님.
- 도감 목록은 브랜치 기준 26종 / 고유 slug 26개. 기존 24종 기준 초기 점검표의 숫자는 **작성 당시 main 상태**이며 현재 브랜치 수와 다름.
- 두 신규 항목은 실제 무기 사진이 아닌 `#111C2B` 텍스트 임시 표지를 표시함. 이미지 전담 채팅의 고해상도 WebP 교체가 필요하며 이미지 제작 완료로 보고하지 않음.
- 동시 진행하는 타 PR에서 `assets/catalog.js`, `index.html`, `atlas/index.html`, `compare/index.html`, `sitemap.xml`을 수정할 수 있으므로 최종 통합 시 중복 없이 새 항목과 집계를 보존해야 함.
- 브랜치 변경 사항 12개 연계 구조 검사 통과. 단, 실제 브라우저 렌더 및 PR CI 검증은 수행하지 않았고 `main` 병합·운영 배포도 하지 않음.


### 병렬 작업 최신 main 통합 — 2026-10-29

- 한국 군용항공기 담당 채팅의 **LAH 미르온·KT-1 웅비·KA-1 공중통제기·T-50 골든이글** 등 신규 4종이 `main`에 먼저 반영되어, 도감 기준이 28종으로 변경됨.
- `work/weapons-systems`에 최신 `main`을 **병합 커밋으로만** 반영했고 RQ-4·버지니아급 신규 2종을 합쳐 **30종 / 고유 슬러그 30개**로 재구성함. `main`으로 PR을 병합한 것은 아님.
- 홈페이지 30종(해군함정 3종, 무인체계 2종), 검색 카드 30개, 사이트맵 총 36개 URL로 조정.
- 최신 `main`의 비교 선택지 자동 동기화 및 `imagePending` 대체 표시 기능을 유지하며, 두 신규 도감에 `imagePending: true`를 명시함. 기존 이미지 바이너리와 타 채팅 항공기 원고를 보존함.
- 통합 후 원고·데이터·사이트맵 등 8개 주요 연결 점검 및 GitHub PR #2 충돌 상태 확인 결과 **mergeable / clean**. 단 PR은 계속 Draft이며 CI 통과·실제 브라우저 검수·운영 배포와는 별개임.
