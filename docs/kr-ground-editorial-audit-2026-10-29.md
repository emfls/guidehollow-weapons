# 대한민국 지상무기·포병 도감 편집 점검 — 2026-10-29

## 검사 범위
- 저장소: `emfls/guidehollow-weapons`
- 기준 브랜치: `main` (검사 시점 SHA: `186655b3f37e022ff5549e0c8fc5b34ed0ce76e3`)
- 본 작업 브랜치: `work/weapons-kr-ground`
- 전체 도감: 24종 (`weapons/*/index.html` 및 `assets/catalog.js`)
- 담당 7종: K2 흑표, K1A2, K21, K808, K9, K239 천무, K55A1
- 검사 당시 다른 브랜치 및 열린 PR: 발견되지 않음
- 장비별 slug/검색 항목: K9 포함 단일 식별자, K9 중복 경로 없음. 전체 검색 데이터에서 slug 중복 없음.

## 기존 원고의 주요 품질 문제
1. K9: 기존 본문 4개 섹션뿐이며 공개 제원, K9A1·K9A2의 구분, 운용·수출 이력, 직접 자료 링크 부족.
2. K9: 기존 '해외 도입과 현지화' 서술은 국산 독자개발 기록과 불일치. 국산개발·양산 역사로 수정.
3. K9: 비교 대상이 K2 전차로 연결되어 자주포 자체의 특성 비교에 부적절. K55A1과 K239로 관련 콘텐츠 교체.
4. K239: 개발·도입 연혁 및 발사대 구성별 설명과 출처 보강 필요.
5. K55A1: 개발 배경, K55 → K55A1 성능개량 단계, 국산 화포·지원차량 연관 설명 보강 필요.
6. K2·K1A2·K21·K808: 공식 제원별 인용과 파생형 구분의 추가 검증 필요.
7. `README.md`는 본문에서 '독립 URL의 도감 14건'과 '2차 확장 후 24종'을 함께 기술해 표기 정리가 필요. 다른 채팅과 겹칠 수 있어 이번 PR에서는 수정하지 않음.

## 첫 우선순위 및 작업 결정
**K9 썬더 기존 URL 보강**. 해외 수출 이력, K9A1과 K9A2 개념의 구별, K55A1 직접 비교 등 이용자의 독해 가치가 크며 기존 원고의 결함이 선명함.
- 수정: `weapons/k9-thunder/index.html`, `assets/catalog.js`
- 구성: 요약 제원 / 개발 배경 / 구조와 특징 / 개량·파생형 / 운용·수출사 / 비교 / FAQ / 원문 출처
- 새로운 K9 slug를 만들지 않음.
- 이미지는 생성/교체/업로드하지 않음.

## 이미지 담당 채팅 인계 — **실제 장비 외형 확인용 원본 출처**
> 해당 주소는 외형 참고 및 사실 대조를 위한 공식 자료 URL. 이미지 이용 허락 또는 재배포 권한을 뜻하지 않음. AI 생성 렌더는 외형 증거로 삼지 않는다.

### 1. K9 Thunder 기본형 / K9A1
- 국내 표기: **K9 썬더**, **K9A1 자주포**
- 영문 확인명: **K9 Thunder 155mm/52-caliber Self-Propelled Howitzer**, **K9A1**
- 외형 구분 키워드: 궤도형 차체, 전면의 조종석, 각진 회전포탑, 155mm 장포신. K9A1은 기본형과 외관이 유사하므로 사진 캡션·촬영 시점·원문 표기가 없는 경우 임의 판별하지 말 것.
- 참고: 한화에어로스페이스 제품·뉴스룸 https://www.hanwhaaerospace.com/eng/media/newsroom/view.do?seq=271
- 참고: 현대위아 K9/K55A1 공식 제품 페이지 https://www.hyundai-wia.com/business/defense_ground_01.asp
- 참고: 한화 K9 추가 수출 계약 https://www.hanwha.com/newsroom/news/press-releases/hanwha-aerospace-secures-follow-on-k9-howitzer-contract-with-finland.do
- 이미지 전달 시: 단색 **#111C2B** 배경, 배경 요소 없는 피사체 단독 구성, 실장비와 다른 고증을 포함하면 'AI 생성 개념 이미지' 표기.

### 2. K9A2 — 후속 자동화 개량 계열
- 표기: **K9A2 / K9A2 automated turret technology**
- 참고: 한화 2026-09-04 미래 K9 개념 발표 https://www.hanwha.com/newsroom/news/press-releases/beyond-the-howitzer-hanwha-unveils-next-evolution-of-k9.do
- 주의: 기술 시연·개발 개념과 운용 중인 K9A1을 구분. 실물 외형이 확정되지 않은 요소를 근거 없이 렌더에 추가하지 말 것.

### 3. 관련 계열 (혼동 방지)
- **K10 Ammunition Resupply Vehicle**: K9과 차체를 공유하는 지원차량. K9 포탑·포신이 있는 자주포로 그리지 말 것.
- **K77 Fire Direction Control Vehicle**: 사격지휘차. K9 주포 탑재 차량으로 그리지 말 것.
- **K55A1 155mm/39-caliber SPH**: 같은 국산 포병체계지만 K9과 별개 차량.
- **K239 Chunmoo MRLS**: 차륜형 다연장로켓, 궤도형 K9과 혼동 금지.
- **K9 Mobile Howitzer (K9MH)**: 2026년 발표된 차륜형 확장 시제품 계열로, 궤도형 K9 기본형 사진에 섞지 말 것. 공식 참고 https://www.hanwhaaerospace.com/kor/media/newsroom/view.do?seq=642

## 제원·이력 검증용 1차 출처
- 방위사업청, K9 전력화 사업 종결(2020-11-13): https://www.dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=11620&menuSeq=3069
- 한화에어로스페이스 연혁(1998 개발, 1999 양산 등): https://www.hanwhaaerospace.com/kor/whoweare/history.do
- 현대위아 K9/K55A1 비교: https://www.hyundai-wia.com/business/defense_ground_01.asp
- 한화 K9 기본형·K9A1 관련 자료: https://www.hanwhaaerospace.com/eng/media/newsroom/view.do?seq=271
- 한화 핀란드 추가 계약(2026-04-10): https://www.hanwha.com/newsroom/news/press-releases/hanwha-aerospace-secures-follow-on-k9-howitzer-contract-with-finland.do
- 한화 K9 후속 구상(2026-09-04): https://www.hanwha.com/newsroom/news/press-releases/beyond-the-howitzer-hanwha-unveils-next-evolution-of-k9.do

## 추후 우선순위 (중복·배정 확인 뒤)
1. K239 천무: 발사대·유도탄 계열 및 해외 파생 구성 상세 검증
2. K55A1: K55 계열 역사·성능개량과 K56 지원차량
3. K2 흑표: 개발·국내 양산·해외 수출형 차이
4. K21, K808, K1A2: 사용자가 혼동하기 쉬운 차량 계열별 비교 강화

**실제 장비의 사격·운용 절차, 개조 방법, 기술 설계도는 본 프로젝트 범위에 포함하지 않는다.**
