# OpenClaw Telegram Bootstrap

이 저장소는 Windows 개발자가 OpenClaw Gateway와 Telegram Bot 연결 환경을 준비할 수 있도록 문서, 설정 템플릿, 실행 스크립트를 모아 둔 부트스트랩 저장소다.

이 저장소는 실제 Telegram Bot token을 발급하지 않고, BotFather를 자동화하지 않으며, OpenClaw를 지금 실행하지 않는다. 사용자는 문서를 따라 수동으로 token을 발급하고, 필요할 때만 스크립트를 실행한다.

## OCB-001 Discord + Ollama Local Agent Gateway

이 브랜치에서는 기존 Telegram Bootstrap 역할을 유지하면서 Discord + Ollama 기반 로컬 Agent Gateway 초안을 추가한다.

Gateway 위치:

```text
gateway/discord-agent-gateway
```

1차 MVP 목표:

- Discord에서 `/aw ask-local` 입력
- Ollama OpenAI-compatible endpoint로 로컬 LLM 호출
- Discord에 로컬 LLM 응답 출력
- Discord에서 `/aw status` 입력
- Gateway, Ollama, Agent Workbench 상태 확인

보수적 제한:

- shell command 실행 기능은 구현하지 않는다.
- Git write 자동화는 구현하지 않는다.
- PR/deploy 자동화는 구현하지 않는다.
- 실제 secret, token, password, API key 원문은 저장하거나 출력하지 않는다.
- `.env`는 커밋하지 않고 `.env.example`만 예시로 유지한다.

## OCB-001 하네스 짧은 명령

이 브랜치에는 Telegram에서 짧은 명령으로 작업을 이어가기 위한 하네스 문서가 포함되어 있다.

예시:

```text
OCB-001 PR 초안 작성해줘
OCB-001 PR 생성해줘
OCB-001 PR 상태 알려줘
```

PR 생성 요청은 `.harness/playbooks/create-pr.md`와 `.harness/checklists/before-pr.md`를 기준으로 처리한다. PR 생성 전에는 브랜치, working tree, upstream, 최신 커밋, secret 포함 여부, build/test 결과를 확인한다. `gh`가 없거나 인증되지 않았으면 PR 생성 URL과 제목/본문만 출력하고 멈춘다.

## 자동화 가능한 것

- Windows에서 필요한 명령어가 설치되어 있는지 점검
- npm 기반 OpenClaw CLI 설치 시도
- WSL2 systemd 설정 보조
- WSL 내부 OpenClaw Gateway 설치 흐름 보조
- 사용자 프로필의 `%USERPROFILE%\.openclaw\openclaw.json` 생성 또는 갱신
- Gateway 재시작과 상태 확인 명령 실행
- agent workspace 등록 명령 안내 또는 실행

## 수동으로 해야 하는 것

- Telegram에서 `@BotFather`를 열고 `/newbot`으로 bot 생성
- BotFather가 발급한 token을 안전한 위치에 보관
- 생성한 bot에게 Telegram에서 `/start` 메시지 전송
- OpenClaw onboarding 중 필요한 계정, 권한, pairing 입력
- 조직 정책에 맞는 agent 권한 검토
- push, merge, deploy 같은 위험 작업은 사람이 직접 승인

## 빠른 시작

Windows CMD에서 저장소 루트로 이동한 뒤 아래 순서대로 실행한다.

```bat
scripts\00-check-prereq.bat
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\01-install-openclaw.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\02-enable-wsl-systemd.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\03-install-gateway-wsl.ps1
scripts\04-configure-telegram.bat
scripts\05-restart-gateway.bat
scripts\06-status.bat
```

agent workspace를 등록해야 한다면 마지막에 실행한다.

```bat
scripts\07-create-agent-workspace.bat
```

## Discord Gateway 로컬 실행

Windows CMD에서 저장소 루트 기준으로 실행한다.

빌드 확인:

```bat
scripts\08-build-discord-agent-gateway.bat
```

로컬 실행:

```bat
scripts\09-start-discord-agent-gateway.bat
```

실행 전 `gateway\discord-agent-gateway\.env.example`을 참고해 로컬 환경 변수를 준비한다. 실제 `.env` 파일은 git에 커밋하지 않는다.

Ollama 기본 설정:

```text
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_DEFAULT_MODEL=qwen2.5-coder:3b
```

## WSL2 권장 이유

Windows native 경로도 가능하지만 Gateway는 장시간 떠 있어야 하는 서비스 성격이 강하다. WSL2는 Linux service, systemd, 파일 권한, 네트워크 도구 사용이 Windows native보다 예측 가능하다. 특히 `openclaw onboard --install-daemon` 또는 Gateway service 설치가 Linux 기준으로 설계되어 있다면 WSL2 경로가 더 안정적이다.

## Telegram token 원칙

Telegram Bot token은 사용자가 `@BotFather`에서 직접 발급해야 한다. 이 저장소에는 실제 token을 저장하지 않는다. `scripts\04-configure-telegram.bat`는 token을 화면에 다시 출력하지 않고 `%USERPROFILE%\.openclaw\openclaw.json`에만 기록한다. 이 경로는 git 저장소 밖이다.

## 보안 원칙

- Gateway를 공용 인터넷에 무방비로 노출하지 않는다.
- Telegram `dmPolicy`는 처음에는 `pairing`, 안정화 후에는 `allowlist`를 권장한다.
- token, secret, password를 git에 커밋하지 않는다.
- AI agent에게 무제한 파일, 네트워크, 배포 권한을 주지 않는다.
- push, merge, deploy 자동화는 기본적으로 금지한다.
- 위험한 sandbox 우회 옵션은 사용하지 않는다.

자세한 절차는 `docs/` 문서를 참고한다.
