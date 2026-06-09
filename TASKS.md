# OCB-001 작업 레지스트리

## 현재 Epic

OCB-001 Discord + Ollama Local Agent Gateway

## 상태 규칙

각 작업 상태는 `TODO`, `IN_PROGRESS`, `DONE` 중 하나로 관리한다.

사용자가 작업 ID만 보내면 에이전트는 해당 작업의 `Status`, `Scope`, `Validation`, `Forbidden`을 먼저 확인한다.

작업 ID가 이 파일에 없으면 임의로 진행하지 말고 확인 질문을 한다.

작업 상태가 `DONE`이면 재작업하지 말고 확인 질문을 한다.

## 작업 요약

| ID | Status | 설명 |
| --- | --- | --- |
| OCB-001-A | DONE | 에이전트 작업 지시 파일 생성 |
| OCB-001-B | DONE | Discord Agent Gateway scaffold 생성 |
| OCB-001-C | DONE | `/aw ask-local` 구현 |
| OCB-001-D | DONE | `/aw status` 구현 |
| OCB-001-E | DONE | README 및 실행 스크립트 정리 |
| OCB-001-F | DONE | npm build 검증 |
| OCB-001-HARNESS | DONE | 짧은 Telegram 명령을 위한 하네스 운영 가이드라인 정리 |
| OCB-001-SUPERPOWERS | DONE | 하네스 skill/playbook/checklist 구조 추가 |
| OCB-001-DISCORD-RUNTIME | DONE | Discord slash command 등록 스크립트 보완 |
| OCB-001-ASKLOCAL-TIMEOUT | DONE | ask-local timeout, 진행 로그, 오류 응답 보강 |
| OCB-001-MODEL-ROUTING | DONE | 기본 로컬 LLM 모델 정책과 ask-local 모델 선택 옵션 정리 |
| OCB-001-PR-HARNESS | DONE | PR 생성 절차 하네스화 |
| OCB-001-CODEX-REVIEW-01 | DONE | Codex Review `/aw status` 응답 분할 피드백 반영 |
| OCB-001-AUTO-REVIEW-HARNESS | DONE | Deferred PR Review Check 정책 추가 |

## OCB-001-A: 에이전트 작업 지시 파일 생성

Status: DONE

Scope:
- `AGENTS.md` 작성
- `TASKS.md` 작성
- `WORKFLOW.md` 작성
- `CONTEXT.md` 작성
- 짧은 Telegram 지시를 위한 기본 문맥 제공

Validation:
- `git status --short`
- `ls -la AGENTS.md TASKS.md WORKFLOW.md CONTEXT.md`

Forbidden:
- 코드 구현 금지
- 커밋 금지
- push 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-B: Discord Agent Gateway scaffold 생성

Status: DONE

Scope:
- `gateway/discord-agent-gateway` 패키지 scaffold 생성
- Discord slash command 진입점 준비
- Ollama 클라이언트 자리 준비
- Agent Workbench 상태 확인 클라이언트 자리 준비
- `.env.example` 작성

Validation:
- `cd gateway/discord-agent-gateway && npm install && npm run build`

Forbidden:
- `.env` 생성 금지
- shell command 실행 기능 구현 금지
- Git write 자동화 금지
- PR/deploy 자동화 금지
- 커밋 금지
- push 금지

## OCB-001-C: /aw ask-local 구현

Status: DONE

Scope:
- `/aw ask-local prompt:<text>` 처리
- Ollama OpenAI-compatible API 호출
- Discord 응답 분할 처리
- Ollama 미실행 또는 모델 미설정 시 친절한 오류 메시지
- local LLM 역할을 문서화, 요약, 커밋 메시지, 반복 작업 보조 기준으로 제한

Validation:
- `cd gateway/discord-agent-gateway && npm run build`

Forbidden:
- shell command 실행 기능 구현 금지
- Git write 자동화 금지
- PR/deploy 자동화 금지
- 커밋 금지
- push 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-D: /aw status 구현

Status: DONE

Scope:
- Gateway 상태 OK 표시
- Ollama 모델 목록 조회
- 기본 모델 존재 여부 확인
- Agent Workbench API 상태 확인
- 실패 항목은 WARN 처리

