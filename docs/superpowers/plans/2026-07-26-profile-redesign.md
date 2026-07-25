# GitHub 프로필 리디자인 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** "확장하는 FE 개발자" 정체성을 시각화한 커스텀 애니메이션 히어로 SVG + 스네이크 + 라이브 위젯으로 프로필 README를 재구성한다.

**Architecture:** 히어로는 순수 SVG(SMIL 애니메이션, JS 없음)를 다크/라이트 두 벌로 repo에 커밋하고 `<picture>`로 분기한다. 스네이크는 Platane/snk 액션이 `output` 브랜치에 SVG를 생성한다. 기존 velog 자동화(`update-readme.yml`, `latestVelogPosts.js`)는 수정하지 않고 README의 마커만 보존한다.

**Tech Stack:** SVG + SMIL, GitHub Actions (Platane/snk), github-readme-stats, shields.io

**작업 디렉토리:** `~/projects/TransparentDeveloper` (이미 클론됨, 브랜치 main에서 직접 작업)

**스펙:** `docs/superpowers/specs/2026-07-26-profile-redesign-design.md`

**주의사항:**
- GitHub은 README 이미지를 camo 프록시 뒤 `<img>`로 렌더링한다. JS는 실행되지 않고 SMIL/내장 CSS 애니메이션만 동작한다.
- `update-readme.yml`은 main 푸시 시에도 실행되어 velog 목록이 바뀌면 bot 커밋을 만든다. 푸시 후 `git pull` 필요.
- 커밋 메시지는 한국어로 작성한다.

---

### Task 1: 히어로 SVG 다크 버전 생성

**Files:**
- Create: `assets/hero-dark.svg`

- [ ] **Step 1: `assets/hero-dark.svg` 작성**

아래 내용 그대로 생성한다. 구조: 좌측 이름/타이틀, 우측 궤도 시스템(코어 React·TypeScript, 궤도 노드 Svelte/Go/AI 공전 + 라벨 수평 유지용 역회전, 중심에서 퍼지는 파동 2개).

```xml
<svg width="840" height="360" viewBox="0 0 840 360" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, 'Apple SD Gothic Neo', 'Segoe UI', 'Malgun Gothic', sans-serif">
  <defs>
    <radialGradient id="coreGrad" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </radialGradient>
    <linearGradient id="titleGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7DD3FC"/>
      <stop offset="100%" stop-color="#22D3EE"/>
    </linearGradient>
  </defs>

  <!-- 카드 배경 -->
  <rect width="840" height="360" rx="16" fill="#0B1220"/>
  <rect x="0.5" y="0.5" width="839" height="359" rx="15.5" stroke="#1E3A5F" stroke-opacity="0.6"/>

  <!-- 좌측 텍스트 -->
  <text x="64" y="172" font-size="44" font-weight="700" fill="#E2E8F0" opacity="0">이윤신<animate attributeName="opacity" from="0" to="1" dur="1.2s" fill="freeze"/></text>
  <text x="66" y="206" font-size="17" letter-spacing="0.4" fill="url(#titleGrad)" opacity="0">Frontend Developer<animate attributeName="opacity" from="0" to="1" begin="0.4s" dur="1.2s" fill="freeze"/></text>

  <!-- 파동 (확장의 은유) -->
  <circle cx="600" cy="180" r="48" stroke="#38BDF8" stroke-width="1.5" opacity="0">
    <animate attributeName="r" values="48;170" dur="7s" begin="1s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.45;0" dur="7s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <circle cx="600" cy="180" r="48" stroke="#38BDF8" stroke-width="1.5" opacity="0">
    <animate attributeName="r" values="48;170" dur="7s" begin="4.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.45;0" dur="7s" begin="4.5s" repeatCount="indefinite"/>
  </circle>

  <!-- 궤도 -->
  <circle cx="600" cy="180" r="88" stroke="#1E3A5F" stroke-width="1"/>
  <circle cx="600" cy="180" r="124" stroke="#1E3A5F" stroke-width="1" stroke-dasharray="1 7" stroke-linecap="round"/>
  <circle cx="600" cy="180" r="160" stroke="#1E3A5F" stroke-width="1" stroke-dasharray="1 7" stroke-linecap="round"/>

  <!-- 궤도 노드: Svelte (r=88, 시작각 40°, 18s) -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="40 600 180" to="400 600 180" dur="18s" repeatCount="indefinite"/>
    <g transform="translate(688 180)">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="-40" to="-400" dur="18s" repeatCount="indefinite"/>
        <circle r="6" fill="#22D3EE"/>
        <circle r="10" stroke="#22D3EE" stroke-opacity="0.35"/>
        <text x="16" y="4" font-size="13" fill="#BAE6FD">Svelte</text>
      </g>
    </g>
  </g>

  <!-- 궤도 노드: Go (r=124, 시작각 200°, 26s) -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="200 600 180" to="560 600 180" dur="26s" repeatCount="indefinite"/>
    <g transform="translate(724 180)">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="-200" to="-560" dur="26s" repeatCount="indefinite"/>
        <circle r="6" fill="#38BDF8"/>
        <circle r="10" stroke="#38BDF8" stroke-opacity="0.35"/>
        <text x="16" y="4" font-size="13" fill="#BAE6FD">Go</text>
      </g>
    </g>
  </g>

  <!-- 궤도 노드: AI (r=160, 시작각 310°, 34s) -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="310 600 180" to="670 600 180" dur="34s" repeatCount="indefinite"/>
    <g transform="translate(760 180)">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="-310" to="-670" dur="34s" repeatCount="indefinite"/>
        <circle r="6" fill="#7DD3FC"/>
        <circle r="10" stroke="#7DD3FC" stroke-opacity="0.35"/>
        <text x="16" y="4" font-size="13" fill="#BAE6FD">AI</text>
      </g>
    </g>
  </g>

  <!-- 코어 -->
  <circle cx="600" cy="180" r="48" fill="url(#coreGrad)"/>
  <circle cx="600" cy="180" r="48" fill="none" stroke="#7DD3FC" stroke-opacity="0.5">
    <animate attributeName="stroke-opacity" values="0.5;0.15;0.5" dur="7s" repeatCount="indefinite"/>
  </circle>
  <text x="600" y="176" text-anchor="middle" font-size="13" font-weight="600" fill="#F0F9FF">React</text>
  <text x="600" y="193" text-anchor="middle" font-size="12" font-weight="600" fill="#E0F2FE">TypeScript</text>
</svg>
```

