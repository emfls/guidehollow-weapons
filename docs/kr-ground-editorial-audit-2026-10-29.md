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


## 두 번째 원고: K239 천무 상세 도감 (2026-10-29)

- 원고: `weapons/k239-chunmoo/index.html` 기존 URL 보강 (새 slug 추가하지 않음)
- 검색·비교 데이터: `assets/catalog.js`의 동일 `k239-chunmoo` 단일 항목 업데이트
- 본문 구성: 핵심 제원, 개발·전력화, 플랫폼·포드 구조, 유도 로켓과 공개 제원, 국가별 파생형, 수출 연혁, 자주포와 비교, FAQ, 출처
- 사실 검증 우선순위: 방위사업청의 **2015년 국내 전력화**, 2022년 폴란드 계약; 한화의 **2개 발사 포드**, CGR-080 239mm/최대 약 80km; CTM-MR·CTM-290 제품군, 2025~2026년 공개 계약·예정 인도 구분
- 중요한 구분: 계약 발사대 수 ≠ 실제 배치 완료 차량 수; CGR-080 사거리 ≠ 모든 천무 탄종의 사거리; 폴란드 Homar-K ≠ 국내형의 모든 부품 및 지원체계 사양

### K239 이미지 담당 채팅 인계 (이미지 비제작)
1. **기본형 장비명:** K239 Chunmoo Multiple Rocket Launcher System / K239 천무 다연장로켓
2. **형상 기준:** 공개 기본형은 **8×8 차륜 발사차량**, 후방 장비부에 **2개 발사 포드**. 실제 포드의 외형·차량형식은 특정 국가의 공식 사진과 비교할 것. 포드 내부 탄종을 그림의 구멍 수나 미사일 형태만으로 임의 결정하지 말 것.
3. **비교 형식:** 폴란드 **Homar-K**는 국가별 현지형으로 구분, 국내 K239의 현지 차량·전자장비와 동일한 외관으로 단정하지 말 것. 노르웨이·에스토니아·크로아티아는 계약과 실제 인도가 구분됨.
4. **공식 외형 참고 자료** (사진 재사용 권한을 의미하지 않음):
   - 한화, Eurosatory 2026 제품·발사대 소개: https://m.hanwhaaerospace.com/eng/media/newsroom/view.do?seq=636
   - 한화, 에스토니아 도입 발표 및 K239 이미지 캡션: https://www.hanwha.com/newsroom/news/press-releases/hanwha-aerospace-to-supply-three-additional-chunmoo-multiple-rocket-launchers-to-estonia.do
   - 한화, 크로아티아형 공개 소개: https://org-www.hanwha.com/newsroom/news/press-releases/hanwha-aerospace-to-supply-chunmoo-mrls-to-croatia.do
   - 한화, 폴란드 Homar-K 발표: https://www.hanwha.com/newsroom/news/press-releases/hanwha-aerospace-signs-contract-to-produce-chunmoo-missile-in-poland.do
5. **렌더 스타일 인계:** 무기 1종 1장 / 전체 피사체 / 단색 `#111C2B` / 16:9 / 실제 플랫폼 형상과 포드 구조 교차 검증 / 배경·인물·글자·국기 없음 / AI 생성 개념 이미지 표시.
6. 이미지 자산은 이 PR에서 변경하지 않음.

### K239 원문 검증 링크
- 방위사업청 2015년 전력화 재확인(2025): https://dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=20952&menuSeq=3069
- 방위사업청 2022 폴란드 계약: https://dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=15967&menuSeq=3069
- 한화 CGR-080·Homar-K·2030년 인도 시작 계획(2025): https://www.hanwha.com/newsroom/news/press-releases/hanwha-aerospace-signs-contract-to-produce-chunmoo-missile-in-poland.do
- 한화 탈레스 협력 및 공개 탄종(2026): https://www.hanwhaaerospace.com/eng/media/newsroom/view.do?seq=631
- 한화 노르웨이 계약 16문(2026): https://www.hanwha.com/newsroom/news/press-releases/hanwha-aerospace-secures-first-contract-to-supply-chunmoo-mrls-to-norway.do
- 한화 에스토니아 6+3문 계약과 2027년 인도 예정: https://www.hanwhaaerospace.com/eng/media/newsroom/view.do?seq=589 / https://www.hanwha.com/newsroom/news/press-releases/hanwha-aerospace-to-supply-three-additional-chunmoo-multiple-rocket-launchers-to-estonia.do
- 방위사업청 크로아티아 18대 계약: https://www.dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=59153&menuSeq=3069


