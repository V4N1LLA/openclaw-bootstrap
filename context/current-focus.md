# 현재 작업 초점

- 현재 작업: TASK-007 effort 라우터 프롬프트와 실행 스크립트 추가
- 수정 허용 범위: `prompts/router/`, `scripts/codex-router.bat`, `scripts/codex-run-low.bat`, `scripts/codex-run-medium.bat`, `scripts/codex-run-high.bat`, `scripts/codex-run-xhigh.bat`, `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 읽어도 되는 파일: `docs/CODEX-EFFORT-ROUTING.md`, `scripts/codex-run-next.bat`, `prompts/agent-loop/`, `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 읽지 말아야 할 파일: token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`, 허용 범위 밖 파일
- 완료 조건: 작업 분류 프롬프트 생성, effort별 실행 스크립트 생성, xhigh 실행 전 경고 문구 포함
- 검증 명령어: `git diff --stat`
- 마지막 업데이트: 2026-05-21
