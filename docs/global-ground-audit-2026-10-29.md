# 해외 지상무기·역사무기 도감: 기존 5종 점검 및 신규 작성 순서

- 점검일: 2026-10-29 (KST)
- 담당: 채팅 3 — 해외 지상무기 및 역사무기
- 저장소: `emfls/guidehollow-weapons`
- 대상: `main` 기준 24개 도감, `assets/catalog.js`와 기존 독립 페이지 5개
- 제출 브랜치: `work/weapons-global-ground`
- 범위: **편집 감사와 신규 원고 우선순위만**. 본 PR은 도감 페이지·카탈로그·이미지를 변경하지 않음.
- 확인 시점: 원격에는 `main` 외 브랜치와 열린 PR이 없음. 이후 협업 중 생기는 변경사항은 매 작업 전 재확인.

## 결정 요약

기존 미국·독일·영국·프랑스·일본 주력전차 5종은 모두 독립 페이지가 존재한다. 따라서 동일 장비의 새 URL을 생성하지 않고 **기존 페이지를 후속 PR에서 확장**한다.

공통 결함: 개발 연혁이 1~2문장에 그침, 형식별 구분표 및 본문 주장에 매칭되는 출처 부족, 공개 제원표 미비, 실제 운용국·운용사·개량형 변화의 설명 부족. 이미지들은 'AI 생성 개념 이미지'로 표시되며 실물 외형 확인 자료로 삼지 않는다.

### 기존 5종 세부 감사

| 기존 slug | 확인한 현재 서술 | 보강 사항 | 우선도 |
|---|---|---|---|
| `m1-abrams` | '1980년대' 시작, M1/M1A1/M1A2 열거, 기관 최상위 홈페이지 2개 | 1980년 운용 개시, 초기 개발·생산 Chrysler Defense와 이후 General Dynamics Land Systems 구분. 원형 M1의 105mm와 M1A1 이후 120mm 주포 구분, IPM1·M1A2·SEP 계열의 연혁 및 형식별 값, 미 육군 원문 직접 링크 | 높음 |
| `leopard-2` | '1970년대 말', 2A4·2A6·2A7 계열, 기관 최상위 홈페이지 2개 | 독일 연방군 문서의 2A5 / 2A6M / 2A7V 설명과 2A4 등 다른 형식을 명확히 구분. 개발 배경, 1970~80년대 양산·배치, 운용국별 변형, 형식별 공개 수치와 직접 링크 | 높음 |
| `challenger-2` | 승무원 4명, 기본 중량 62.5t, 챌린저 3 사업 언급, 공식 직접 출처 | 영국 육군은 기본 62.5t과 추가 장갑 적용 75t을 구별하므로 반드시 측정 조건 표기. 챌린저 1과의 관계, 챌린저 2의 120mm 강선포와 개발 중 챌린저 3의 120mm 활강포 차이, 실전 배치 연혁. 챌린저 3은 시험·개발 중임을 표기하고 전력화 완료처럼 서술하지 말 것 | 중상 |
| `leclerc` | 3명, XLR 개량, 공식 직접 출처 | 프랑스 국방부 자료의 1993년 운용 개시, 자동장전, Nexter→KNDS France 명칭 연혁, XLR 개량과 SCORPION 연동, **발주·인도·계획 수량 각각 분리**. 운용국 설명 확장 시 1차 출처 확보 | 중상 |
| `type-90` | 제식화 '1990년 8월', 3명, 약 50t, 공식 출처 | 육상자위대 출처의 **1990년 8월 6일** 제식화로 상세화, 1977년 개발 착수 및 1979년 설계 단계와 1990년 실전 배치기 구분. 74식→90식→10식 계보, 자동장전·차체 치수·제조사, 10식과 동일 공식 출처 기준 비교 | 중상 |

