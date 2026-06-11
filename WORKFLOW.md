# OCB-001 작업 절차

## 작업 시작 절차

1. `/mnt/c/dev/openclaw-bootstrap`으로 이동한다.
2. `pwd`로 작업 디렉터리를 확인한다.
3. `git branch --show-current`로 브랜치가 `feature/OCB-001-discord-local-agent-gateway`인지 확인한다.
4. `git status --short`로 기존 변경 사항을 확인한다.
5. `AGENTS.md`, `TASKS.md`, `WORKFLOW.md`, `CONTEXT.md`를 읽고 현재 작업 범위를 확인한다.
6. `TASKS.md` 또는 `CONTEXT.md`에 `review_pending` 상태의 열린 PR이 기록되어 있으면 새 작업 시작 전 먼저 Deferred PR Review Check를 수행한다.
7. 사용자가 작업 ID를 지정했다면 `TASKS.md`에서 해당 작업의 `Status`, `Scope`, `Validation`, `Forbidden`을 확인한다.
8. 사용자가 작업 ID를 지정하지 않았다면 `TASKS.md`에서 다음 `TODO` 작업 하나만 선택한다.
9. 작업 시작 전 `.harness/checklists/scope-guard.md` 기준으로 작업 ID, 목표, 허용 파일 범위를 확인한다.
10. 시작 시점의 기존 changed files가 작업 Scope와 맞지 않으면 수정하지 않고 STOP 보고한다.

## Discord PM Local LLM-first 정책

최종 운영 기준은 Discord `#agent-pm`의 PM/Sub-Agent 흐름이다. Telegram은 Discord 운영이 완성되기 전 임시 소통 창구로만 본다.

Discord `#agent-pm`에 짧은 명령이 들어오면 PM Agent는 Codex를 바로 호출하지 않는다. 먼저 Local LLM 또는 규칙 기반 전처리로 다음 산출물을 만든다.

