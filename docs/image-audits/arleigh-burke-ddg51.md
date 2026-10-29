# 알레이 버크급 구축함 — USS Arleigh Burke DDG-51 AI 이미지 검수

- 담당: GuideHollow Weapons 채팅 8
- 기준함: **USS Arleigh Burke (DDG-51)**, Arleigh Burke class **Flight I** 초도함
- 구분: **AI 생성 도감 이미지** (미 해군 공식 실물 사진 아님)
- 브랜치: `work/images-systems`
- 상태: AI 렌더 및 로컬 최종 WebP 생성 완료. 이미지 바이너리 GitHub 업로드·실배포 대기.

## 공식 외형 참고 자료

1. [Naval History and Heritage Command — NH 106827-KN, USS Arleigh Burke DDG-51](https://www.history.navy.mil/our-collections/photography/numerical-list-of-images/nhhc-series/nh-series/NH-106000/nh-106827-kn-uss-arleigh-burke--ddg-51-.html)
2. [미 해군 수상함 부대 — Destroyer Ship Class Info (Flight I/IIA 비교 및 헬리콥터 격납고 구분)](https://www.surflant.usff.navy.mil/Organization/Operational-Forces/Destroyers/Destroyer-Ship-Class-DDG-Info-Page/)
3. [미 해군 현역함 페이지 — USS Arleigh Burke DDG 51](https://www.surflant.usff.navy.mil/ddg51)
4. [건조사 Bath Iron Works — ARLEIGH BURKE](https://www.gdbiw.com/ship/arleigh-burke/)

## 파일 사양

| 항목 | 값 |
| --- | --- |
| 교체 대상 | `assets/weapons/arleigh-burke.webp` |
| 원본 로컬 파일 | `arleigh-burke-ddg51-ai.png` |
| 사이트용 로컬 파일 | `arleigh-burke-ddg51-ai.webp` |
| WebP 저장 방식 | **lossless**, 배경 색상 변형 없는 무손실 압축 |
| PNG 크기 | 815,085 bytes |
| WebP 크기 | **600,184 bytes** |
| 크기 | **1664 × 936 px**, 정확한 16:9 |
| 배경 | **#111C2B** (RGB 17,28,43) |
| 시점 | 선수 쪽 3/4 정적 도감 구도 |
| PNG SHA-256 | `7bde32ca5406a772de5317c99d66943f098e00807b9102220972d77b218a9cf7` |
| WebP SHA-256 | `1c278bac93018ff28ac69a62c2700726804dc11045f91650d4fc858bb90c7431` |

## 검수 결과

- [x] 선체 전체가 프레임 안에 위치
- [x] 16:9 및 1664x936 비율 확인
- [x] 외부 배경 한 가지 색상으로 교체, 배경 임의 그라데이션 제거
- [x] 함미에 헬리콥터 착함갑판 포함
- [x] Flight I 실함과 다르게 **Flight IIA의 쌍격납고를 추가하지 않음**
- [x] 주포, 전방 수직발사구역, 함교, 마스트, 연돌 묘사
- [x] 바다·하늘·사람·전투 연출·외부 표지 문구 없음
- [x] 원본 PNG + 무손실 WebP 출력
- [ ] 중요 안테나 및 레이더 패널 비율 / 배치의 공식 사진과 일대일 일치 검증
- [ ] 저장소의 기존 `assets/weapons/arleigh-burke.webp` 바이너리 교체
- [ ] 이미지 적용 이후 렌더링/반응형/품질 재검토
- [ ] PR 최종 검토 및 승인

### 편집 정확성 주의

시각적 형태는 DDG-51 Flight I 공식 사진과 외형상 비교하여 제작했으나 디지털 AI 렌더의 레이더 평면 배열, 난간, 함교 및 장비 크기는 실함과 완전히 일치하지 않을 수 있습니다. 실물 함정의 기술 도면이나 공식 사진으로 사용하지 마세요.

### GitHub 반영 대기 사유

GitHub 연결의 파일 생성·수정 API는 UTF-8 텍스트 기반이므로, 별도 생성한 WebP 바이너리를 원본 경로에 직접 업로드할 수 없습니다. 본 문서만 등록한 경우 도감 이미지가 교체되지 않습니다. 실제 이미지 파일 교체 및 QA가 끝나기 전에는 이 PR을 병합하면 안 됩니다.
