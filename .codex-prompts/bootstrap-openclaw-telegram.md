# 작업: Windows 기반 OpenClaw + Telegram 자동화 부트스트랩 생성

현재 디렉터리는 openclaw-bootstrap 저장소 루트다.

목표:
Windows 개발자가 OpenClaw Gateway와 Telegram Bot 연결 환경을 자동화할 수 있도록 문서, 설정 템플릿, 스크립트를 생성한다.

중요:
- 실제 Telegram bot token은 생성하지 않는다.
- BotFather 자동화는 하지 않는다.
- token, secret, password를 파일에 실제 값으로 저장하지 않는다.
- git commit, git push는 하지 않는다.
- 외부 패키지를 설치하지 않는다.
- OpenClaw를 실제 실행하지 않는다.
- 지금은 파일과 문서와 스크립트만 생성한다.

생성할 구조:

README.md

scripts/
- 00-check-prereq.bat
- 01-install-openclaw.ps1
- 02-enable-wsl-systemd.ps1
- 03-install-gateway-wsl.ps1
- 04-configure-telegram.bat
- 05-restart-gateway.bat
- 06-status.bat
- 07-create-agent-workspace.bat

config/
- openclaw.telegram.pairing.template.json
- openclaw.telegram.allowlist.template.json
- openclaw.env.example

docs/
- BOTFATHER-STEPS.md
- WINDOWS-SETUP.md
- SECURITY.md
- TROUBLESHOOTING.md
- TELEGRAM-PAIRING.md
- CODEX-USAGE.md

.gitignore

각 파일에는 실제로 사용할 수 있는 내용을 작성한다.
모든 문서와 주석은 한국어로 작성한다.

README.md에는 다음을 포함한다.
- 이 저장소의 목적
- 자동화 가능한 것과 수동으로 해야 하는 것
- 빠른 시작 순서
- Windows CMD 기준 명령어
- WSL2 권장 이유
- Telegram token 발급은 사용자가 직접 해야 한다는 설명
- push, merge, deploy 자동화는 기본적으로 금지한다는 보안 원칙

.gitignore에는 다음을 포함한다.
- .env
- *.env
- openclaw.env
- token.txt
- secrets/
- logs/
- node_modules/
- .openclaw-local/

scripts/00-check-prereq.bat:
- node, npm, git, powershell, wsl, codex, openclaw 존재 여부를 확인한다.
- 없는 항목은 설치 안내만 출력한다.
- 설치 자체는 하지 않는다.

scripts/01-install-openclaw.ps1:
- Node/npm 존재 여부를 확인한다.
- npm으로 openclaw@latest 설치를 시도하는 스크립트다.
- 설치 후 openclaw --version, openclaw doctor 실행을 시도한다.
- 실패 시 WSL2 설치 경로를 안내한다.

scripts/02-enable-wsl-systemd.ps1:
- wsl --list --verbose 출력
- 사용자가 distro 이름을 입력하게 한다.
- 해당 WSL distro에 /etc/wsl.conf의 [boot] systemd=true 설정을 넣는 명령을 실행한다.
- wsl --shutdown 안내 또는 실행

scripts/03-install-gateway-wsl.ps1:
- WSL 내부에서 OpenClaw 설치와 Gateway service 설치를 돕는다.
- distro 이름을 입력받는다.
- WSL 안에서 npm install -g openclaw@latest, openclaw onboard --install-daemon 또는 openclaw gateway install 흐름을 안내/실행한다.
- interactive onboarding이 필요한 경우 사용자가 직접 입력해야 함을 명시한다.

scripts/04-configure-telegram.bat:
- Telegram bot token을 사용자에게 입력받는다.
- 입력값을 화면에 다시 출력하지 않는다.
- dmPolicy를 pairing 또는 allowlist 중 선택하게 한다.
- allowlist 선택 시 Telegram numeric user id를 입력받는다.
- %USERPROFILE%\.openclaw\openclaw.json 파일을 생성하거나 갱신한다.
- 기존 openclaw.json이 있으면 .bak 백업을 만든다.
- token을 git 저장소 내부에 저장하지 않는다.

scripts/05-restart-gateway.bat:
- OpenClaw Gateway 재시작을 시도한다.
- native Windows 방식과 WSL 방식 모두 안내한다.
- 마지막에 status를 보여준다.

scripts/06-status.bat:
- openclaw --version
- openclaw doctor
- openclaw gateway status
- wsl --list --verbose
- token 값은 출력하지 않는다.

scripts/07-create-agent-workspace.bat:
- agent 이름 입력
- workspace 경로 입력
- openclaw agents add 명령 예시 실행 또는 출력
- push/merge/deploy 승인 금지 원칙 출력

config/openclaw.telegram.pairing.template.json:
- pairing 방식 예시 JSON을 작성한다.

config/openclaw.telegram.allowlist.template.json:
- allowlist 방식 예시 JSON을 작성한다.

config/openclaw.env.example:
- 환경변수 예시를 작성한다.
- 실제 token 값은 넣지 않는다.

docs/BOTFATHER-STEPS.md:
- @BotFather에서 /newbot으로 bot을 만드는 수동 절차를 자세히 설명한다.
- token을 git에 커밋하지 말라고 강조한다.
- bot에게 /start 보내는 절차를 포함한다.

docs/WINDOWS-SETUP.md:
- Windows native와 WSL2 경로를 비교한다.
- WSL2 권장으로 작성한다.

docs/SECURITY.md:
- Gateway 공개 노출 금지
- Telegram dmPolicy pairing 또는 allowlist 사용
- token 커밋 금지
- 자동 push/merge/deploy 금지
- secret 읽기 금지
- AI agent에게 무제한 권한 부여 금지
- 위험한 sandbox 우회 옵션 사용 금지

docs/TROUBLESHOOTING.md:
- openclaw 명령 없음
- npm 권한 문제
- WSL systemd 안 됨
- Gateway status 실패
- Telegram 응답 없음
- BotFather token 재발급
- Windows 절전 문제
- 방화벽/포트 문제

docs/TELEGRAM-PAIRING.md:
- pairing과 allowlist 차이를 설명한다.
- 처음에는 pairing, 안정화 후 allowlist를 추천한다.

docs/CODEX-USAGE.md:
- Codex CLI로 이 부트스트랩을 생성/수정/리뷰하는 방법을 작성한다.
- codex exec 사용 예시를 포함한다.

완료 후 응답:
1. 생성한 파일 목록
2. 사용 순서
3. 사용자가 직접 해야 하는 BotFather 단계
4. 자동화로 처리되는 단계
5. 보안상 주의점
6. 추천 커밋 메시지