**수치 규칙:** 미국식 short ton / 영국식 long ton / 미터법 tonne(=t)을 혼용하지 않는다. 제원마다 **해당 형식, 출처, 공개 당시 시점**을 붙인다. 공개되지 않은 방호 성능과 추측성 생존율은 기입하지 않는다. 다른 시대·출처의 중량을 동등 조건처럼 나란히 비교하지 않는다.

### 기존 항목 직접 검증 출처

1. M1 Abrams — U.S. Army, 초기 운용 1980년 및 계보: https://www.army.mil/article/86839/AMC_developed_weapons_remain_vital_to_Army/
2. M1 개발사 — U.S. Army Center of Military History의 역사 자료: https://history.army.mil/ (자료 본문 확인 후 세부 URL 지정)
3. Leopard 2 — Bundeswehr 장비·개량형: https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/landsysteme-bundeswehr/leopard-2
4. Challenger 2 — British Army 사양·역사: https://www.army.mod.uk/learn-and-explore/equipment/combat-vehicles/challenger-2/
5. Challenger 3 — British Army 개발·시험 상태: https://www.army.mod.uk/learn-and-explore/equipment/combat-vehicles/challenger-3/
6. Leclerc XLR — 프랑스 국방부 DGA, 2025-01-28 발표: https://www.defense.gouv.fr/dga/actualites/dga-commande-100-chars-leclerc-renoves-xlr
7. Type 90 — 일본 육상자위대 장비 제원: https://www.mod.go.jp/gsdf/equipment/ve/
8. Type 90 역사·제식화 일자 — 육상자위대 제7사단: https://www.mod.go.jp/gsdf/nae/7d/tk_history.html

## 신규 작성 우선순위: 기존 24종 중복 검토 완료

**1차 원고 착수 순서**는 10식 전차 → PzH 2000 → M2 브래들리 → M109 팔라딘 → M4 셔먼으로 한다. 5종 모두 `main`의 `weapons/<slug>/index.html`에 아직 없다.

| 순위 | 계획 슬러그 | 무기·원어명 | 발전사 접근 | 연결 도감 | 1차 출처 |
|---|---|---|---|---|---|
| 1 | `type-10` | 일본 10식 전차 / 10式戦車 / Type 10 | 2009년 명명·2010년 조달 시작·2011년 부대배치(서로 다른 사건) | `type-90` | https://www.mod.go.jp/gsdf/equipment/ve/ ; https://www.mod.go.jp/gsdf/nae/7d/tk_history.html |
| 2 | `pzh-2000` | 독일 PzH 2000 / Panzerhaubitze 2000 | 1998년 최초 양산차 인도, 공개 사양과 개량 이력 | `k9-thunder` | https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/landsysteme-bundeswehr/panzerhaubitze-2000 ; https://zms.bundeswehr.de/de/mediathek/panzerhaubitzen-2000-und-2s19-im-vergleich-5692758 |
| 3 | `m2-bradley` | 미국 M2 Bradley Fighting Vehicle | 보병전투장갑차의 역사, M2A2/ODS-SA·M2A3·M2A4 차이 | `k21-ifv` | https://www.army.mil/article/269660/army_awards_bradley_a4_production_contract |
| 4 | `m109-paladin` | 미국 M109 Paladin 계열 / M109A6·M109A7 | 포병 체계 계보, A6와 A7의 차체·현대화 구분 | `k55a1` | https://www.army.mil/article/243102/the_m109a7_self_propelled_howitzer_has_arrived_at_the_ordnance_school ; https://www.army.mil/article/126146/Army_inducts_self_propelled_howitzer_into_low_rate_initial_production/ |
| 5 | `m4-sherman` | 미국 M4 Sherman / Medium Tank M4 | 1941년 설계·1942년 생산, M4/M4A1/M4A4와 Firefly 형식 혼동 방지 | 역사 전차 분야 신규 축 | https://tankmuseum.org/tank-nuts/tank-collection/m4-sherman |