## 세 번째 원고: K55A1 자주포 상세 보강 (2026-10-29)

### 기존 페이지 문제·수정 범위
- 기존 페이지는 역사·비교가 각 한 단락에 가까웠고, K55 원형과 K55A1의 생산·개량 기록, 실제 야전 운용, K56 지원체계, 출처별 사거리 차이가 충분히 설명되지 않았음.
- **기존 URL 유지:** `weapons/k55a1/index.html` (새 도감 slug 없음).
- **검색 데이터 동기화:** `assets/catalog.js`의 `k55a1` 단일 항목만 편집.
- 구성: 개요·제원 / K55 역사 / K55A1 개량 내용 / M109A2·K55·K55A1 및 K56·K77 계보 / 야전 운용 / K9·K239 비교 / FAQ / 공식 출처.
- 제조사 현대위아 **30km** 대 국방일보 **32km**는 별도 출처 표기로 유지; 원인 불명 상태에서 임의로 일치시켜 쓰지 않음.
- 국방일보 2018년 K55A1 **2011년 초 최초 전력화**와 2025년 기사의 **2013년부터 야전 배치**는 발표 자료의 서술 차이로 표시.
- 기존 K55 **약 1,000문** 1985~1997년 생산 규모는 K55A1의 성능개량 완료 수량으로 오인하지 않음.
- 2021년 방위사업청의 K56 **2025년까지 배치 예정**은 당시 계획으로 취급하고 실제 완료 여부 미확인으로 표시.
- 2026년 5월 국방일보의 K55A1 실제 훈련 기사로 '모든 K55A1이 2025년 퇴역했다'는 오해 방지.

### K55A1 외형 이미지 전담 채팅 인계 (이 채팅은 이미지 작업 없음)
**표기:** K55A1 Self-Propelled Howitzer / 대한민국 K55A1 155mm 자주포

**구분:**
1. K55A1의 포신: **155mm·39구경장**, 궤도형 M109A2 계열 차체 기반 — K9의 52구경장 장포신과 혼용 금지.
2. K55 원형과 K55A1은 매우 유사한 외관을 공유하며, 국가별 생산 시기·표기가 확인되지 않은 단일 사진에서 개량형을 임의 확정하지 않는다.
3. K56 Ammunition Resupply Vehicle은 K55A1 탄약 운반 지원차량, K77 Fire Direction Control Vehicle은 별개 지휘차량; 어떤 것도 포신 달린 K55A1 자주포의 사진으로 대체하지 않는다.
4. K9은 별도의 독자 개발 신형 자주포. K55A1 포탑과 차체를 K9 외형으로 보정하거나 합성하지 않는다.
5. 단일 피사체 전체가 보이는 16:9 고해상도, **#111C2B** 완전 단색 배경, 배경 풍경·인물·문자·국기 없음. AI 생성물은 'AI 생성 개념 이미지'로 명시.

**공식 외형·기술 교차 확인 자료** (사진 재사용/2차 배포 허가를 뜻하지 않음)
- 현대위아 K9/K55A1 제품명·공개 사진 및 39구경장: https://www.hyundai-wia.com/business/defense_ground01.asp
- 한화에어로스페이스 지상 화력체계 K55A1·K56 제품군: https://www.hanwhaaerospace.com/kor/whatwedo/product/land.do?category=6
- 방위사업청 K56·K55A1 공식 설명: https://www.dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=12346&menuSeq=3069
- 국방일보 무기백과 K55A1 사진·차종 명시: https://kookbang.dema.mil.kr/newsWeb/m/20181211/1/BBSMSTR_000000100036/view.do
- 국방일보 2026-05-28 K55A1 운용 사진 및 설명: https://kookbang.dema.mil.kr/newsWeb/20260528/2/ATCE_CTGR_0010030000/view.do

