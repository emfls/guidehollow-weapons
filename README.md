# GuideHollow Weapons
한국어 무기·군사기술 백과사전 — https://weapons.guidehollow.com/

## 구동
서버 프레임워크에 의존하지 않는 정적 HTML/CSS/JS 입니다. GitHub Pages의 `main` root 배포와 GitHub Actions 배포에 대응합니다.

## 구조
- `index.html` : 메인
- `atlas/index.html` : 이름·국가·분야 검색
- `compare/index.html` : 브라우저에서 실행되는 비교 도구
- `weapons/<slug>/index.html` : 독립 URL의 도감 14건
- `assets/catalog.js` : 비교 데이터(정적 JSON JS)
- `assets/site.js` : 검색·비교·링크 복사
- `assets/style.css` : 모바일 우선 다크 테마
- `CNAME` : 사용자 연결 서브도메인
- `.github/workflows/deploy-pages.yml` : 자동 배포 워크플로

## 편집 정책
- 역사·공개 기술·제원과 비교에 집중
- 실제 운용·제조·개조·구매 지침 제공하지 않음
- 초기 그림은 종류별 개념 도식이며 정확한 외형 재현 아님
- 사진과 상세 제원은 출처·사용 권한을 확인한 뒤 추가
- 네이버 웹마스터 소유확인 메타태그 모든 페이지에 포함

## 주의
GitHub Pages 설정에서 Source가 `Deploy from a branch`이면 `main /(root)`로, `GitHub Actions`이면 워크플로 배포 결과로 사이트가 표시됩니다. 두 경로를 모두 지원하도록 순수 정적으로 작성했습니다.
