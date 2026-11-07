# 페이지 로딩·비교 탐색 후속 개선

기준 커밋: `e7ad202dc1f983008963bc57d390ef29cd260ca4` · [PR #20](https://github.com/emfls/guidehollow-weapons/pull/20).

사용자의 직접 개선 요청에 따라 기존 PR 브랜치에서 구현했다. main 병합과 운영 배포는 수행하지 않았다. 원격 CI의 최종 커밋과 실행 링크는 PR 설명에 기록한다.

## 개선 내용

1. **정적 페이지에서 불필요한 카탈로그 다운로드 제거.** 홈·337개 상세·사이트 안내·개인정보 페이지에 포함되던 `catalog-core.js`와 `catalog.js`를 제거했다. 두 파일은 도감·비교 페이지에서만 로드한다. 링크 복사·토스트 이벤트는 공통 코드에서 카탈로그 검사보다 먼저 등록하므로 상세 링크 복사는 유지된다. 원래 스크립트가 없던 모션 예시는 그대로 정적이다.
2. **비교 자료를 찾는 경로 개선.** 전체 337개 선택지를 유지하면서 형식별 제원이 있는 6종을 앞 그룹에 배치했다. 공유 프로필을 중복 계산하지 않은 7개 기준 형식을 안내하며, 양쪽에 ‘형식별 제원 있는 기종만’ 필터를 추가했다. 이 숫자는 생성 데이터에서 계산된다.
3. **검색 실패와 상태 복원 개선.** 각 쪽의 ‘검색·필터 초기화’는 검색·분야·자료 필터를 해제하고 현재 기종·세부 형식은 유지한다. 검색 조건 밖의 현재 선택은 별도 그룹에 남긴다. 자료 필터는 `ra`·`rb` URL 매개변수로 새로고침·뒤로가기·공유·순서 교환에 반영된다. 검색만 바꿀 때는 비교표를 다시 만들지 않아 열린 기본 정보와 내부 스크롤 상태를 보존한다.
4. **JavaScript 비활성 상태 정리.** 작동하지 않는 도감 필터·페이지 이동과 비교 조작부를 숨기고 전체 337개 정적 링크 및 기본 K2·M1 비교표를 읽을 수 있게 안내했다.

## 직접 실행한 검증

- `node --test tests/*.test.cjs`: **34/34 PASS**. 기존 28개에 페이지별 의존성·카탈로그 없는 링크 복사·비교 필터/복원·0결과 초기화·교환·그룹 보존 6개를 추가했다.
- `node scripts/build.mjs --check`: **345개 생성물 일치**.
- `python3 scripts/validate.py`: **343경로·337문서·265이미지 PASS**. 기존 OG·canonical·구조화 데이터·출처·이미지·날짜·에셋 해시 검사에 경로별 스크립트 검사를 추가했다.
- 브라우저 **20건 PASS**. 실제 클릭·입력·Space 키·복사·뒤로가기·새로고침·JavaScript 비활성 컨텍스트에서 확인했다. [전체 기록](browser-results.json).
- 비교 화면 **360·390·768·1440px**: 바깥 가로 넘침 없음. 새 체크박스의 클릭 가능한 라벨과 초기화·비교 버튼은 최소 44×44px. 테스트 흐름의 페이지·콘솔 오류 없음.
- 기준 대비 **337개 상세의 `<main>` 내용과 265개 이미지 바이너리 동일**. 기종별 제원·출처·검토일은 변경하지 않았다. 사이트 구성 수정일만 2026-11-08로 정리했다.
- 독립 코드 리뷰에서 회귀·생성물·정적·공백 검사 재실행 및 정적 페이지의 카탈로그 의존성 검색을 수행했다. 추가 회귀는 발견되지 않았다.

## 로딩 개선 실측 범위

동일한 Linux headless Chromium 153.0.8010.0에서 기준 체크아웃과 수정본을 각각 로컬 HTTP로 제공했다. 캐시는 사용하지 않았고 네트워크/CPU 지연은 가하지 않았다. 브라우저가 요청한 스크립트 URL을 확인한 뒤 대응 파일의 실제 바이트 크기를 합산했다.

| 페이지 | JavaScript 요청 전 → 후 | 요청 파일 크기 합계 전 → 후 |
|---|---:|---:|
| 홈 | 3 → 1 | 292,271 → 9,849바이트 |
| K9 상세 | 3 → 1 | 292,271 → 9,849바이트 |

두 표본에서 요청 JavaScript 원본 크기는 **282,422바이트, 약 96.6% 감소**했다. 이는 스크립트 파일 크기와 요청 수 비교다. 이미지·CSS·HTML을 포함한 전체 전송량, 압축 전송량, 운영 서버 응답시간 또는 LCP/CWV 개선률을 뜻하지 않는다. 도감과 비교에는 상호작용에 필요한 카탈로그가 유지된다.

## 화면 기록

| 화면 | 변경 전 | 변경 후 |
|---|---|---|
| 비교 390px | [PNG](screenshots/before-compare-390.png) | [PNG](screenshots/after-compare-390.png) |
| 비교 1440px | [PNG](screenshots/before-compare-1440.png) | [PNG](screenshots/after-compare-1440.png) |
| 비교 360px | — | [PNG](screenshots/after-compare-360.png) |
| 비교 768px | — | [PNG](screenshots/after-compare-768.png) |
| 자료 필터·F35 검색 390px | — | [PNG](screenshots/after-profile-filter-390.png) |
| JavaScript 비활성 도감 | — | [PNG](screenshots/after-nojs-atlas-390.png) |
| JavaScript 비활성 비교 | — | [PNG](screenshots/after-nojs-compare-390.png) |

## 브라우저 검증 재실행

검사 코드: [browser-check.cjs](browser-check.cjs). 프로덕션이나 기본 CI에 Playwright를 추가하지 않았다. 별도 QA 환경에 Playwright와 Chromium, 한국어 글꼴이 설치되어 있으면 다음과 같이 실행한다.

```sh
node docs/qa/2026-11-08/browser-check.cjs /path/to/current /path/to/baseline
```

Playwright가 다른 경로에 있으면 `WEAPONS_PLAYWRIGHT_MODULE`, 별도 Chromium을 쓰면 `WEAPONS_BROWSER_EXECUTABLE`에 해당 경로를 지정한다. 검사는 두 로컬 정적 서버를 같은 프로세스에서 실행하고 끝날 때 종료하며 결과 JSON과 화면을 이 폴더에 저장한다. 이번 실행은 `@sparticuz/chromium` 153.0.0의 실행 파일을 일반 Playwright 인자로 사용했다.

## 남은 범위

이번 변경은 페이지 로딩·비교 탐색 개선이다. 전체 337종의 심층 사실검증이나 신규 제원 수집은 수행하지 않았다. 실기기·Safari/Firefox·운영 HTTPS 성능은 별도 확인 대상이다. 앞선 PR의 기능·화면 기록은 [2026-11-07 보고서](../2026-11-07/report.md)에 별도로 남아 있다.