### 검증용 1차 출처·인용
- 2025년 국방품질연구논집 K55 무장조립체 역사·국산화: https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003281956
- 현대위아 K55A1 30km·39구경장·발사속도: https://www.hyundai-wia.com/business/defense_ground01.asp
- 국방일보 K55A1 2011 초기 전력화 기록: https://kookbang.dema.mil.kr/newsWeb/m/20181211/1/BBSMSTR_000000100036/view.do
- 국방일보 K55A1 2019년 32km·GPS/INS: https://kookbang.dema.mil.kr/newsWeb/20190405/1/ATCE_CTGR_0020050014/view.do
- 국방일보 2025년 특정 부대 K9 전환 보도: https://kookbang.dema.mil.kr/newsWeb/20250710/2/ATCE_CTGR_0010030000/view.do
- 국방일보 2026년 K55A1 훈련 보도: https://kookbang.dema.mil.kr/newsWeb/20260528/2/ATCE_CTGR_0010030000/view.do

**작업 원칙:** 역사와 공개 제원에 한정, 제작·개조·실전 운용 절차 없음. AI 이미지 실제 제작 및 수정 없음.


## 네 번째 원고: K2 흑표 전차 (2026-10-29)

### 점검·원고 수정
- 기존 K2 페이지는 개요·역사·이해할 점·자료 등 4개 섹션에 머물러 있었으며 K2 1~4차 국내 양산, 파워팩 차이, 2025년 2차 폴란드 계약, K2GF/K2PL 및 2026년 현지화 발표 정보가 부족했음.
- **기존 URL 유지:** `weapons/k2-black-panther/index.html`. 새로운 K2 slug 생성하지 않음.
- 본문 9개 섹션: 기본 제원 / 개발 역사 / 국내 1~4차 양산 / 화력·기동·방호·전장관리 공개 기술 / K2GF·K2PL / 폴란드·페루 계약 구분 / K1A2·해외 전차 비교 / FAQ / 직접 출처.
- **원형 K2 제원(제조사)**: 승무원 3명, 56t, 120mm·55구경장 주포, 자동장전, 1,500마력 디젤, 70km/h(포장도로), 450km(제조사 공개값). 고객 요구별 변동 가능.
- **국내 양산 단계**: 1차 외산 파워팩, 2차 국산 엔진·외산 변속기 혼합, 3차 KVMF 등 개발·적용 예정 공표, 4차 국산 변속기 채택 결정(2024). 변속기 관련 시험 306시간 후 결함 보고를 삭제하지 않고 함께 언급. 4차 납품 완료로 단정하지 않음.
- **K2GF vs K2PL**: K2GF는 기존 차체 기반 긴급 수출형(통신·표기 변경 등), K2PL은 폴란드형 개발·현지 생산 계획. APS/드론 재머/RCWS 등 2025년 공표는 생산 형식의 도입 **계획**이며 모든 실물 차량의 탑재 완료로 단정하지 않음.
- **2026 현지화**: 4월 BUMAR-ŁABĘDY 협력 계약과 9월 현지 장비 적용형 전시 단계 명시.
- **K2ME 중동형**: 2026-03-27 개발 중 실물 최초 공개. 고온 환경 대응 개발형이며 실제 해외 공급계약·인도 확인과 엄격히 구분.
- **폴란드 수출 수량**: 2025년 상반기 1차 133대 실제 인도, 47대 연말 인도 **예정**(2025년 발표 기준). 2차 K2GF 116대는 2027년까지 **추가 인도 예정**(동 발표 기준). 2025년 수치를 2026년 현재 현역 보유수량으로 일반화 금지.
- **페루**: 2025년 K2 54대·K808 141대 **총괄합의**, 후속 이행계약 별도 필요. 실전 배치 완료로 기록하지 않음.
- 검색 데이터 `assets/catalog.js`의 `k2-black-panther` 단일 항목만 갱신, 24개 식별자 체계 유지.

### 이미지 제작 채팅 인계 — K2 흑표 기본형 및 K2GF/K2PL
> 이번 채팅은 이미지 파일을 만들거나 변경하지 않는다. 아래 링크는 장비 형상과 명칭 확인용 자료이며 이미지 재사용·재배포 허가가 아니다.

