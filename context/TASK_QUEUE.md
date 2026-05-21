# Codex 자율 작업 큐

이 파일은 Codex가 한 번에 하나의 작업만 고르고, 실행하고, 검증하고, 인계하기 위한 최소 작업 큐다.

## 작업 목록

- ID: TASK-001
- 상태: DONE
- 우선순위: P0
- 추천 effort: low
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
- 추천 effort: low
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
- 추천 effort: low
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
- 추천 effort: medium
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
- 추천 effort: medium
- 작업 목표: 자율 루프 하네스 자체 리뷰
- 수정 허용 파일: `context/TASK_QUEUE.md`, `context/DECISION_LOG.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 읽어도 되는 파일: `AGENTS.md`, `context/TASK_QUEUE.md`, `context/DECISION_LOG.md`, `context/current-focus.md`, `context/HANDOFF.md`, `docs/CODEX-AUTONOMOUS-LOOP.md`, `scripts/codex-run-next.bat`, `scripts/codex-agent-loop.bat`, `prompts/agent-loop/`
- 금지사항: 허용 파일 밖 수정 금지, OpenClaw 실행 금지, Telegram token 읽기/출력 금지, git commit/push 금지
- 완료 조건: 하네스 규칙, 스크립트, 문서 간 불일치 여부를 검토하고 필요한 결정만 `DECISION_LOG.md`에 기록함
- 검증 명령: `Select-String -LiteralPath context/TASK_QUEUE.md -Pattern "TASK-005"`
- 예상 토큰 등급: M
- 비고: 다음 자동 루프 실행 후보.

- ID: TASK-006
- 상태: DONE
- 우선순위: P1
- 추천 effort: medium
- 작업 목표: Codex reasoning effort 라우팅 정책 문서와 profiles 템플릿을 추가한다.
- 수정 허용 파일: `codex/profiles/`, `docs/CODEX-EFFORT-ROUTING.md`, `AGENTS.md`
- 읽어도 되는 파일: `AGENTS.md`, `docs/CODEX-TOKEN-STRATEGY.md`
- 금지사항: 실제 서비스 코드 생성 금지, OpenClaw 실행 금지, git commit/push 금지
- 완료 조건: low/medium/high/xhigh 사용 기준이 문서화됨, xhigh를 기본값으로 사용하지 말라는 규칙이 포함됨
- 검증 명령: `git diff --stat`
- 예상 토큰 등급: M
- 비고: reasoning effort 정책 문서와 low/medium/high/xhigh 프로필 템플릿 확인 완료.

- ID: TASK-007
- 상태: DONE
- 우선순위: P1
- 추천 effort: medium
- 작업 목표: effort 라우터 프롬프트와 실행 스크립트를 추가한다.
- 수정 허용 파일: `prompts/router/`, `scripts/codex-router.bat`, `scripts/codex-run-low.bat`, `scripts/codex-run-medium.bat`, `scripts/codex-run-high.bat`, `scripts/codex-run-xhigh.bat`
- 읽어도 되는 파일: `docs/CODEX-EFFORT-ROUTING.md`, `scripts/codex-run-next.bat`, `prompts/agent-loop/`
- 금지사항: git commit/push 금지, OpenClaw 실행 금지, token/secret 출력 금지
- 완료 조건: 작업 분류 프롬프트 생성, effort별 실행 스크립트 생성, xhigh 실행 전 경고 문구 포함
- 검증 명령: `git diff --stat`
- 예상 토큰 등급: M
- 비고: 저장소 루트에서 산출물 존재, xhigh 경고 문구, `git diff --stat` 재검증 완료.

- ID: TASK-008
- 상태: DONE
- 우선순위: P2
- 추천 effort: low
- 작업 목표: TASK_QUEUE 작업 형식에 추천 effort 필드가 일관되게 들어갔는지 리뷰한다.
- 수정 허용 파일: `context/TASK_QUEUE.md`, `context/HANDOFF.md`
- 읽어도 되는 파일: `context/TASK_QUEUE.md`, `context/HANDOFF.md`
- 금지사항: git commit/push 금지, 전체 저장소 탐색 금지
- 완료 조건: 모든 TODO/DONE 작업에 추천 effort 필드가 있거나 예외가 명시됨
- 검증 명령: `git diff --stat`
- 예상 토큰 등급: S
- 비고: TASK-001~TASK-005에 추천 effort 필드를 추가해 모든 TODO/DONE 작업 형식을 일관화함.

- ID: TASK-009
- 상태: DONE
- 우선순위: P1
- 추천 effort: low
- 작업 목표: 하네스 v0.1 완료 기준을 문서화한다.
- 수정 허용 파일: `docs/CODEX-AUTONOMOUS-LOOP.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 읽어도 되는 파일: `docs/CODEX-AUTONOMOUS-LOOP.md`, `context/TASK_QUEUE.md`, `context/HANDOFF.md`
- 금지사항: 실제 서비스 코드 생성 금지, OpenClaw 실행 금지, git commit/push 금지
- 완료 조건: 하네스 v0.1 완료 기준과 MVP repo 전환 조건이 문서화됨
- 검증 명령: `git diff --stat`
- 예상 토큰 등급: S
- 비고: 하네스 v0.1 완료 기준과 MVP repo 전환 조건 문서화 완료.

- ID: TASK-010
- 상태: DONE
- 우선순위: P1
- 추천 effort: medium
- 작업 목표: 실제 MVP 서비스 repo 초기화 프롬프트와 템플릿을 작성한다.
- 수정 허용 파일: `prompts/mvp/`, `docs/MVP-BOOTSTRAP.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 읽어도 되는 파일: `docs/CODEX-AUTONOMOUS-LOOP.md`, `docs/CODEX-TOKEN-STRATEGY.md`, `templates/README.md`, `templates/PRODUCT.md`
- 금지사항: 실제 서비스 repo 생성 금지, 실제 서비스 코드 생성 금지, git commit/push 금지
- 완료 조건: MVP repo 초기화에 사용할 Codex 프롬프트와 문서 템플릿이 준비됨
- 검증 명령: `git diff --stat`
- 예상 토큰 등급: M
- 비고: MVP repo 초기화 문서와 Codex 프롬프트 초안 준비 완료.

- ID: TASK-011
- 상태: DONE
- 우선순위: P2
- 추천 effort: medium
- 작업 목표: 하네스를 실제 MVP repo에 적용하는 bootstrap 스크립트 초안을 작성한다.
- 수정 허용 파일: `scripts/init-mvp-repo.bat`, `docs/MVP-BOOTSTRAP.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 읽어도 되는 파일: `scripts/sync-agents.bat`, `templates/`, `codex/`
- 금지사항: 실제 서비스 repo 생성 금지, OpenClaw 실행 금지, git commit/push 금지
- 완료 조건: 대상 repo 경로를 받아 AGENTS/context/docs 템플릿을 복사하는 초안 스크립트가 준비됨
- 검증 명령: `git diff --stat`
- 예상 토큰 등급: M
- 비고: `scripts/init-mvp-repo.bat` 초안 추가. 기본 dry-run이며 `APPLY=1`일 때만 기존 대상 repo에 문서 구조를 준비한다.
