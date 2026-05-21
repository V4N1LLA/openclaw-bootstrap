# 현재 작업 초점

- 현재 작업: TASK-005 자율 루프 하네스 자체 리뷰 완료
- 수정 허용 범위: `context/TASK_QUEUE.md`, `context/DECISION_LOG.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 읽어도 되는 파일: `AGENTS.md`, `context/TASK_QUEUE.md`, `context/DECISION_LOG.md`, `context/current-focus.md`, `context/HANDOFF.md`, `docs/CODEX-AUTONOMOUS-LOOP.md`, `scripts/codex-run-next.bat`, `scripts/codex-agent-loop.bat`, `prompts/agent-loop/`
- 읽지 말아야 할 파일: token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`, 허용 범위 밖 파일
- 완료 조건: 하네스 규칙, 스크립트, 문서 간 불일치 여부를 검토하고 필요한 결정만 `DECISION_LOG.md`에 기록함
- 검증 명령어: `Select-String -LiteralPath context/TASK_QUEUE.md -Pattern "TASK-005"`
- 마지막 업데이트: 2026-05-21