**기준 장비명**
1. **K2 Black Panther / K2 흑표** (대한민국 육군 기본형) — 3인 승무원, 120mm·55구경장 활강포, 궤도형 전차. 동체/포탑 실루엣을 K1A2와 혼동하지 말 것.
2. **K2GF (K2 Gap Filler Main Battle Tank)** — 폴란드 초기 긴급 도입형. 언어·통신장치 등 개정 사양을 반영하며, 국내 기본형의 외형을 완전히 다른 설계처럼 표현하지 말 것.
3. **K2PL (K2 Poland)** — 폴란드 현지화형. 2025년 모형과 2026년 현지 임무장비 적용 전시물의 형상은 다를 수 있으므로 특정 전시 연도·대상을 고정하고 실제 제품 출시·대량 배치 완료로 오인시키지 말 것.
4. **K2PL ARV / AEV / AVLB** — 구난·장애물개척·교량 지원 차량. 모두 120mm 주포를 단 K2 주력전차가 아니므로 상세 사진을 K2 MBT로 표시하지 말 것.
5. **K2ME (Middle East)** — 2026년 3월 개조개발 중 실물 전시가 확인됨. 국내형·K2GF·K2PL 중 어느 한 형식의 사진으로 대신 표시하지 말고 중동형 고온 대응부품 외형을 제조사 사진과 대조할 것.
6. K2 계열은 포탑 옆 장비, 측면 장갑, 연막탄 발사기, 포신 길이, 후면 파워팩 외형 등 확인할 수 있는 범위만 실사진과 대조하고 비공개 장비를 추정해 그리지 않는다.

**공식 외형 기준 링크**
- 현대로템 K2 제품 페이지 (기본형 이미지 및 공개 제원): https://www.hyundai-rotem.co.kr/ko/business/defense/details.do?productNm=K2+%EC%A0%84%EC%B0%A8
- 현대로템 K2GF 실차·K2PL 모델 비교 (2023): https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2021
- 현대로템 K2PL 목업·K2GF 실차 전시 (2025-09-01): https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2503
- 현대로템 K2PL 폴란드 현지 생산 협력 (2026-04-28): https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2635
- 현대로템 K2PL 현지 장비 전시 (2026-09-08): https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2748
- 현대로템 K2ME 개조개발 실물 공개 (2026-03-27): https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2600

**고정 스타일:** 한 장에 전차 1대, 전체 궤도·포신이 보이는 3/4 시점, 피사체 주변 여백, 고해상도 16:9, **완전 단색 #111C2B** 배경, 연기·전장·사람·글자·국기·배경 풍경 금지. AI 생성 이미지임을 명시. K2GF 외형과 K2PL 특정 연도 전시 컨셉을 혼합하지 말 것.

### 공식 원문 확인 경로
- 현대로템 K2 제품 제원 https://www.hyundai-rotem.co.kr/ko/business/defense/details.do?productNm=K2+%EC%A0%84%EC%B0%A8
- 현대로템 2022년 개발 역사 https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=1040
- 방위사업청 2022년 K2 2차 전력화 완료 https://www.dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=14579&menuSeq=3069
- 방위사업청 2023년 K2 4차 양산 계획 https://www.dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=17057&menuSeq=3069
- 방위사업청 2024년 국산 변속기 채택 결정 https://dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=20104&menuSeq=3069
- 현대로템 2025년 폴란드 K2GF·K2PL 구별 https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2503
- 현대로템 2026년 현지 생산·정비 협력 https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2635
- 현대로템 2026년 K2PL 전시 https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2748
- 현대로템 2026년 K2ME 개발형 실물 공개 https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2600
- 현대로템 2025년 페루 총괄합의 https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2553

**범위:** 공개 기술·역사·산업 및 근거 검증. 장비의 제조/개조/작전·교전 운용 절차는 다루지 않음.


## 다섯 번째 원고: K21 보병전투장갑차 (2026-10-29)