**2차 후보(6~10위):** 센추리온(Centurion; 영국, https://tankmuseum.org/tank-nuts/tank-collection/centurion/), 복서(Boxer; 독일 계열), 74식 전차(Type 74; 일본), T-34(소련), M16 소총의 역사(미국; 역사·기술사만). 1차 출처와 다른 담당 채팅의 신설 계획을 다시 대조한 뒤 순서를 확정한다.

## 이미지 담당자용 공식 식별 자료 (이미지 생성은 본 담당 제외)

**생성·복제 대상이 아니라 외형 검증용 사진·전시 참고 링크**다. 참고 사진의 개별 저작권/재사용 허가를 확인하지 않았으며, 공식 사이트에 게재되어 있다는 이유만으로 자유 이용 가능한 것은 아니다.

| 항목 | 공식 식별 링크 | 혼동 주의점 |
|---|---|---|
| M1 Abrams | https://www.army.mil/article/86839/AMC_developed_weapons_remain_vital_to_Army/ | 초기 M1과 M1A1·M1A2 형상을 하나로 뭉뚱그리지 말 것. 기준 형식을 먼저 결정 |
| Leopard 2 | https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/landsysteme-bundeswehr/leopard-2 | 2A5/2A6M/2A7V의 포탑·주포·차체 장착 장비가 다름 |
| Challenger 2 | https://www.army.mod.uk/learn-and-explore/equipment/combat-vehicles/challenger-2/ | 챌린저 3 프로토타입 사진과 혼동 금지 |
| Leclerc | https://www.defense.gouv.fr/dga/actualites/dga-commande-100-chars-leclerc-renoves-xlr | 원형과 XLR은 장착물·외형 차이 있음 |
| Type 90 / Type 10 | https://www.mod.go.jp/gsdf/equipment/ve/ | 90식과 10식의 공식 별도 사진으로 전방·측면 외형 확인 |
| PzH 2000 | https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/landsysteme-bundeswehr/panzerhaubitze-2000 | Leopard 2 전차·다른 자주포의 포탑을 차용하지 말 것 |
| M2 Bradley | https://www.army.mil/article/269660/army_awards_bradley_a4_production_contract | M2 보병형과 M3 기병형, 개량형 별 차이 주의 |
| M109 | https://www.army.mil/article/243102/the_m109a7_self_propelled_howitzer_has_arrived_at_the_ordnance_school | M109A6와 A7의 차체·외장 요소를 혼용하지 말 것 |
| M4 Sherman | https://tankmuseum.org/tank-nuts/tank-collection/m4-sherman | M4A1(주조 차체), M4A4(용접 차체), Firefly(영국 개조형) 혼동 금지 |

## 신규 페이지 편집 완료 조건

- 제목에 한글 명칭과 공식 원어 명칭; 형식별 별도 용어 확인
- 개발 착수 / 시제 / 제식·운용 개시 / 개량을 연도로 구분
- 공개 제원표: **모든 수치마다 기준 형식·단위·출처 확인**
- 개발 배경과 설계 사상, 계보·파생형, 국가별 운용 역사, 최소 1종 비교 대상
- 관련 도감 내부 링크와 `assets/catalog.js` 동기화, 사이트맵·검색·비교 기능 확인
- 공식 실물 참고 자료를 이미지 담당자에게 전달; 실제 사진 사용권과 AI 컨셉 표시 구분
- 개인화기는 역사·기술사만 다루고 제작·개조·구매·사용 절차는 제외
- 원고 검증 → 별도 PR → CI 및 사이트 링크 점검 → 총괄 승인 후 병합

## 착수 직전 충돌 방지

각 신규 원고 작업 직전 `main` 및 열린 PR의 도감 슬러그·주제를 재조회한다. 본 계획은 이미 등록된 5개 전차를 **새 글로 복제하지 않고 기존 URL을 심화**한다. 다른 채팅 브랜치의 콘텐츠·이미지 작업을 임의로 변경하지 않는다.