- [ ] **Step 2: XML 유효성 + 브라우저 검증**

Run: `cd ~/projects/TransparentDeveloper && xmllint --noout assets/hero-dark.svg && echo VALID`
Expected: `VALID`

Run: `open -a "Google Chrome" assets/hero-dark.svg`
확인 항목: (1) 노드 3개가 궤도를 따라 공전하고 라벨이 수평 유지되는지 (2) 파동이 중심에서 퍼지는지 (3) 텍스트 페이드인. 스크린샷 검증 도구(browse 등)가 있으면 캡처로 확인해도 된다.

- [ ] **Step 3: Commit**

```bash
cd ~/projects/TransparentDeveloper
git add assets/hero-dark.svg
git commit -m "히어로 SVG 다크 버전 추가 (코어-궤도 확장 컨셉)"
```

---

### Task 2: 히어로 SVG 라이트 버전 생성

**Files:**
- Create: `assets/hero-light.svg`

- [ ] **Step 1: `assets/hero-light.svg` 작성**

다크 버전과 구조·애니메이션 동일, 색만 라이트 팔레트. 아래 내용 그대로 생성한다.

```xml
<svg width="840" height="360" viewBox="0 0 840 360" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, 'Apple SD Gothic Neo', 'Segoe UI', 'Malgun Gothic', sans-serif">
  <defs>
    <radialGradient id="coreGrad" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </radialGradient>
    <linearGradient id="titleGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0891B2"/>
    </linearGradient>
  </defs>

  <!-- 카드 배경 -->
  <rect width="840" height="360" rx="16" fill="#F8FAFC"/>
  <rect x="0.5" y="0.5" width="839" height="359" rx="15.5" stroke="#E2E8F0"/>

  <!-- 좌측 텍스트 -->
  <text x="64" y="172" font-size="44" font-weight="700" fill="#0F172A" opacity="0">이윤신<animate attributeName="opacity" from="0" to="1" dur="1.2s" fill="freeze"/></text>
  <text x="66" y="206" font-size="17" letter-spacing="0.4" fill="url(#titleGrad)" opacity="0">Frontend Developer<animate attributeName="opacity" from="0" to="1" begin="0.4s" dur="1.2s" fill="freeze"/></text>

  <!-- 파동 (확장의 은유) -->
  <circle cx="600" cy="180" r="48" stroke="#0EA5E9" stroke-width="1.5" opacity="0">
    <animate attributeName="r" values="48;170" dur="7s" begin="1s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0" dur="7s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <circle cx="600" cy="180" r="48" stroke="#0EA5E9" stroke-width="1.5" opacity="0">
    <animate attributeName="r" values="48;170" dur="7s" begin="4.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0" dur="7s" begin="4.5s" repeatCount="indefinite"/>
  </circle>

  <!-- 궤도 -->
  <circle cx="600" cy="180" r="88" stroke="#CBD5E1" stroke-width="1"/>
  <circle cx="600" cy="180" r="124" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="1 7" stroke-linecap="round"/>
  <circle cx="600" cy="180" r="160" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="1 7" stroke-linecap="round"/>

  <!-- 궤도 노드: Svelte (r=88, 시작각 40°, 18s) -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="40 600 180" to="400 600 180" dur="18s" repeatCount="indefinite"/>
    <g transform="translate(688 180)">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="-40" to="-400" dur="18s" repeatCount="indefinite"/>
        <circle r="6" fill="#0891B2"/>
        <circle r="10" stroke="#0891B2" stroke-opacity="0.35"/>
        <text x="16" y="4" font-size="13" fill="#334155">Svelte</text>
      </g>
    </g>
  </g>

  <!-- 궤도 노드: Go (r=124, 시작각 200°, 26s) -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="200 600 180" to="560 600 180" dur="26s" repeatCount="indefinite"/>
    <g transform="translate(724 180)">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="-200" to="-560" dur="26s" repeatCount="indefinite"/>
        <circle r="6" fill="#0284C7"/>
        <circle r="10" stroke="#0284C7" stroke-opacity="0.35"/>
        <text x="16" y="4" font-size="13" fill="#334155">Go</text>
      </g>
    </g>
  </g>

  <!-- 궤도 노드: AI (r=160, 시작각 310°, 34s) -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="310 600 180" to="670 600 180" dur="34s" repeatCount="indefinite"/>
    <g transform="translate(760 180)">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="-310" to="-670" dur="34s" repeatCount="indefinite"/>
        <circle r="6" fill="#0369A1"/>
        <circle r="10" stroke="#0369A1" stroke-opacity="0.35"/>
        <text x="16" y="4" font-size="13" fill="#334155">AI</text>
      </g>
    </g>
  </g>

  <!-- 코어 -->
  <circle cx="600" cy="180" r="48" fill="url(#coreGrad)"/>
  <circle cx="600" cy="180" r="48" fill="none" stroke="#0284C7" stroke-opacity="0.45">
    <animate attributeName="stroke-opacity" values="0.45;0.15;0.45" dur="7s" repeatCount="indefinite"/>
  </circle>
  <text x="600" y="176" text-anchor="middle" font-size="13" font-weight="600" fill="#F0F9FF">React</text>
  <text x="600" y="193" text-anchor="middle" font-size="12" font-weight="600" fill="#E0F2FE">TypeScript</text>
</svg>
```