### 원고 감사 및 수정 요약
- 대상: 기존 `weapons/k21-ifv/index.html`와 `assets/catalog.js`의 `k21-ifv` 기존 검색 항목. **새 장비·URL 없음**.
- 기존 본문은 개요·역사·비교·출처 등 4개 짧은 영역으로, 전력화 시작·40mm 제원·수상사고 개선·4차 양산계획·K21-105 파생형 구분이 누락됐음.
- 신규 본문 9개 영역: 공개 제원 / 개발 착수·초도 배치 / 수상운행 사고 및 2011년 개선 / 주포·복합소재·C4I / 4차 양산계획 / K21-105·레드백 / K808·K200·K2 비교 / FAQ / 출처 11건.
- K21은 **국방과학연구소가 1999년 말 개발 착수**, 초기 출고는 **두산DST 2009년 11월 27일**, 방위사업청의 초기 육군20사단 배치 발표는 **2009년 11월 30일**. 기업 인수 이력을 감안해 현재 제조사 한화에어로스페이스와 구분함.
- 40mm 기관포, 승무원 3명·보병 최대 9명, 약 25t, 약 70km/h는 당시 한국 정부·국방일보 공개 자료의 기본형 값. 수상 최고속도 표기는 2009년 약 7km/h vs 2020년 약 6km/h로 발표 자료에 차이 있음. 모델별·시험조건 미확인 수치는 임의로 통일하지 않음.
- **침수사고 기록** 및 방위사업청 2015년 설명에 기재된 2011년 3월 개선시험, 2011년 4월 개선조치 완료, 2011년 10~12월 소요군 평가를 유지. 2016년까지 전력화 완료 계획은 역사적 발표 당시 계획으로 해석.
- 방위사업청 **2023년 12월 4일 4차 양산계획 의결(2024~2028년, 약 7,800억원)**과 2025년 3월 한화시스템 부품계약 공시(약 1,579억원)는 서로 다른 계약 범위. 공시를 전체 차량 양산계약으로 기록하지 않음.
- **K21-105 105mm 개발형**, **AS21 레드백 수출용 독립 플랫폼**, **K808 8×8 차륜형**, **K2 주력전차**는 모두 기준형 K21 IFV와 다른 모델. 외국 K21 수출후보 뉴스는 최종 납품 실적으로 단정하지 않음.

### 이미지 담당 채팅 인계 — 정확한 외형과 혼동 금지
> 이 담당 채팅은 이미지 제작·업로드하지 않았으며, 링크는 실장비 형상 참조용으로 재배포 허락을 뜻하지 않음.

**이미지 표준 이름**
- **K21 Infantry Fighting Vehicle (K21 IFV)** — 대한민국 궤도형 보병전투차량, 기본형 40mm 기관포, 부양장치/측면 부력 구조. 한국군 육군 기본형의 외형을 공식 국방과학연구소 사진과 대조.
- **K21-105 Medium Tank** — 105mm 포탑을 적용한 시연·수출 개발형. 40mm 기본형 K21의 포탑·포신을 그림에서 임의로 교체하거나 두 차량 외형을 섞지 말 것.
- **AS21 Redback** — 호주 수출을 위해 별도 개발한 플랫폼. K21과 기술적 연관은 있지만 외형·궤도·포탑·차체 방호가 다르므로 K21 기본형 이미지로 사용하지 않음.
- **K808 Baekho 8×8 WAV** — 바퀴 8개인 차륜형장갑차. 궤도형 K21과 엄격히 구분.
- **K200A1 APC** — 기존 보병수송장갑차 계열. 40mm K21 IFV로 혼동하지 않음.

**기본형 외형 교차검증 관찰점**
- 궤도(바퀴 없는 트랙 외관), 짧지 않은 40mm 주포, 상부 포탑, 전면·측면 차체 실루엣, 수상운행 시 부양장치 형상. 정확한 차체 구성은 제조사·국방과학연구소 실물 사진으로 확인하고 가상의 추가 장갑·대전차미사일·전자장비를 근거 없이 생성하지 않는다.
- 수상운행 장면은 기술적 참고사진일 뿐, 이번 프로젝트의 최종 단색 배경 렌더에는 물·파도·풍경을 넣지 않는다.
- **이미지 제작 기준:** 피사체 한 대 완전 노출, 16:9 고해상도, **균일한 #111C2B 배경**, 텍스트·인물·전장 배경·국기 없음, AI 생성 개념 이미지 명시.

**정확한 장비명·공식 외형 참조 URL**
1. 국방과학연구소 K21 공식 장비 설명·실물 이미지 https://www.add.re.kr/board?menuId=MENU02654&siteId=SITE00002
2. 한화그룹 한화에어로스페이스 제품 소개 (K21, 레드백 구분) https://www.hanwha.com/companies/hanwha-aerospace.do
3. 방위사업청 제공 최초 전력화 사진(정책브리핑) https://www.korea.kr/news/issueQAView.do?newsId=148679851
4. 방위사업청 제공 수상운행 개선·평가 자료 https://www.korea.kr/news/policyNewsView.do?newsId=148789831
5. 한화그룹 K21-105 105mm 포탑형 소개 https://www.hanwha.com/newsroom/news/press-releases/hanwhas-four-defense-companies-gear-up-for-global-expansion.do
6. 현대로템 K808/K806 공식 실물 사진 https://www.hyundai-rotem.co.kr/ko/business/defense/details.do?productNm=K808%2FK806+%EC%B0%A8%EB%A5%9C%ED%98%95%EC%9E%A5%EA%B0%91%EC%B0%A8

