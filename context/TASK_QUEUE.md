# Codex 자율 작업 큐

이 파일은 Codex가 한 번에 하나의 작업만 고르고, 실행하고, 검증하고, 인계하기 위한 최소 작업 큐다.

## 작업 목록

- ID: TASK-001
- 상태: DONE
- 우선순위: P0
- 작업 목표: 루트 `AGENTS.md` 기준으로 자율 작업 루프 규칙 보완
- 수정 허용 파일: `AGENTS.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 읽어도 되는 파일: `AGENTS.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 금지사항: 실제 서비스 코드 생성 금지, OpenClaw 실행 금지, Telegram token 읽기/출력 금지, 허용 파일 밖 수정 금지
- 완료 조건: `AGENTS.md`에 한 번에 하나의 작업 선택, 작업 후 인계, 중단 조건 준수 규칙이 짧게 추가됨
- 검증 명령: `Select-String -LiteralPath AGENTS.md -Pattern "자율 작업 루프"`
- 예상 토큰 등급: S
- 비고: 하네스 생성 작업에서 반영함.

- ID: TASK-002
- 상태: DONE
- 우선순위: P0
- 작업 목표: `codex-run-next.bat` 작성
- 수정 허용 파일: `scripts/codex-run-next.bat`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 읽어도 되는 파일: `scripts/collect-min-context.bat`, `prompts/agent-loop/00-run-next-task.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 금지사항: 외부 패키지 설치 금지, OpenClaw 실행 금지, Telegram token 읽기/출력 금지, git commit/push 금지
- 완료 조건: 최소 컨텍스트 수집 후 `00-run-next-task.md`를 `codex exec --cd . --sandbox workspace-write -`로 전달함
- 검증 명령: `Select-String -LiteralPath scripts/codex-run-next.bat -Pattern "codex exec --cd . --sandbox workspace-write -"`
- 예상 토큰 등급: S
- 비고: 하네스 생성 작업에서 반영함.

- ID: TASK-003
- 상태: DONE
- 우선순위: P1
- 작업 목표: `codex-agent-loop.bat` 작성
- 수정 허용 파일: `scripts/codex-agent-loop.bat`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 읽어도 되는 파일: `scripts/codex-run-next.bat`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 금지사항: force push 금지, merge 금지, rebase 금지, git commit/push 금지, OpenClaw 실행 금지
- 완료 조건: 반복 횟수 기본값 1, 최대값 5, 반복마다 run-next 실행 및 `git status --short` 출력
- 검증 명령: `Select-String -LiteralPath scripts/codex-agent-loop.bat -Pattern "MAX=5"`
- 예상 토큰 등급: S
- 비고: 하네스 생성 작업에서 반영함.

- ID: TASK-004
- 상태: DONE
- 우선순위: P1
- 작업 목표: `CODEX-AUTONOMOUS-LOOP.md` 작성
- 수정 허용 파일: `docs/CODEX-AUTONOMOUS-LOOP.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 읽어도 되는 파일: `docs/CODEX-TOKEN-STRATEGY.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 금지사항: token/secret/.env 출력 금지, 전체 저장소 탐색 금지, 실제 서비스 코드 생성 금지
- 완료 조건: 자율 루프 필요성, 작업 큐 방식, HANDOFF 압축, 중단 조건, 토큰 절약, OpenClaw/Telegram 연결, 예시 명령어가 포함됨
- 검증 명령: `Select-String -LiteralPath docs/CODEX-AUTONOMOUS-LOOP.md -Pattern "TASK_QUEUE.md"`
- 예상 토큰 등급: M
- 비고: 하네스 생성 작업에서 반영함.

- ID: TASK-005
- 상태: DONE
- 우선순위: P2
- 작업 목표: 자율 루프 하네스 자체 리뷰
- 수정 허용 파일: `context/TASK_QUEUE.md`, `context/DECISION_LOG.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 읽어도 되는 파일: `AGENTS.md`, `context/TASK_QUEUE.md`, `context/DECISION_LOG.md`, `context/current-focus.md`, `context/HANDOFF.md`, `docs/CODEX-AUTONOMOUS-LOOP.md`, `scripts/codex-run-next.bat`, `scripts/codex-agent-loop.bat`, `prompts/agent-loop/`
- 금지사항: 허용 파일 밖 수정 금지, OpenClaw 실행 금지, Telegram token 읽기/출력 금지, git commit/push 금지
- 완료 조건: 하네스 규칙, 스크립트, 문서 간 불일치 여부를 검토하고 필요한 결정만 `DECISION_LOG.md`에 기록함
- 검증 명령: `Select-String -LiteralPath context/TASK_QUEUE.md -Pattern "TASK-005"`
- 예상 토큰 등급: M
- 비고: 다음 자동 루프 실행 후보.
