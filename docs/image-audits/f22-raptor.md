# F-22A Raptor — 고해상도 AI 도감 이미지 제작·검수 기록

- 제작 일자: 2026-10-29
- 담당: GuideHollow Weapons 채팅 8 — 해외 항공기·해군함정·방공체계·드론 이미지
- 기준 기종: **Lockheed Martin / Boeing F-22A Raptor** (미 공군, 단좌 쌍발 스텔스 전투기)
- 이미지 구분: **AI 생성 개념 이미지**, 공식 실물 사진 아님
- 적용 전용 브랜치: `work/images-systems`
- 상태: 이미지 로컬 생성 완료 / 실제 바이너리 GitHub 반영 대기

## 공식 자료

1. [U.S. Air Force — F-22 Raptor Fact Sheet](https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104506/f-22-raptor/)
2. [Pacific Air Forces — Alaska refuel (공식 공중 촬영 자료)](https://www.pacaf.af.mil/News/Article-Display/Article/595032/alaska-refuel/)
3. [Joint Base Elmendorf-Richardson — 3rd Wing Airmen continue to set new records (미 공군 사진)](https://www.jber.jb.mil/News/Articles/Display/Article/2294345/3rd-wing-airmen-continue-to-set-new-records/)

## 이미지 규격

| 항목 | 최종 값 |
| --- | --- |
| 목표 배포 경로 | `assets/weapons/f22-raptor.webp` |
| 로컬 PNG 원본 | `f22-raptor-ai.png` |
| 로컬 WebP | `f22-raptor-ai.webp` |
| 해상도 | 1664 × 936 px, 정확히 16:9 |
| 배경 | 균일 단색 **#111C2B** (RGB 17,28,43), 외곽 픽셀 색상 검증 |
| 정적 구도 | 상방에서 본 선수 방향 3/4 (기수 좌하단), 기체 전체가 프레임 안에 배치됨 |
| WebP 압축 | **Lossless** (색상 정확성 우선) |
| PNG 용량 | 872,889 bytes |
| WebP 용량 | 592,154 bytes |
| PNG SHA-256 | `ec842451b4e0080ae0ec3b7f67101990228414aecdf3aec7775eb4d992cddc5c` |
| WebP SHA-256 | `6ec263233902f301309e9f3658cfdfe4cdeecd552363eeb394f09bee558964b2` |

## 외형 검수

- [x] 하나의 F-22A 기체만 표현
- [x] 단좌 캐노피 형태, 넓은 사다리꼴 주익, 쌍발 엔진 구역이 식별 가능
- [x] 바깥쪽으로 기울어진 수직꼬리날개 2개와 후방 수평꼬리날개 표현
- [x] 별도의 외부 무장, 화염, 활주로, 격납고, 바다, 하늘, 인물, 문구 없음
- [x] 기수·주익·꼬리 끝까지 이미지 내부에 배치, 프레임 잘림 없음
- [x] 완성 PNG와 WebP를 생성하고 바깥 배경의 지정 RGB 확인
- [ ] 엔진 노즐·공기흡입구 및 특유의 조종석 비율 등 실물 형태와 일대일 교차 검증
- [ ] `assets/weapons/f22-raptor.webp`에 완성 WebP 바이너리 업로드
- [ ] 새 이미지로 도감 카드·상세 페이지·모바일 표시 확인
- [ ] 실제 업로드 후 최종 리뷰 승인

### 정확성 유의

AI가 생성한 항공기의 각도와 표면 장비 패널, 내부 장치 등의 세부 형상은 실제 기종과 차이가 있을 수 있습니다. 공식 군용기 사진, 공식 기술도면, 실제 제원의 대체물이 아닙니다. 특히 이미지 특유의 엔진 출구와 후방 평면 형상은 추가 검증이 필요합니다.

### GitHub 현황

GitHub 연결의 텍스트 파일 쓰기 인터페이스만으로는 별도로 만든 WebP 바이너리 데이터를 직접 업로드할 수 없어, **현 단계의 PR에는 실제 이미지 파일이 포함되어 있지 않습니다.** 이 검수 기록만 병합하면 운영 페이지 이미지가 바뀌지 않습니다. 이미지 업로드 및 검수가 끝나기 전에는 PR을 병합하지 않습니다.
