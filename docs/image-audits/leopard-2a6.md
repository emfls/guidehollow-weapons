# Leopard 2A6 — 도감 이미지 제작·검수 기록

- 담당: 채팅 7 / 해외 지상무기·역사무기 이미지
- 기준형: 독일 Leopard 2 A6 (A6M의 차체 하부 추가 방호장비와 혼동 금지)
- 이미지 종류: AI 생성 개념 렌더 (실제 사진/제조사 공식 이미지 아님)
- 요청 에셋 경로: `assets/weapons/leopard-2.webp`
- 원본 파일명: `leopard-2a6-archive.webp`
- 출력: 1664 × 936 px / 16:9 / lossless WebP / 941,822 bytes
- SHA-256 (로컬 생성본): `c301de6b87d35aeb52fcc391f356ae63f2c7c3d86ff0c8eb67e3921a330a60c7`
- 단색 배경: `#111C2B`; 좌상단 모서리 픽셀 확인
- 구성: 1대, 3/4 정면 시점, 차체·주포 전체 노출, NATO 3색 도장
- 금지 요소 검토: 풍경·연기·전투 장면·인물·국기·글자 없음

## 외형 대조 기준

1. 독일 연방군 공식 역사: A5 이후 쐐기형 포탑 전면 추가 장갑, A6의 장포신 120mm L55 장착. https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/kampfpanzer-leopard-versionen-bundeswehr
2. KNDS Leopard 2A6 공식 제품 페이지: A6 계열의 대표 외형과 공개 기본 제원·주포 형식. https://knds.com/en/products/systems/leopard/leopard-2-a6
3. 독일 연방군 장비 소개: Leopard 2 계열 외형 및 운용형 차이. https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/landsysteme-bundeswehr/leopard-2

**육안 검수:** 쐐기형 포탑 전면, 장포신 주포, 측면 보기륜 7개, 궤도와 사이드스커트, 광학장비·안테나의 대체적인 위치, 완전 노출 구도 확인. 단, AI 생성물의 일부 세부 광학장비·상부 부속품은 개별 실기체 구성과 완전히 일치하지 않을 수 있으므로 공식 도면/실물 증거로 사용하지 않을 것.

## PR 상태 및 잔여 작업

- [x] 기존 사이트 이미지 확인: 저해상도, 하단 글자 아티팩트
- [x] 독립 AI 이미지 생성, 16:9 고해상도, 단색 배경 조정
- [x] 공개 공식 자료와 눈에 보이는 특징 대조
- [x] 무손실 WebP 제작 및 해시 기록
- [ ] **이미지 바이너리 GitHub 저장소 반영**: 현재 GitHub 연결에서는 로컬 생성 바이너리를 직접 전달할 수 없어 아직 변경하지 못함
- [ ] 위 해시값과 실제 업로드된 파일의 일치 검증
- [ ] 카드·상세 보기, 이미지 lazy-loading, 모바일 렌더링 검증
- [ ] CI 결과 확인 후 PR을 검토 가능 상태로 전환

**중요:** 이미지 바이너리 반영 전 PR은 DRAFT로 유지하고, 병합/배포하지 않을 것. `main` 브랜치는 직접 수정하지 않음.