- 요청 요약
- 작업 분류: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`
- 예상 수정 파일 후보
- 검증 후보
- Codex에 전달할 최소 컨텍스트
- 사용자 승인 필요 여부

### 작업 분류 기준

`LOW`:

- 파일 수정 없이 답변 가능한 단순 질의
- 문서, 커밋 메시지, PR 본문, diff 요약 초안
- 이미 수집된 정보의 정리와 재표현
- Local LLM 또는 규칙 기반으로 처리하고 Codex 호출을 생략할 수 있다.

`MEDIUM`:

- 제한된 파일 범위의 문서 변경
- 작은 코드 변경 후보 정리
- 검증 명령 후보 정리
- Local LLM이 계획, 파일 후보, 검증 후보를 만든 뒤 Codex에 최소 컨텍스트만 전달한다.

`HIGH`:

- 실제 코드 수정
- 테스트 실패 수정
- 구조 변경
- 여러 파일에 걸친 동작 변경
- Codex가 수행하고 review 또는 별도 검증을 거친다.

`CRITICAL`:

- 배포, force push, destructive git
- 권한/보안 정책 변경
- 비용 발생 가능 외부 API 또는 외부 공개 변경
- 사용자 명시 승인 전까지 실행하지 않는다.

`STOP`:

- secret/token/password/API key/raw secret 읽기, 출력, 요약, 전달 요청
- 사용자 승인이 있어도 PM Agent, Local LLM, Codex가 실행하지 않는다.
- raw secret은 읽거나 출력하거나 요약하거나 전달하지 않는다.
- 사용자가 직접 수행할 안전 절차와 원문 값을 포함하지 않는 확인 명령만 안내한다.

### 역할 분담

Local LLM 담당:

- 요약
- 문서 초안
- 커밋 메시지 초안
- PR 본문 초안
- diff 요약
- 작업 계획
- 파일 후보 추림
- 검증 후보 추림

Codex 담당:

- 실제 코드 수정
- 테스트 실패 수정
- 구조 변경
- repository 상태 확인이 필요한 작업
- GitHub PR review 반영

### PM/Sub-Agent 전달 규칙

PM Agent는 `LOW` 작업은 자체 처리하고, `MEDIUM` 이상 작업만 Codex 또는 하위 에이전트로 넘긴다.

Codex에 넘길 때는 전체 대화 전문을 전달하지 않고 다음 최소 컨텍스트만 전달한다.

- 작업 ID
- 분류 등급
- 목표
- 허용 파일 후보
- 금지 사항
- 검증 후보
- 사용자 승인 필요 여부

## Short Command Mode

Telegram에서 짧은 명령을 받으면 아래 규칙으로 해석한다.

### `OCB-001-D 진행해줘`

1. 작업 시작 절차를 수행한다.
2. `TASKS.md`에서 `OCB-001-D`가 존재하는지 확인한다.
3. `Status`가 `TODO` 또는 `IN_PROGRESS`인지 확인한다.
4. `Status`가 `DONE`이면 재작업하지 말고 확인 질문을 한다.
5. `.harness/checklists/scope-guard.md`를 적용한다.
6. `Scope` 안에서만 구현한다.
7. `Forbidden` 항목을 적용한다.
8. `Validation` 명령을 실행할 수 있으면 실행한다.
9. 완료 시 `TASKS.md`의 상태와 다음 작업을 갱신한다.

### `OCB-001-D 검증만 해줘`

1. 작업 시작 절차를 수행한다.
2. `TASKS.md`에서 `OCB-001-D`의 `Validation`만 확인한다.
3. 파일 수정 없이 검증 명령만 실행한다.
4. 검증 결과와 현재 `Status`를 보고한다.

### `OCB-001-D 상태 알려줘`

1. 작업 시작 절차를 수행한다.
2. `TASKS.md`에서 `OCB-001-D`의 `Status`, `Scope`, `Validation`, `Forbidden`을 확인한다.
3. 파일 수정 없이 현재 상태만 보고한다.

### `OCB-001-D 요약해줘`

1. 작업 시작 절차를 수행한다.
2. `TASKS.md`에서 `OCB-001-D`의 `Status`, `Scope`, `Validation`, `Forbidden`을 확인한다.
3. 관련 변경 파일이 있으면 `git status --short` 기준으로 범위를 확인한다.
4. 파일 수정 없이 작업 목적, 현재 상태, 남은 일을 짧게 보고한다.

### `OCB-001-D 이어서 해줘`

1. 작업 시작 절차를 수행한다.
2. `TASKS.md`에서 `OCB-001-D`가 존재하는지 확인한다.
3. `Status`가 `IN_PROGRESS`이면 남은 `Scope`를 이어서 수행한다.
4. `Status`가 `TODO`이면 새 작업으로 시작해도 되는지 보수적으로 판단하고 진행한다.
5. `Status`가 `DONE`이면 재작업하지 말고 확인 질문을 한다.

### `현재 상태 알려줘`

1. `pwd`, `git branch --show-current`, `git status --short`를 확인한다.
2. `TASKS.md`의 전체 작업 상태와 다음 작업을 확인한다.
3. 파일 수정 없이 요약 보고한다.

### `다음 작업 알려줘`

1. 작업 시작 절차 중 읽기 단계만 수행한다.
2. `TASKS.md`에서 다음 `TODO` 작업 하나를 확인한다.
3. 해당 작업의 `Scope`, `Validation`, `Forbidden`을 요약한다.

### `OCB-001 PR 초안 작성해줘`

1. 작업 시작 절차를 수행한다.
2. `TASKS.md`에서 `OCB-001` 관련 완료 상태와 검증 결과를 확인한다.
3. `.harness/skills/prepare-pr/SKILL.md` 기준으로 PR 제목과 본문 초안을 작성한다.
4. 실제 PR 생성, push, merge는 실행하지 않는다.

### `OCB-001 PR 생성해줘`

1. 작업 시작 절차를 수행한다.
2. `.harness/playbooks/create-pr.md`를 선택한다.
3. `.harness/checklists/before-pr.md`를 적용한다.
4. `.harness/checklists/scope-guard.md`를 적용해 PR 목적과 changed files가 일치하는지 확인한다.
5. 현재 브랜치, working tree clean 여부, upstream, 최신 커밋 SHA, secret 포함 위험, build/test 검증 결과를 확인한다.
6. push가 필요하면 사용자에게 먼저 보고하고, 명시 승인 없이 push하지 않는다.
7. `gh`가 있고 인증되어 있으면 `gh pr create`로 PR 생성을 진행할 수 있다.
8. `gh`가 없거나 인증되지 않았으면 PR 생성 URL, 제목, 본문만 출력하고 멈춘다.
9. PR 생성 후 PR URL을 보고한다.
10. `TASKS.md` 또는 `CONTEXT.md`에 `review_pending` 상태를 기록한다.
11. 자동 리뷰를 기다리며 프로세스를 점유하지 않고 작업을 종료한다.
12. merge, squash merge, deploy는 별도 승인 전까지 실행하지 않는다.

### `OCB-001 PR 상태 알려줘`

1. 작업 시작 절차를 수행한다.
2. Deferred PR Review Check를 수행한다.
3. 현재 브랜치와 upstream을 확인한다.
4. 가능하면 `gh pr status` 또는 `gh pr view`로 현재 브랜치의 PR 상태를 확인한다.
5. `gh`가 없거나 인증되지 않았으면 GitHub PR URL 후보와 현재 Git 상태만 보고한다.
6. 파일 수정, push, merge는 실행하지 않는다.

### `OCB-001 PR 상태 확인해줘`

1. `PR 상태 알려줘`와 동일하게 조회 전용 명령으로 해석한다.
2. PR open/closed/merged 여부, mergeable 상태, review/comment 상태, build/test 상태만 확인한다.
3. `문제 없으면 merge 해`, `문제 없으면 병합해`, `확인 후 merge 해` 같은 조건부 merge 승인 문구가 함께 있지 않으면 merge를 실행하지 않는다.
4. 파일 수정, push, merge는 실행하지 않는다.

### `OCB-001 PR merge 준비해줘`

1. 작업 시작 절차를 수행한다.
2. merge 준비 판단 전에 반드시 Deferred PR Review Check를 수행한다.
3. P0/P1/P2 리뷰가 있으면 merge 준비 완료로 보고하지 않고 작업화 또는 사용자 확인을 요청한다.
4. Low/P3 리뷰는 후속 TODO로 분리할 수 있다.
5. 리뷰가 아직 없으면 `자동 리뷰 미도착`으로 보고하고 사용자 판단을 기다린다.
6. merge는 사용자 명시 승인 전까지 실행하지 않는다.

### `OCB-001 PR 상태 확인해줘. 문제 없으면 merge 해.`

1. `PR 상태 확인해줘`는 조회 전용 단계로 먼저 수행한다.
2. `문제 없으면 merge 해`는 조건부 merge 승인으로 해석한다.
3. 조건부 merge 승인일 때도 Deferred PR Review Check를 먼저 수행한다.
4. P0/P1/P2 리뷰, unresolved blocking review thread, successful/completed 상태가 아닌 build/test, pending 또는 missing check, dirty working tree, head SHA 불일치, `.env` 포함 위험이 있으면 merge를 중단하고 STOP 보고한다.
5. PR이 open, mergeable, 최신 head SHA 기준이고 차단 리뷰가 없으며 필요한 build/test checks가 모두 successful/completed일 때만 merge를 진행한다.
6. merge 실행 시 merge 대상 PR 번호, base/head, head SHA, merge method를 보고한다.
7. merge 후 PR URL, merge commit SHA, 최종 상태를 보고한다.

### PR Ready Review Gate

Draft PR은 CI 실행과 변경 공유를 위한 중간 상태로만 취급한다.

Draft 상태에서 comment, review, thread가 없다는 사실은 merge 가능 근거가 아니다. 자동 리뷰가 아직 도착하지 않았거나 ready 전환 전이라 review 대상이 아니었을 수 있기 때문이다.

MEDIUM 또는 HIGH PR은 ready 전환과 merge를 같은 run에서 수행하지 않는다.

1. draft PR을 ready로 전환하기 전 changed files scope, `.env` 포함 위험, secret/token/password/API key/raw secret 위험을 확인한다.
2. 문제가 없으면 ready 전환까지만 수행하고 run을 종료한다.
3. ready 전환 후 다음 사용자 명령 또는 별도 run에서 CI completed/success 상태를 다시 확인한다.
4. ready 전환 후 review, comment, unresolved thread를 다시 확인한다.
5. ready 전환 후 PR changed files가 PR 목적과 계속 일치하는지 다시 확인한다.
6. ready 전환 후 mergeable 상태와 최신 head SHA를 다시 확인한다.
7. 위 재확인 이후에만 별도 merge 승인 명령을 처리할 수 있다.

STOP 기준:

- MEDIUM/HIGH PR에서 ready 전환과 merge를 같은 run에서 요청한다.
- draft 상태의 comment/review/thread 없음만 merge 근거로 삼으려 한다.
- ready 전환 이후 CI, review, comment, thread, changed files scope, mergeable 상태 재확인 없이 merge하려 한다.
- docs-only 또는 policy-only PR에 runtime/source 변경이 섞여 있다.

작업 ID가 `TASKS.md`에 없으면 임의로 진행하지 말고 확인 질문을 한다.

## Scope Guard

작업 ID, 작업 목표, PR 목적, changed files가 서로 맞지 않으면 실행을 멈춘다.

확인 시점:

1. 작업 시작 전: 작업 ID, 목표, `TASKS.md` Scope, 허용 파일 범위를 비교한다.
2. 파일 수정 전: 기존 changed files가 현재 작업 범위와 섞여 있지 않은지 확인한다.
3. 커밋 전: staged files가 작업 Scope와 일치하는지 확인한다.
4. PR 생성 전: PR 제목/본문 목적과 branch changed files가 일치하는지 확인한다.
5. merge 전: PR changed files가 PR 목적과 일치하는지 다시 확인한다.

STOP 기준:

- 작업 ID와 관련 없는 파일이 changed files에 포함되어 있다.
- PR 제목/본문 목적과 실제 변경 파일이 다르다.
- docs-only PR에 runtime 또는 source 변경이 섞여 있다.
- gateway runtime PR에 하네스 정책 변경이 설명 없이 섞여 있다.
- `.env`, secret/token/password/API key 원문 또는 raw secret 위험이 있다.

STOP 보고에는 다음을 포함한다.

- 현재 작업 ID와 목표
- 허용 파일 범위
- 실제 changed files
- mismatch 파일 목록
- 관련 없는 변경을 별도 브랜치 후보로 보존할 제안

관련 없는 변경은 삭제하거나 되돌리지 않는다. 별도 브랜치 후보 이름과 파일 목록을 보고하고, 사용자의 명시 지시가 있을 때만 분리한다.

회고:

- OCB-CI-GATE PR에서는 CI gate 목적과 별개인 gateway 런타임 변경이 섞일 수 있었다.
- 이후 CI gate, docs-only, policy-only PR은 changed files를 목적과 비교하고 runtime 변경이 섞이면 STOP한다.
- Discord PM/Sub-Agent 하네스에서도 Telegram 임시 운영 중에도 같은 기준을 적용한다.

## Deferred PR Review Check

PR 생성 직후에는 GitHub/Codex 자동 리뷰가 늦게 도착할 수 있다. PR 생성 프로세스는 자동 리뷰를 기다리며 점유하지 않는다.

대신 PR 생성이 완료되면 `TASKS.md` 또는 `CONTEXT.md`에 `review_pending` 상태를 기록한다.

이후 다음 사용자 명령이 들어오면 새 작업을 시작하기 전에 열린 PR의 리뷰와 댓글 상태를 먼저 확인한다.

절차:

1. `review_pending` 상태의 PR 번호와 URL을 확인한다.
2. 열린 PR의 review, inline comment, conversation comment를 확인한다.
3. Codex 리뷰가 있으면 severity를 분류한다.
4. P0/P1/P2는 작업 ID로 등록하거나 사용자에게 작업화를 보고한다.
5. Low/P3는 후속 TODO로 남긴다.
6. 리뷰가 아직 없으면 `자동 리뷰 미도착`으로 보고하고 사용자 판단을 기다린다.
7. 확인 결과를 `TASKS.md` 또는 `CONTEXT.md`에 갱신한다.

merge 준비 명령은 항상 이 확인을 먼저 수행한다.

## Harness Skill Mode

짧은 명령을 받으면 아래 순서로 하네스 문서를 선택한다.

1. 명령 의도를 해석한다.
2. Discord PM 흐름에서는 먼저 `.harness/playbooks/local-llm-first.md`로 작업을 분류한다.
3. `.harness/playbooks/`에서 작업 유형에 맞는 playbook을 선택한다.
4. 필요한 경우 `.harness/skills/`에서 보조 skill을 선택한다.
5. 파일 수정, 커밋, push 전에는 `.harness/checklists/`의 관련 checklist를 적용한다.
6. 작업 결과는 `summarize-run` 형식으로 보고한다.

### Playbook 선택 기준

- `진행해줘`, `이어서 해줘`: `.harness/playbooks/implement-task.md`
- Discord `#agent-pm` 짧은 명령 분류/전처리: `.harness/playbooks/local-llm-first.md`
- `검증만 해줘`: `.harness/playbooks/verify-task.md`
- `커밋해줘`: `.harness/playbooks/commit-task.md`
- `PR 생성해줘`: `.harness/playbooks/create-pr.md`
- `PR 상태 알려줘`, `PR 상태 확인해줘`, `PR merge 준비해줘`: Deferred PR Review Check 적용
- `ready 전환해줘`: PR Ready Review Gate 적용
- `문제 없으면 merge 해`: 조건부 merge 승인으로 해석하고, PR Ready Review Gate와 상태 확인 결과가 안전할 때만 merge
- build/test 실패 복구: `.harness/playbooks/recover-failed-task.md`