### 검증 자료
- 1999년 개발·2009년 출고 및 전력화: https://www.korea.kr/news/issueQAView.do?newsId=148679851
- ADD 수상 부양장치·주무장·C4I: https://www.add.re.kr/board?menuId=MENU02654&siteId=SITE00002
- 국방일보 장갑차 기술제원: https://kookbang.dema.mil.kr/newsWeb/20200904/2/ATCE_CTGR_0020050014/view.do
- 수상운행 개선 방사청: https://www.korea.kr/news/policyNewsView.do?newsId=148789831
- 4차 양산 계획: https://dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=18348&menuSeq=3069
- 한화시스템 공급 계약: https://kind.krx.co.kr/external/2025/03/31/002788/20250327001706/91370.htm
- K21-105 공개: https://www.hanwha.com/newsroom/news/press-releases/hanwhas-four-defense-companies-gear-up-for-global-expansion.do
- 레드백 별도 플랫폼·호주 계약: https://kookbang.dema.mil.kr/newsWeb/20231210/1/ATCE_CTGR_0010020000/view.do

**범위 제외:** 무기 설계도, 실전 운용·사격·수상운행 지침 및 개조/제조 방법. 이미지 파일의 제작·수정·업로드는 이 채팅의 책임 범위에 포함되지 않음.


## 여섯 번째 원고: K808 백호 차륜형장갑차 (2026-10-29)

### 검증·수정
- 기존 `weapons/k808/index.html`은 4개 짧은 섹션과 현대로템 제품 링크 1개만 존재해 2012~2018 개발·초기 배치와 K806 6×6 차이, 국내 계약·수출 진행 등이 누락돼 있었음.
- **기존 URL·slug 유지:** `weapons/k808/index.html` 및 `assets/catalog.js`의 `k808` 단일 항목 보강. 새 URL·도감 카드 없음.
- 상세 본문 **10개 섹션:** 공개 제원, 개발 연혁, 차체/수상기동, K806 비교, 계열차량, 국내 1~4차 양산, 페루 수출, K21·K200 비교, FAQ, 공식 출처.
- **현대로템 현행 기본형 K808 공개 제원:** 8×8, 약 20t, 승무원 2+보병 9명, 420hp, 도로 100km/h, 수상 8km/h, CTIS, 수상추진장치. K806 기본형은 6×6, 16t, 420hp, 도로 100km/h. K806 수상추진/CTIS는 현행 기본 제원표에 명시되지 않음.
- **제원 충돌:** 2016년 기사 일부는 430마력이라고 보도했지만 현대로템 제품표는 420hp. 제품표 기준을 도감 대표값으로 채택하고 보도 차이 명시.
- **개발 연혁:** 2003년 제조사 자체 연구, 2012년 정부 사업 개발, 2016년 5월 9일 적합 판정 / 5월 30일 국방규격, 2017년 12월 27일 첫 출고, 2018년 3월 25사단·37사단 최초 배치 및 시험. 2016년 발표의 2017년 예정 전력화를 실제 배치 이력으로 대체하지 않음.
- **국내 수량 구별:** 1~3차 K806/K808 통합 계약액 약 8,475억원 (2020년 제조사 발표), 2023년 4차 약 1,670억원 별도 계약. 2024년 현대로템 공개 '500대 이상 인도'는 차륜형 사업 전체이며 K808 한 모델의 실제 보유대수가 아님.
- **계열차량:** K877/K870 지휘소용, K30W 30mm 차륜형 대공포, 2026년 의무후송차량 개발 완료(이후 양산·전력화 예정). K808 기본형과 사진·수량·무장 혼용 금지.
- **페루 계약 구별:** 2024-05-02 STX 우선협상대상자 선정 및 K808 30대 공급 계획; 2024-11 총괄협약; 2025-12 K2 54대+K808 141대 *총괄합의* 및 별도 이행계약 필요; 2026-10 보도상 K808 30대 연내 조기 인도 추진. 실제 인도 확인 안 된 공급 예정 수량을 현역 운용 완료로 표시하지 않음. 30대와 141대가 별도인지 검증 없이 합산하지 않음.

