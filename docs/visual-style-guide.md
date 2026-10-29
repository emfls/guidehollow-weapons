# GuideHollow Weapons — 도감 이미지 공통 제작 기준
최종 업데이트: 2026-10-29

## 필수
- 모든 이미지의 배경은 정확한 **단색 #111C2B**. 그림자도 배경에 복잡한 표면이나 공간이 생기지 않도록 최소화한다.
- 전차, 항공기, 군함, 드론, 개인화기 역사 자료에 동일한 배경색과 피사체 중심 구도를 적용.
- 무기는 한 장면에 한 대상. 16:9 도감용 기본 이미지로 제작하고 카드에서는 정해진 비율에 맞춰 크롭.
- 촬영 환경 연출(하늘, 구름, 산, 바다, 항구, 활주로, 박물관, 격납고, 연기, 먼지, 그리드, 빛 줄기, 화려한 HUD)은 금지.
- 무기 전체 윤곽이 잘리거나 배경과 합쳐지지 않게 배치. 피사체 자체에는 사실적인 금속 질감과 적절한 방향광 가능.
- 생성 AI 이미지와 기존 공식 사진을 명확히 구분한다. 역사 및 제원 정보의 정확성은 이미지가 아닌 검증된 자료로 유지.

## 향후 생성 프롬프트 표준
"Single [weapon subject] presented as a clean high-detail museum encyclopedia studio render, isolated on a perfectly uniform matte solid #111C2B background, no scenery, no floor, no horizon, no gradient, no fog, no atmosphere, no typography, no technical diagram annotations, no people, no other objects. Entire subject within frame, consistent three-quarter view, restrained soft lighting only on the subject, premium editorial catalog."

## 웹 적용
- `assets/style.css`의 `--media-bg: #111c2b`를 단일 기준 색상으로 사용.
- 카드 썸네일, 상세 이미지 영역, 첫 화면 히어로, 카테고리 비주얼은 동일 색상.
- `motion/index.html`에서도 격자·안개·halo·스캐너·입자를 제거. 동작은 피사체·텍스트에만 적용.
- AI 이미지가 실제 도감 사진처럼 오해되지 않도록 **AI 생성 개념 이미지** 표기를 유지.

## 검수
1. 모든 이미지 배경이 단색인지
2. 피사체 이름과 묘사가 일치하는지
3. 글자와 표식이 원본 이미지에 섞여 있지 않은지
4. 모바일 크롭에서 피사체가 잘리지 않는지
5. 모션을 꺼도 내용 전달이 되는지
