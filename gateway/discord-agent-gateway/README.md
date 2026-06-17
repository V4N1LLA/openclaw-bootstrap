# Discord Agent Gateway

Discord + Ollama 기반 로컬 Agent Gateway scaffold다.

이 패키지는 OCB-001의 1차 MVP를 위한 시작점이며, 아직 shell command 실행, Git write, PR 생성, deploy 자동화는 구현하지 않는다.

## 목표

- Discord slash command 진입점 준비
- Ollama 로컬 LLM 연결 준비
- Agent Workbench 상태 확인 연결 준비
- secret 원문 출력 없이 로컬 환경 변수로만 설정 처리

## 설정

`.env.example`을 참고해 로컬 환경 변수를 설정한다.

`.env`는 커밋하지 않는다.

환경 변수:

| 이름 | 설명 | 예시 |
| --- | --- | --- |
| `DISCORD_BOT_TOKEN` | Discord bot token. 원문을 문서나 로그에 출력하지 않는다. | 비워 둠 |
| `DISCORD_CLIENT_ID` | Discord application client id | 비워 둠 |
| `DISCORD_GUILD_ID` | 개발 중 명령을 등록할 Discord guild id | 비워 둠 |
| `DISCORD_PM_CHANNEL_ID` | `/aw pm`을 허용할 Discord PM 채널 id. 비워 두면 채널 guard는 경고만 표시한다. | 비워 둠 |
| `DISCORD_AGENT_DEV_LOCAL_CHANNEL_ID` | 코드/런타임 작업 후보를 받을 `#agent-dev-local` 채널 id | 비워 둠 |
| `DISCORD_AGENT_DOCS_LOCAL_CHANNEL_ID` | 문서/정책 작업 후보를 받을 `#agent-docs-local` 채널 id | 비워 둠 |
| `DISCORD_AGENT_REVIEW_CHANNEL_ID` | PR review/comment/thread 작업 후보를 받을 `#agent-review` 채널 id | 비워 둠 |
| `DISCORD_AGENT_OPS_CHANNEL_ID` | CRITICAL 승인/운영 작업 후보를 받을 `#agent-ops` 채널 id | 비워 둠 |
| `DISCORD_AGENT_LOG_CHANNEL_ID` | LOW/STOP 또는 감사 로그 후보를 받을 `#agent-log` 채널 id | 비워 둠 |
| `OLLAMA_BASE_URL` | Ollama OpenAI-compatible endpoint | `http://localhost:11434/v1` |
| `OLLAMA_DEFAULT_MODEL` | `/aw ask-local`과 `/aw status`에서 사용할 기본 모델 | `qwen2.5-coder:3b` |
| `AGENT_WORKBENCH_BASE_URL` | Agent Workbench 로컬 API 기준 URL | `http://127.0.0.1:3000` |

Ollama 준비:

```sh
ollama pull qwen2.5-coder:3b
ollama pull qwen3:8b
```

Windows에서 Ollama가 실행 중이면 WSL/Node 프로세스에서 `http://localhost:11434/v1` 접근이 가능한지 확인한다.

## 모델 정책

기본 모델은 빠른 Discord 응답을 우선해 `qwen2.5-coder:3b`를 권장한다.

`qwen3:8b`는 느리지만 더 높은 품질이 필요할 때 선택하는 slow/high-quality 옵션이다.

Local LLM은 실제 개발 실행자가 아니라 요약, 문서화, 커밋 메시지 초안, 반복 작업 보조 용도로 사용한다.

## 명령

```sh
npm install
npm run build
npm run register-commands
npm run start
```

저장소 루트에서 Windows CMD로 실행하려면 다음 스크립트를 사용할 수 있다.

```bat
scripts\08-build-discord-agent-gateway.bat
scripts\09-start-discord-agent-gateway.bat
```

이 스크립트는 로컬 빌드와 실행만 보조한다. deploy, Git write, PR 생성 자동화는 수행하지 않는다.

## Slash command 등록