Validation:
- `cd gateway/discord-agent-gateway && npm run build`

Forbidden:
- shell command 실행 기능 구현 금지
- Git write 자동화 금지
- PR/deploy 자동화 금지
- 커밋 금지
- push 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-E: README 및 실행 스크립트 정리

Status: DONE

Scope:
- Discord Gateway 실행 절차 문서화
- Ollama 설정 절차 문서화
- `.env.example` 기준 환경 변수 설명
- 로컬 실행 스크립트 또는 명령 안내 정리

Validation:
- `git status --short`
- `cd gateway/discord-agent-gateway && npm run build`

Forbidden:
- `.env` 작성 금지
- secret/token/password/API key 원문 출력 금지
- deploy 자동화 금지
- 커밋 금지
- push 금지

## OCB-001-F: npm build 검증

Status: DONE

Scope:
- `gateway/discord-agent-gateway` 빌드 검증
- 검증 결과 문서 또는 작업 상태 정리
- 실패 시 원인 요약

Validation:
- `cd gateway/discord-agent-gateway && npm run build`

Forbidden:
- 기능 추가 금지
- shell command 실행 기능 구현 금지
- Git write 자동화 금지
- PR/deploy 자동화 금지
- 커밋 금지
- push 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-SUPERPOWERS: 하네스 skill/playbook/checklist 구조 추가

Status: DONE

Scope:
- `.harness/README.md` 작성
- `.harness/skills/*/SKILL.md` 작성
- `.harness/playbooks/*.md` 작성
- `.harness/checklists/*.md` 작성
- Short Command Mode를 skill/playbook/checklist 구조와 연결
- `AGENTS.md`, `WORKFLOW.md`, `TASKS.md`, `CONTEXT.md` 보강

Validation:
- `git status --short`
- `find .harness -maxdepth 3 -type f | sort`

Forbidden:
- 코드 구현 금지
- 커밋 금지
- push 금지
- 패키지 설치 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-DISCORD-RUNTIME: Discord slash command 등록 스크립트 보완

Status: DONE

Scope:
- `package.json`에 `register-commands` script 추가
- `/aw status`, `/aw ask-local` slash command를 `DISCORD_GUILD_ID` 기준으로 등록
- 기존 `src/discord/commands.ts` 구조 재사용
- 필요한 register script 파일 추가
- `.env`의 `DISCORD_BOT_TOKEN`, `DISCORD_CLIENT_ID`, `DISCORD_GUILD_ID` 사용
- token 값 출력 금지

Validation:
- `cd gateway/discord-agent-gateway && npm run build`
- `package.json` scripts에 `register-commands` 존재 확인
- Discord `/aw status` 런타임 성공 확인
- Discord `/aw ask-local` 런타임 성공 확인
- `qwen2.5-coder:3b` 응답 성공 확인
- `/aw ask-local` 응답 로그 기준 `durationMs=11452` 확인
- `qwen3:8b`는 slow/high-quality 옵션으로 유지

Forbidden:
- token 값 출력 금지
- 커밋 금지
- push 금지
- deploy 자동화 금지

## OCB-001-ASKLOCAL-TIMEOUT: ask-local timeout, 진행 로그, 오류 응답 보강

Status: DONE

Scope:
- Ollama 요청 시작/성공/실패 로그 출력
- `/aw ask-local` Ollama 요청에 60초 timeout 추가
- timeout 시 Discord에 친절한 오류 메시지 응답
- deprecated ephemeral 경고 제거
- `npm run build` 검증

Validation:
- `cd gateway/discord-agent-gateway && npm run build`

Forbidden:
- 커밋 금지
- push 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-MODEL-ROUTING: 기본 로컬 LLM 모델 정책과 ask-local 모델 선택 옵션 정리

Status: DONE

Scope:
- 기본 모델 권장값을 `qwen2.5-coder:3b`로 변경
- `.env.example`, README, `CONTEXT.md`, `TASKS.md`에 모델 정책 반영
- `qwen3:8b`는 slow/high-quality 옵션으로 문서화
- `/aw status`에서 현재 기본 모델과 사용 가능한 모델 목록 표시 유지
- `/aw ask-local`에 optional `model` 옵션 추가

