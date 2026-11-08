# 도감 탐색·비교 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 같은 기준의 데이터로 찾기·읽기·비교를 개선하고 검토 가능한 PR을 만든다.
**Architecture:** 정적 배포 유지. 공통 JSON 데이터와 Node/브라우저 공유 순수 함수로 생성 HTML과 상호작용을 일치시킨다.
**Tech Stack:** 기존 HTML/CSS/JS, Node 표준 라이브러리와 node:test.
**Spec:** `docs/superpowers/specs/2026-11-07-discovery-comparison-design.md`

## Global Constraints

- 새 작업 브랜치, PR만. main 직접 push·병합·배포 금지.
- 기존 이미지·글·URL·네이버 태그·canonical·robots·사이트맵 보존.
- 제원 추정, 기준이 다른 수치 합치기, 미검토 기사 날짜 일괄 갱신 금지.

## Review Focus

- 공백/대시/전각 표기와 복수 검색어: 동일 기종 집합.
- ‘인도 발표’와 박물관 출처: 국가 관계로 오인하지 않음.
- 옛 복합 국가 URL·유효하지 않은 페이지: 명시적 정규화와 범위 보정.
- 계열·미국/호주 SEPv3·F35A/B/C: 형식과 측정 조건 분리.
- 뒤로가기·JS 비활성·모바일 표: 선택 상태와 정적 링크·표 제목 관계 유지.

### Task 1: 공통 탐색 데이터·회귀 검증
- [x] 저장소·실행 화면 원인 확인, 변경 전 20개 화면 기록.
- [x] `tests/catalog-core.test.cjs`에 검색/국가/개수/URL/제원 의미 테스트 작성 후 실패 확인.
- [x] `assets/catalog-core.js`, `data/catalog.json` 최소 구현. 기존 별칭·자료 검토일·크레딧 보존.
- [x] Node 테스트 통과 확인.

### Task 2: 대표 자료와 비교 프로필
- [x] 직접 열람한 공식 문서로 `data/editorial.json`의 M1·F35·K2 프로필과 본문 작성.
- [x] `crew/combatMass/vehicleMass/roadSpeed/standardTerrainSpeed/combatRadius/range` 정의·출처·상태 테스트.
- [x] 본문과 비교가 같은 프로필을 사용하는 생성 구조 확인.

### Task 3: 정적 생성과 화면 동작
- [x] `scripts/build.mjs`, `templates`로 공통 수치·홈·24개 도감·337개 이름 링크·의미 있는 비교 표 생성.
- [x] `assets/site.js`에 필터·정렬·페이지·검색 대상 좁히기·형식·공유·popstate 복원 구현.
- [x] `assets/style.css`에 실제 화면에서 확인한 모바일·터치·표·포커스 개선.
- [x] `scripts/validate.py`와 PR 전용 CI로 정적 링크/이미지/메타/재생성 검증. 기존 main 배포 경로는 유지.

### Task 4: 전체 검증과 PR
- [x] Node 테스트·build --check·정적 검증 실행, 새 오류 수정.
- [x] 실제 브라우저 URL·뒤로가기·키보드·모바일·JS 없는 링크·콘솔/이미지 오류 확인.
- [x] 같은 환경 전후 20개 화면과 성능 측정치 보고.
- [x] 변경 범위 독립 리뷰와 회귀 수정 완료. 커밋·작업 브랜치 push·PR #20 생성. main 병합·배포하지 않음.