`/aw ask-local`, `/aw status`, `/aw pm`을 개발용 Discord guild에 등록하려면 환경 변수를 준비한 뒤 아래 명령을 실행한다.

```sh
npm run register-commands
```

필수 환경 변수:

- `DISCORD_BOT_TOKEN`
- `DISCORD_CLIENT_ID`
- `DISCORD_GUILD_ID`

등록 스크립트는 token 값을 출력하지 않는다.

## Discord 명령

### `/aw ask-local prompt:<text> [model:<model>]`

로컬 Ollama 모델에 질문을 전달하고 Discord에 응답을 출력한다.

`model`을 생략하면 `OLLAMA_DEFAULT_MODEL`을 사용한다.

예:

```text
/aw ask-local prompt:README 변경 요약해줘
/aw ask-local prompt:긴 문서 요약해줘 model:qwen3:8b
```

권장 용도:

- 문서화 초안
- 요약
- 커밋 메시지 초안
- 반복 작업 보조

### `/aw status`

다음 상태를 확인한다.

- Gateway 상태
- Ollama 모델 목록
- 기본 모델 존재 여부
- Agent Workbench API 상태

실패 항목은 `WARN`으로 표시한다.

### `/aw pm command:<text>`

Discord PM 명령을 접수하고 runtime preflight guard 결과를 반환한다.

이 명령은 PM command intake 전용이다. shell command 실행, Git write, PR 생성, deploy, Codex 또는 Sub-Agent 호출은 수행하지 않는다.

Preflight guard는 다음을 확인한다.

- `DISCORD_PM_CHANNEL_ID`가 설정된 경우 요청 채널 일치 여부
- 빈 명령 또는 과도하게 긴 명령
- secret/token/password/API key/raw secret 처리 요청
- force push, deploy, merge, push 등 명시 승인이 필요한 critical 요청
- 작업 분류: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`, `STOP`

Sub-Agent routing은 preflight 결과에 따라 work card 초안과 대상 채널을 계산한다.

대상 후보:

- `#agent-dev-local`
- `#agent-docs-local`
- `#agent-review`
- `#agent-ops`
- `#agent-log`

채널 ID 환경 변수가 없으면 채널 전송 없이 `setup-needed` 상태와 누락된 대상 채널 설정을 안내한다.

Dispatch 동작:

- `ready`: 설정된 대상 Sub-Agent 채널에 work card 1건을 전송한다.
- `stopped`: 실행 후보 채널로 보내지 않고 `#agent-log`에 audit card 1건만 전송한다.
- `setup-needed`: 채널 전송 없이 누락된 채널 설정을 안내한다.
- `CRITICAL`: `#agent-ops`에 승인 필요 card 1건만 전송하고 실행하지 않는다.
- 채널 접근 실패나 전송 실패는 안전하게 `stopped`로 보고한다.

PM 응답에는 대상 채널, dispatch 결과, 채널 전송 여부, 실행 시작 여부가 표시된다.

이 단계는 Codex 실행, Local LLM 실행, shell/Git write, Sub-Agent 실제 작업 수행, fan-in 결과 회수, 자동 커밋/PR 생성, 재시도 스케줄러를 수행하지 않는다.

예:

```text
/aw pm command:OCB-002-A 등록하고 진행해줘
```

## 현재 scaffold 범위

- Gateway 설정 로더
- Discord 클라이언트 생성
- `/aw ask-local`, `/aw status`, `/aw pm` 라우팅
- Ollama OpenAI-compatible chat completions 클라이언트
- Agent Workbench health 클라이언트 자리
- Discord PM command intake와 runtime preflight guard
- Discord Sub-Agent routing과 work/audit/approval card dispatch

## 로컬 LLM 역할

`/aw ask-local`은 로컬 Ollama 모델을 문서화, 요약, 커밋 메시지 초안, 반복 작업 보조 용도로 사용한다.

Gateway는 shell command 실행, Git write, PR 생성, deploy 자동화를 수행하지 않는다.
