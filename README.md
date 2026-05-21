# OpenClaw Telegram Bootstrap

이 저장소는 Windows 개발자가 OpenClaw Gateway와 Telegram Bot 연결 환경을 준비할 수 있도록 문서, 설정 템플릿, 실행 스크립트를 모아 둔 부트스트랩 저장소다.

이 저장소는 실제 Telegram Bot token을 발급하지 않고, BotFather를 자동화하지 않으며, OpenClaw를 지금 실행하지 않는다. 사용자는 문서를 따라 수동으로 token을 발급하고, 필요할 때만 스크립트를 실행한다.

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
