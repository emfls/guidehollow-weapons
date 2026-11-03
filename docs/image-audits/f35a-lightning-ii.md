# F-35A Lightning II — 고해상도 AI 도감 이미지 검수 기록

- 제작 일자: 2026-10-29
- 담당: GuideHollow Weapons 채팅 8 (해외 항공기·함정·방공·무인체계)
- **기준 기종: F-35A Lightning II**, 미국 공군형 CTOL (통상 이착륙형)
- 이미지 유형: **AI 생성 개념 이미지** — 실제 기체 촬영 사진/공식 도면 아님
- 작업 브랜치: `work/images-systems`
- 저장소 상태: **완성 이미지 로컬 생성 완료; 이미지 바이너리 미업로드, 사이트 미반영**

## 검증 가능한 공식 출처

1. [U.S. Air Force — F-35A Lightning II Fact Sheet](https://www.af.mil/About-Us/Fact-Sheets/Display/Article/478441/f-35a-lightning-ii-conventional-takeoff-and-landing-variant/sf2589626/f-35a-lightning-ii/) — 기종 구분·단일 F135 엔진·A형 특성
2. [U.S. Air Force — F-35A Lightning II Official Photo Collection](https://www.af.mil/News/Photos/?igtag=F-35A+Lightning+II) — 실제 기체 외관 확인
3. [Lockheed Martin — F-35 Media Kit](https://www.lockheedmartin.com/f35/mediakit.html) — F-35A/B/C 사진 및 버전별 구분
4. [Airman Magazine — Airframe: The F-35A Lightning II](https://www.airmanmagazine.af.mil/Features/Display/Article/2604345/airframe-the-f-35a-lightning-ii/) — 공군 공식 상세 자료

## 생성 결과 및 파일 정보

| 항목 | 검증 결과 |
| --- | --- |
| 사이트 교체 예정 경로 | `assets/weapons/f35-lightning-ii.webp` |
| 원본 이미지 | `f35a-lightning-ii-ai.png` |
| 무손실 WebP | `f35a-lightning-ii-ai.webp` |
| 해상도 | 1664 × 936 px (16:9) |
| 배경 | 균일 단색 **#111C2B** / RGB (17,28,43) |
| 압축 | Lossless WebP |
| 원본 PNG 크기 | 875,309 bytes |
| WebP 크기 | 603,460 bytes |
| PNG SHA-256 | `1ca7738e59d0cab9513d29db790fd7983996adc4e7b822721b990a86a472fa94` |
| WebP SHA-256 | `43b64b2b000381953d8647cdb0ac6568697a8a2448793302c428f617dfa8d755` |

## 검수 항목

- [x] 한 장에 F-35A 단일 기체만 생성
- [x] 프레임 안에 기수·주익·양쪽 꼬리날개 및 엔진 후부 포함
- [x] 단좌 캐노피와 단발 엔진 구조를 분명히 표현
- [x] 바깥쪽으로 기울어진 두 수직꼬리날개와 A형 주익 비례를 참고
- [x] F-35B 리프트팬 개구부, F-35C 대형 항모용 날개 및 어레스팅 후크를 의도적으로 배제
- [x] 기체 바깥의 풍경·글자·하늘·격납고·인물·전투 효과 없음
- [x] 외부 배경을 정확한 단색 RGB 17/28/43으로 후처리하고 고해상도 원본 보존
- [x] WebP 무손실 저장 후 픽셀 색상과 파일 SHA-256 확인
- [ ] 노즐 톱니 수·흡입구·상부 패널·수직미익 비율 등 실제 기체와 세부 교차 검수
- [ ] GitHub 브랜치에 목표 WebP 바이너리 실업로드
- [ ] 사이트 카드/상세 페이지와 모바일 크롭 렌더링 검수
- [ ] 최종 병합 승인

## 형상 정확성 유의사항

AI 렌더에는 장비 위치, 세부 패널, 미익·엔진 노즐·흡입구 비례에 생성 특유의 오차가 있을 수 있습니다. 실제 F-35A와 정확히 동일한 군용 기술 사진이나 실물 제원의 근거로 사용하지 않습니다.

## PR 적용 대기

현재 연결된 GitHub 텍스트 파일 편집 API는 직접 이미지 바이너리 업로드를 제공하지 않습니다. 따라서 **이 문서가 포함된 PR을 병합해도 운영 중인 F-35 이미지가 교체되지 않습니다.** 반드시 완성된 WebP를 지정 경로로 별도 업로드하고 외형/렌더링 검수를 마친 뒤 승인해야 합니다. main 직접 변경·병합 금지.