- [ ] **Step 2: XML 유효성 + 브라우저 검증**

Run: `cd ~/projects/TransparentDeveloper && xmllint --noout assets/hero-light.svg && echo VALID`
Expected: `VALID`

Run: `open -a "Google Chrome" assets/hero-light.svg`
확인 항목은 Task 1 Step 2와 동일 + 라이트 배경에서 대비가 충분한지.

- [ ] **Step 3: Commit**

```bash
cd ~/projects/TransparentDeveloper
git add assets/hero-light.svg
git commit -m "히어로 SVG 라이트 버전 추가"
```

---

### Task 3: 스네이크 워크플로 생성

**Files:**
- Create: `.github/workflows/snake.yml`

- [ ] **Step 1: `.github/workflows/snake.yml` 작성**

```yaml
name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Generate snake SVGs
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: |
            dist/github-snake.svg
            dist/github-snake-dark.svg?palette=github-dark

      - name: Push to output branch
        uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

- [ ] **Step 2: YAML 문법 검증**

Run: `cd ~/projects/TransparentDeveloper && ruby -ryaml -e "YAML.load_file('.github/workflows/snake.yml'); puts 'VALID'"`
Expected: `VALID`

- [ ] **Step 3: Commit**

```bash
cd ~/projects/TransparentDeveloper
git add .github/workflows/snake.yml
git commit -m "잔디밭 스네이크 생성 워크플로 추가"
```

---

### Task 4: README.md 재작성

**Files:**
- Modify: `README.md` (전체 교체)

**중요:** `<!-- VelogPostsStart -->` ~ `<!-- VelogPostsEnd -->` 마커와 그 사이 기존 글 목록 4개를 그대로 보존해야 기존 velog 자동화가 계속 동작한다.

- [ ] **Step 1: `README.md` 전체를 아래 내용으로 교체**

```markdown
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/hero-dark.svg">
  <img src="./assets/hero-light.svg" alt="이윤신 — Frontend Developer" width="100%">
