# Challenger 2 도감 이미지 제작·검수 기록

- 제작일: 2026-10-29
- 대상: 영국 Challenger 2 기본형 주력전차 (Challenger 3 및 추가 장갑 패키지와 구별)
- 결과물: **AI 생성 개념 이미지** (실물 사진, 검증된 3D 스캔 및 기술 도면 아님)
- 교체 목표: `assets/weapons/challenger-2.webp`
- 생성 파일: `challenger-2-guidehollow.webp` (현재 채팅에서 생성·제공, **GitHub 저장소에 미업로드**)
- 크기: 1664 × 936 (16:9)
- 형식: WebP **무손실**, 1,016,082 bytes
- SHA-256: `74a26eed1528413becb66ff2cd7dd257a7f3c86f2bfd6729eb1e39ca5ec623cc`
- 배경 RGB: (17, 28, 43) / `#111C2B`

## 기존 이미지 문제

main의 `assets/weapons/challenger-2.webp`에서 전차가 화면 중앙의 작은 영역을 차지하여 상세 형상이 잘 보이지 않았음. 고해상도 독립 생성으로 개선하는 작업이다.

## 공식 자료 기반 외형 대조

1. UK British Army는 Challenger 2가 L30A1 120 mm 강선포와 4명 승무원을 사용하는 전차로 소개한다. 출처: https://www.army.mod.uk/learn-and-explore/equipment/combat-vehicles/challenger-2/
2. Rheinmetall은 Challenger 2와 Challenger 3를 별도 형식으로 구분하며, Challenger 2의 120 mm 강선포와 광학/열상 관측체계를 설명한다. 출처: https://www.rheinmetall.com/en/products/tracked-armoured-vehicles/challenger
3. 영국 국방부 Defence Equipment & Support는 Challenger 2에서 Challenger 3로 진행되는 현대화를 소개한다. 출처: https://des.mod.uk/what-we-do/army-procurement-support/challenger-3/
4. 차륜 구성에 관해 독립 식별 자료는 양측에 각 6개 보기륜을 제시한다. 출처: https://weaponsystems.net/system/281-Challenger%2B2

## 렌더 검수

- [x] 무기 1종 독립 이미지
- [x] 차체·포탑·포신·궤도를 3/4 전면 시점으로 표시
- [x] 장포신/각진 포탑/측면 6개 보기륜 기준 육안 대조
- [x] 좌우 측면·차륜·궤도 세부 묘사 확인
- [x] 전체 피사체 화면 내 노출
- [x] 풍경·전투 장면·인물·국기·글자 없음
- [x] 단색 `#111C2B` 배경 보정, 16:9 무손실 WebP 내보내기
- [ ] 생성된 **WebP 원본**을 GitHub의 지정 경로로 업로드
- [ ] 실제 사이트의 썸네일 및 상세 페이지 렌더·CI 확인

**정확성 한계:** AI 출력의 포탑 상부 장비·광학 센서·기타 소형 부품은 실제 Challenger 2의 특정 생산/개량 블록과 완전히 같다고 검증할 수 없다. 공식 사진으로 오인되지 않도록 'AI 생성 개념 이미지'로 표시해야 한다.

## 적용 및 병합 절차

1. 채팅에서 다운로드한 원본 파일을 `assets/weapons/challenger-2.webp`에 대체 배치한다 (확장자만 변경하지 말고 원본 WebP 파일의 바이트 그대로 사용).
2. 업로드된 결과물의 크기와 SHA-256이 위 값과 동일한지 확인한다.
3. `/weapons/challenger-2/` 및 카드 화면에서 잘림·라벨·선명도를 확인한다.
4. 이미지가 빠진 상태에서는 PR을 **Draft**로 유지한다.
5. main에 직접 병합하지 않고 검토를 거쳐 PR에서 병합한다.
