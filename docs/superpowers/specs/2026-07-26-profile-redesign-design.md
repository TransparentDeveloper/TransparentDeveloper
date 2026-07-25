# GitHub 프로필 리디자인 설계

- 날짜: 2026-07-26
- 대상: `TransparentDeveloper/TransparentDeveloper` 프로필 README
- 목표: "확장하는 FE 개발자" 정체성이 드러나는, 커스텀 애니메이션 중심의 프로필

## 요구사항

- 정체성: React/TS 주력에서 Go·Svelte·AI로 영역을 확장 중인 FE 개발자
- 시각 효과: 커스텀 애니메이션 SVG + 잔디밭 스네이크 + 라이브 데이터 위젯
- 언어: 한국어
- 밀도: 표준 (스크롤 1.5화면 이내)
- 톤: 절제. 오글거리는 슬로건·이모지 남발 금지

## 레이아웃 (위→아래)

1. 히어로 SVG (커스텀 애니메이션)
2. 기술 스택 — Core / Expanding 구분
   - Core: React, Next.js, TypeScript
   - Expanding: Go, Svelte(SvelteKit)
   - shields.io 배지, flat-square 스타일 유지
3. 라이브 위젯 — GitHub 스탯 카드 + Top Languages 나란히
4. 잔디밭 스네이크 애니메이션
5. velog 최신글 (기존 자동화 유지)

## 히어로 SVG — "코어에서 확장"

정체성을 문구가 아니라 구조로 표현한다.

- 구성: 중앙 코어에 `React · TypeScript`, 바깥 동심원 궤도 위에 `Go` `Svelte` `AI` 노드
- 모션: 노드가 궤도를 따라 천천히 공전 + 중심에서 파동이 바깥으로 퍼짐. 루프당 6~10초의 느린 템포
- 텍스트: `이윤신 — Frontend Developer` 한 줄만
- 팔레트: 딥블루/시안 계열
- 구현: 순수 SVG + SMIL/내장 CSS 애니메이션. JS 사용 불가 (GitHub은 README 이미지를 camo 프록시 뒤 `<img>`로 렌더링하므로 스크립트가 실행되지 않음)
- 테마 대응: 다크/라이트 두 벌(`hero-dark.svg`, `hero-light.svg`)을 만들어 `<picture>` + `prefers-color-scheme`으로 분기

## 라이브 위젯

- `github-readme-stats` 스탯 카드 + Top Languages 카드 (호스팅형 — 별도 액션 불필요)
- 색상 테마를 히어로 팔레트(딥블루/시안)와 통일

## 잔디밭 스네이크

- `Platane/snk` GitHub Action
- 매일 스케줄 + 수동 트리거(workflow_dispatch), 결과 SVG를 `output` 브랜치에 커밋
- 다크/라이트 두 벌 생성, `<picture>`로 분기

## 저장소 구성

```
TransparentDeveloper/
  README.md
  assets/
    hero-dark.svg
    hero-light.svg
  .github/workflows/
    snake.yml          (신규)
    update-readme.yml  (기존 velog 자동화 — 수정하지 않음)
  latestVelogPosts.js  (기존 — 수정하지 않음)
```

## 검증

- 푸시 후 실제 프로필 페이지에서 확인:
  - 히어로 SVG 애니메이션 동작 여부
  - 다크/라이트 테마 각각에서 히어로·스네이크·위젯 렌더링
- `snake.yml` 수동 트리거로 1회 실행해 `output` 브랜치 생성 확인
- velog 섹션 마커(`VelogPostsStart/End`)가 새 README에 보존되어 기존 자동화가 계속 동작하는지 확인

## 범위 제외

- velog 자동화(`update-readme.yml`, `latestVelogPosts.js`) 변경
- GitHub bio·프로필 사진 등 README 외 요소