</picture>

#### Core

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">

#### Expanding

<img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=Go&logoColor=white"> <img src="https://img.shields.io/badge/Svelte-FF3E00?style=flat-square&logo=Svelte&logoColor=white">

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=TransparentDeveloper&show_icons=true&hide_border=true&bg_color=0B1220&title_color=38BDF8&icon_color=22D3EE&text_color=94A3B8&ring_color=38BDF8">
  <img src="https://github-readme-stats.vercel.app/api?username=TransparentDeveloper&show_icons=true&hide_border=true&bg_color=F8FAFC&title_color=0284C7&icon_color=0284C7&text_color=334155&ring_color=0284C7" alt="GitHub stats" height="170">
</picture> <picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=TransparentDeveloper&layout=compact&langs_count=8&hide_border=true&bg_color=0B1220&title_color=38BDF8&text_color=94A3B8">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=TransparentDeveloper&layout=compact&langs_count=8&hide_border=true&bg_color=F8FAFC&title_color=0284C7&text_color=334155" alt="Top languages" height="170">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/TransparentDeveloper/TransparentDeveloper/output/github-snake-dark.svg">
  <img src="https://raw.githubusercontent.com/TransparentDeveloper/TransparentDeveloper/output/github-snake.svg" alt="contribution snake" width="100%">
</picture>

#### 최신 벨로그 게시글
<!-- VelogPostsStart -->

1. <a href="https://velog.io/@sksmsdbstlsdlek/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%B2%B4%ED%97%98%EA%B8%B0-FxTS" target="_blank">라이브러리 체험기 - FxTS</a>
2. <a href="https://velog.io/@sksmsdbstlsdlek/CICD-%EC%99%80-Github-Action" target="_blank">CI/CD 와 Github Action</a>
3. <a href="https://velog.io/@sksmsdbstlsdlek/NPM-%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-Module-System-%EC%9D%B4%ED%95%B4%EC%99%80-package.json-%EC%84%A4%EC%A0%95" target="_blank">NPM 에 배포하기 - ①, Module System 이해와 package.json 설정</a>
4. <a href="https://velog.io/@sksmsdbstlsdlek/%EC%A3%BC%EA%B4%80%EC%A0%95%EB%A6%AC-%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0-%ED%95%A8%EC%88%98-%EA%B4%80%EB%A6%AC-fw0vqp2p" target="_blank">[주관정리] - 유틸리티 함수 관리</a>

<!-- VelogPostsEnd -->
```

- [ ] **Step 2: 마커 보존 확인**

Run: `cd ~/projects/TransparentDeveloper && grep -c "VelogPostsStart\|VelogPostsEnd" README.md`
Expected: `2`

- [ ] **Step 3: Commit**

```bash
cd ~/projects/TransparentDeveloper
git add README.md
git commit -m "README 리디자인 (히어로 SVG·스탯 위젯·스네이크·velog 유지)"
```

---

### Task 5: 푸시 및 실제 렌더링 검증

**Files:** 없음 (배포·검증만)

- [ ] **Step 1: 푸시**

```bash
cd ~/projects/TransparentDeveloper
git push origin main
```

- [ ] **Step 2: 스네이크 워크플로 실행 확인**

push 트리거로 자동 실행된다. 완료 대기:

Run: `cd ~/projects/TransparentDeveloper && gh run watch $(gh run list --workflow=snake.yml --limit 1 --json databaseId --jq '.[0].databaseId') --exit-status`
Expected: 성공 종료 (exit 0). 실패 시 `gh run view --log-failed`로 원인 확인.

- [ ] **Step 3: output 브랜치 생성 확인**

Run: `gh api repos/TransparentDeveloper/TransparentDeveloper/branches --jq '.[].name'`
Expected: `main`과 `output` 두 개.

- [ ] **Step 4: bot 커밋 회수**

`update-readme.yml`이 push 트리거로 실행되어 bot 커밋이 생겼을 수 있다.

```bash
cd ~/projects/TransparentDeveloper
git pull --rebase origin main
```

- [ ] **Step 5: 프로필 페이지 실렌더 검증**

https://github.com/TransparentDeveloper 를 브라우저(browse 스킬 또는 Chrome)로 열어 확인:
- 히어로 SVG 애니메이션 동작 (공전·파동·페이드인)
- 다크/라이트 테마 각각에서 히어로·스탯 카드·스네이크가 올바른 버전으로 렌더링
- 스네이크 이미지 로드 (output 브랜치 raw URL)
- velog 섹션 정상 표시

문제 발견 시 수정 → 커밋 → 푸시 → 재확인.
