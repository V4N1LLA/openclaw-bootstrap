# 현재 작업 초점

- 현재 작업: 자율 루프 운영 메타 파일 허용 규칙 추가 및 TASK-009 BLOCKED 복구
- 수정 허용 범위: `prompts/agent-loop/00-run-next-task.md`, `prompts/agent-loop/02-execute-small-task.md`, `prompts/agent-loop/03-verify-and-handoff.md`, `context/TASK_QUEUE.md`, `context/HANDOFF.md`, `context/current-focus.md`, `context/DECISION_LOG.md`
- 읽어도 되는 파일: `AGENTS.md`, `prompts/agent-loop/00-run-next-task.md`, `prompts/agent-loop/02-execute-small-task.md`, `prompts/agent-loop/03-verify-and-handoff.md`, `context/TASK_QUEUE.md`, `context/HANDOFF.md`, `context/current-focus.md`, `context/DECISION_LOG.md`
- 읽지 말아야 할 파일: token, secret, password, `.env`, `.env.*`, `secrets/`, 허용 범위 밖 파일
- 완료 조건: 운영 메타 파일 예외 규칙 추가, TASK-009 TODO 복구, TASK-009~011에 `context/current-focus.md` 추가
- 검증 명령: `git diff --stat`, `Select-String -LiteralPath context/TASK_QUEUE.md -Pattern "TASK-009|상태: TODO"`, `Select-String -LiteralPath prompts/agent-loop/00-run-next-task.md -Pattern "운영 메타 파일|current-focus.md"`
- 마지막 업데이트: 2026-05-21