### 이미지 담당 채팅 인계 (이 채팅은 이미지를 생성·교체하지 않음)
**정확한 표시 대상:** `K808 Baekho 8×8 Wheeled Armored Vehicle`, 한국군 K808 백호 기본형.
1. K808은 **4축·8개 타이어(8×8)** 차체로 실제 제작품 확인. 궤도·무한궤도가 없으며 K21과 혼동 금지.
2. K806은 **3축·6개 타이어(6×6)**. K808과 2개 타이어만 차이가 나는 그림을 임의로 만들지 말고 실제 차체의 차축 간격, 전면·측면 실루엣, 차량 길이 및 상부 구조를 제조사 사진과 대조.
3. **상부 무장:** K808 기본형은 제조사 제품표상 K4/K6 계열, RCWS 옵션. 대구경 기관포/대공포 포탑이나 K21 40mm 주포를 K808 기본형 외형에 잘못 합성하지 말 것.
4. **수상추진 외형:** 실제 공식 사진의 차체 후면과 추진장치 형상으로 검증할 것. 최종 단색 배경에 물이나 풍경을 추가하지 말 것.
5. **계열차량 구분:** `K877/K870` 지휘소용차량, `K30W` 차륜형 대공포, 2026년 개발형 의무후송차량은 별도 형상·목적. K808 보병수송형을 대신하는 사진으로 사용 금지.
6. **페루 수출형:** 한국군 기본형과 별도 수출 장비 구성을 확인하지 못했다면 특정 페루형의 외형·무장으로 묘사하지 않음.
7. **장면 스타일:** 장갑차 전체를 보이는 사실적인 3/4 시점, 16:9 고해상도, 균일한 단색 `#111C2B` 배경, 인물·국기·텍스트·전장 배경·풍경·물·연기 금지, 기존 표시 'AI 생성 개념 이미지' 유지.

**정확한 실물 대조 링크** (참조용, 실사진 무단 재배포·사용 권한을 뜻하지 않음)
- 현대로템 K808/K806 형상·공식 제원·계열차량: https://www.hyundai-rotem.co.kr/ko/business/defense/details.do?productNm=K808%2FK806+%EC%B0%A8%EB%A5%9C%ED%98%95%EC%9E%A5%EA%B0%91%EC%B0%A8
- 현대로템 2024 K808 페루 사업 소개 및 제품 사진: https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2202
- 현대로템 2023 차륜형지휘소용차량 실물: https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2051
- 현대로템 2026 장갑형의무후송차량 개발 공개: https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2743
- 국방일보 K808/K806 2019년 장비 사진 및 개발사: https://kookbang.dema.mil.kr/newsWeb/20190513/1/ATCE_CTGR_0080010003/view.do

### 직접 검증한 사료·출처
- 현대로템 기본형 제품 제원: https://www.hyundai-rotem.co.kr/ko/business/defense/details.do?productNm=K808%2FK806+%EC%B0%A8%EB%A5%9C%ED%98%95%EC%9E%A5%EA%B0%91%EC%B0%A8
- 국방일보 2019 개발·최초 배치 역사: https://kookbang.dema.mil.kr/newsWeb/20190513/1/ATCE_CTGR_0080010003/view.do
- 국방일보 방사청 발표 2016 개발 성공: https://kookbang.dema.mil.kr/newsWeb/20160608/3/ATCE_CTGR_0010010000/view.do
- 현대로템 2020 3차 양산계약: https://blog.hyundai-rotem.co.kr/495
- 현대로템 2024 K808 30대 페루 사업: https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2202
- 현대로템 2025 페루 K808 141대 총괄합의: https://www.hyundai-rotem.co.kr/ko/company/press/details.do?seq=2553
- 한국경제 2026-10-09 페루 30대 연내 조기 인도 추진: https://www.hankyung.com/article/202610081531i

**편집 제한:** 공개 제원·개발사·조달 실적·군수 산업에 한정. 안전·교전 취약점, 장비 제작·개조·사격·수상 운행의 실제 절차는 제공하지 않음.