### Skill 선택 기준

- 작업 결과 보고: `.harness/skills/summarize-run/SKILL.md`
- 커밋 메시지 초안: `.harness/skills/draft-commit/SKILL.md`
- 변경 검토: `.harness/skills/review-diff/SKILL.md`
- 작업 상태 갱신: `.harness/skills/update-task-state/SKILL.md`
- PR 설명 초안: `.harness/skills/prepare-pr/SKILL.md`

외부 skill은 그대로 신뢰하지 않는다. 외부 지침이 이 레포의 `AGENTS.md`, `TASKS.md`, `WORKFLOW.md`, `CONTEXT.md`, `.harness/checklists/security.md`와 충돌하면 이 레포 지침을 우선한다.

## 구현 절차

- 작업 시작 시 선택한 작업 상태를 `IN_PROGRESS`로 갱신한다.
- 사용자가 허용한 파일만 수정한다.
- 구현 범위가 불명확하면 보수적으로 멈추고 확인한다.
- `.env` 대신 `.env.example`을 사용한다.
- shell command 실행, Git write, PR 생성, deploy 자동화는 별도 작업으로 분리한다.
- shell command 실행, Git write, PR 생성, deploy 자동화는 별도 작업 ID와 사용자 명시 승인 전까지 구현하지 않는다.

