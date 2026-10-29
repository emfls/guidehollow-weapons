# 세종대왕급 구축함(DDG-991) AI 이미지 재제작 — 검수 기록

- 담당: GuideHollow Weapons 채팅 8
- 기준함: 대한민국 해군 **세종대왕함 DDG-991** (광개토-III Batch-I)
- 구분: **AI 생성 도감 이미지** (공식 함정 실물 사진 아님)
- 작업 브랜치: `work/images-systems`
- 병합 상태: 미병합 / 이미지 바이너리 반영 대기

## 확인한 실물 참고 자료

1. [미 해군 촬영 — DVIDS, 2016 RIMPAC DDG-991](https://www.dvidshub.net/image/2756682/forty-ships-and-submarines-steam-close-formation-during-rimpac-roks-sejong-great-ddg-991)
2. [미 해군 촬영 — DVIDS, 2022 RIMPAC DDG-991](https://www.dvidshub.net/image/7313296/roks-sejong-great-departs-pearl-harbor-rimpac-2022)
3. [방위사업청 — 세종대왕급 Batch-I / 정조대왕급 Batch-II 구분](https://www.dapa.go.kr/dapa/doc/selectDoc.do?bbsSeq=326&docSeq=21732&menuSeq=3069&recordCountPerPage=10)

## 재제작 이미지 규격

| 항목 | 값 |
| --- | --- |
| 목표 저장소 경로 | `assets/weapons/sejong-the-great.webp` |
| 생성 원본 형식 | PNG |
| 사이트용 형식 | WebP (quality 93) |
| 크기 | 1664 × 936 px (정확한 16:9) |
| 사이트용 파일 크기 | 118,798 bytes |
| 배경 | 단색 `#111C2B` |
| 구도 | 함정 전체 3/4 시점 |
| 배경 요소 | 바다·하늘·사람·문자 없음 |
| 사이트용 파일 SHA-256 | `4747bdaf728201d31f76396db2b574e9f49f18163dc88b607926bd1d7b651000` |

## 육안 비교 검수

- [x] 함정 전장에 걸친 선수·중앙 구조물·후방 비행갑판이 화면 안에 들어옴
- [x] 선수 주포, 전방 상부구조, 2개 연돌 구조, 함미 갑판을 구분 가능
- [x] 바다·수평선·하늘·전장 효과 없이 정적 도감형 배경
- [x] 공식 사진과 비교 시 Batch-I 세종대왕급의 기본 실루엣을 기준으로 제작
- [ ] 실물과 부품 단위까지 정확히 동일한지 추가 이미지 교차 검수
- [ ] **사이트용 WebP 바이너리 GitHub 저장소 업로드**
- [ ] 브랜치의 `assets/weapons/sejong-the-great.webp` 교체 후 렌더링 검증
- [ ] PR 검토 및 승인 (main에 직접 병합하지 않음)

### 검수상 주의

AI 이미지의 세부 안테나, 센서, 갑판 장비 배치는 사진과 정확히 일치하지 않을 수 있습니다. 특히 마스트 비율과 레이더·돔·격납고 세부 배치를 실물 사진과 비교하여 심각한 형상 오류가 보이면 교체해야 합니다. 이미지 생성물은 실물 사진이나 공식 도면으로 표시하지 않습니다.

### 반영 대기 사유

이미지는 대화 작업공간에서 생성·검수 후 WebP와 무손실 PNG로 출력했습니다. 현재 연결된 GitHub 파일 작성 API가 바이너리 파일 원본을 직접 받을 수 없어, 이 초안 PR에는 이미지 파일 교체를 포함하지 않았습니다. 이미지 파일을 업로드하여 이 PR에 포함시키기 전에는 **병합하면 안 됩니다**.