# 보안 원칙

OpenClaw Gateway와 Telegram Bot은 개발 환경에 접근하는 통로가 될 수 있다. 기본값은 편의보다 제한을 우선한다.

## Gateway 노출 금지

- Gateway를 공용 인터넷에 직접 노출하지 않는다.
- 필요한 경우 VPN, SSH tunnel, 방화벽 allowlist 같은 보호 계층을 둔다.
- 개발 PC의 임시 포트를 외부에 열기 전에 접근 주체와 로그 정책을 확인한다.

## Telegram dmPolicy

- 처음 연결할 때는 `pairing`을 사용한다.
- 안정화 후에는 `allowlist`로 전환해 허용된 Telegram numeric user id만 접근하게 한다.
- 개인 계정과 업무 계정을 혼용하지 않는다.

## secret 관리

- token, secret, password를 git에 커밋하지 않는다.
- secret 값을 로그에 출력하지 않는다.
- AI agent에게 secret 파일 읽기 권한을 기본값으로 주지 않는다.
- token이 노출되면 즉시 재발급하고 기존 token을 폐기한다.

## 자동화 제한

- push, merge, deploy는 기본적으로 자동화하지 않는다.
- agent가 코드를 수정하더라도 최종 반영은 사람이 검토한다.
- 배포 권한이 있는 인증 정보는 local agent workspace에서 분리한다.

## sandbox 원칙

- 위험한 sandbox 우회 옵션을 기본값으로 사용하지 않는다.
- workspace 범위는 작업에 필요한 디렉터리로 제한한다.
- OS 전체, 사용자 홈 전체, cloud credential 디렉터리를 무제한으로 열지 않는다.

## 로그와 백업

- `logs/`, `secrets/`, `.env`, `openclaw.env`는 `.gitignore` 대상이다.
- `scripts\04-configure-telegram.bat`는 기존 `openclaw.json`을 백업하지만, 백업 파일도 사용자 프로필 아래에 둔다.
