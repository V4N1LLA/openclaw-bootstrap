# 현재 작업 초점

- 현재 작업: TASK-007 BLOCKED 복구 및 검증 재실행
- 수정 허용 범위: `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 읽어도 되는 파일: `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`, `prompts/router/`, `scripts/codex-router.bat`, `scripts/codex-run-low.bat`, `scripts/codex-run-medium.bat`, `scripts/codex-run-high.bat`, `scripts/codex-run-xhigh.bat`
- 읽지 말아야 할 파일: token, secret, password, `.env`, `.env.*`, `secrets/`, 허용 범위 밖 파일
- 완료 조건: 산출물 존재 확인, xhigh 경고 문구 확인, 저장소 루트에서 `git diff --stat` 성공, TASK-007 DONE 반영
- 검증 명령: `git status --short`, `git diff --stat`
- 마지막 업데이트: 2026-05-21
