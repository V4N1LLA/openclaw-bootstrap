# 현재 작업 초점

- 현재 작업: OCB-SCOPE-GUARD 작업 scope guard 규칙 추가
- 현재 브랜치: `main`
- 현재 상태: `main` HEAD는 `origin/main`과 동기화된 상태에서 문서 변경 진행
- 작업 목표: 작업 ID/PR 목적과 실제 changed files가 맞지 않으면 STOP하는 하네스 규칙 추가
- 완료한 것: 작업 시작 전 작업 ID, 목표, 허용 파일 범위 확인 규칙 추가
- 완료한 것: 커밋 전 staged files와 작업 Scope 비교 규칙 추가
- 완료한 것: PR 생성 전 changed files와 PR 목적 비교 규칙 추가
- 완료한 것: scope mismatch 시 STOP하고 관련 없는 변경은 별도 브랜치 후보로 보존하는 절차 추가
- 완료한 것: CI-GATE PR에 gateway 런타임 변경이 섞였던 사례를 회고로 문서화
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 수정 허용 범위: `AGENTS.md`, `WORKFLOW.md`, `TASKS.md`, `.harness/`, `context/current-focus.md`, `context/HANDOFF.md`
- 금지사항: 코드 변경 금지, 커밋 금지, push 금지, 패키지 설치 금지, secret/token/password/API key 원문 출력 금지
- 검증 명령: `git status --short`, `git diff --name-only`, `rg -n "Scope Guard|scope mismatch|changed files|별도 브랜치 후보|CI-GATE" AGENTS.md WORKFLOW.md TASKS.md .harness context/current-focus.md context/HANDOFF.md`
- 마지막 업데이트: 2026-06-11