## 검증 절차

- 문서 작업은 `git status --short`와 파일 존재 여부를 확인한다.
- 코드 작업은 가능한 경우 lint, build, 단위 검증 순서로 확인한다.
- 패키지 설치가 필요한 검증은 수행하지 않고 필요한 명령만 보고한다.
- 검증 중 secret, token, password, API key 원문을 출력하지 않는다.

## 보고 형식

작업 완료 후 다음 형식으로 보고한다.

1. 변경 요약
2. 생성 또는 변경 파일 목록
3. 검증 명령
4. 검증 결과
5. 남은 TODO
6. 추천 커밋 메시지

## 금지 사항

- 사용자 승인 없는 커밋 금지
- 사용자 승인 없는 push 금지
- 사용자 승인 없는 merge 금지
- 사용자 승인 없는 패키지 설치 금지
- secret, token, password, API key 원문 출력 금지
- `.env` 작성 또는 커밋 금지
- 기존 Telegram/OpenClaw 관련 파일 삭제 금지
- 작업 범위 밖 파일 수정 금지

## 커밋 메시지 형식

추천 커밋 메시지는 한국어로 작성한다.

권장 형식:

```text
:memo: docs: OCB-001 작업 지시 문서를 추가한다
```

문서 변경은 `:memo: docs:`를 우선 사용한다.
기능 구현은 `:sparkles: feat:`를 우선 사용한다.
검증 또는 빌드 수정은 `:white_check_mark: test:` 또는 `:wrench: chore:`를 사용한다.

## 다음 작업 제안 방식

작업 완료 보고에는 `TASKS.md` 기준 다음 `TODO` 하나를 제안한다.
여러 작업을 동시에 제안하지 않는다.