Validation:
- `cd gateway/discord-agent-gateway && npm run build`

Forbidden:
- shell command 실행 기능 구현 금지
- Git write 자동화 금지
- PR/deploy 자동화 금지
- 커밋 금지
- push 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-PR-HARNESS: PR 생성 절차 하네스화

Status: DONE

Scope:
- `OCB-001 PR 초안 작성해줘`, `OCB-001 PR 생성해줘`, `OCB-001 PR 상태 알려줘` 짧은 명령 해석 규칙 추가
- `.harness/playbooks/create-pr.md` 작성
- `.harness/checklists/before-pr.md` 작성
- `prepare-pr` skill을 PR 초안과 실제 PR 생성 준비에 모두 사용할 수 있도록 보강
- PR 생성 전 브랜치, working tree, upstream, 최신 커밋, secret 포함 위험, build/test 검증 결과 확인 절차 문서화
- `gh pr create` 우선 지원과 fallback 절차 문서화

Validation:
- `git status --short`
- `find .harness -maxdepth 3 -type f | sort`

Forbidden:
- 실제 PR 생성 금지
- push 금지
- merge 금지
- deploy 자동화 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-CODEX-REVIEW-01: Codex Review `/aw status` 응답 분할 피드백 반영

Status: DONE

Scope:
- PR #1 Codex Review의 `/aw status` Discord 메시지 길이 제한 피드백 반영
- `/aw status` 응답도 `sendChunkedReply`를 사용하도록 수정
- 모델 목록이 길어져도 Discord 2000자 제한에 걸리지 않도록 응답 분할 경로 재사용

Validation:
- `cd gateway/discord-agent-gateway && npm run build`

Forbidden:
- shell command 실행 기능 구현 금지
- Git write 자동화 금지
- PR/deploy 자동화 금지
- 커밋 금지
- push 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-AUTO-REVIEW-HARNESS: Deferred PR Review Check 정책 추가

Status: DONE

Scope:
- PR 생성 직후 자동 리뷰를 기다리며 프로세스를 점유하지 않는 정책 문서화
- PR 생성 완료 시 `review_pending` 상태 기록 규칙 추가
- 다음 사용자 명령 시작 전 열린 PR 리뷰/댓글 상태를 먼저 확인하는 절차 추가
- Codex 리뷰 severity 중 P0/P1/P2만 작업화하고 Low/P3는 후속 TODO로 남기는 규칙 추가
- merge 준비 명령은 pending review 확인을 먼저 수행하도록 문서화

Review Pending:
- PR #1: https://github.com/V4N1LLA/openclaw-bootstrap/pull/1
- State: review_pending
- Next check: 다음 사용자 명령 시작 전 PR review/comment 상태 확인

Validation:
- `git status --short`
- `rg -n "review_pending|Deferred PR Review Check|P0/P1/P2|Low/P3" WORKFLOW.md TASKS.md CONTEXT.md .harness/playbooks/create-pr.md .harness/checklists/before-pr.md`

Forbidden:
- 실제 PR 생성 금지
- push 금지
- merge 금지
- deploy 자동화 금지
- secret/token/password/API key 원문 출력 금지

## OCB-001-HARNESS: 하네스 운영 가이드라인 정리

Status: DONE

Scope:
- 짧은 Telegram 명령 해석 규칙 문서화
- 작업 ID 기반 진행, 검증만, 상태, 이어서, 요약 명령 절차 문서화
- `TASKS.md`를 작업 레지스트리 형식으로 정리
- `AGENTS.md`와 `WORKFLOW.md`의 자동 적용 규칙 보강

Validation:
- `git status --short`
- `sed -n '1,260p' AGENTS.md`
- `sed -n '1,320p' WORKFLOW.md`
- `sed -n '1,360p' TASKS.md`

Forbidden:
- 코드 구현 금지
- 커밋 금지
- push 금지
- 패키지 설치 금지
- secret/token/password/API key 원문 출력 금지

## 다음 작업

다음 작업은 아직 등록되지 않았다.
