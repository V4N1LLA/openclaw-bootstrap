# 문제 해결

## openclaw 명령 없음

증상:

```bat
'openclaw' is not recognized
```

조치:

- 새 터미널을 열어 PATH를 새로 반영한다.
- Windows native 설치를 다시 시도한다.
- WSL2 내부에서 설치했는지 Windows에 설치했는지 구분한다.

```bat
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\01-install-openclaw.ps1
```

## npm 권한 문제

증상:

- `EACCES`
- 전역 설치 실패
- npm prefix 권한 오류

조치:

- 관리자 권한 터미널로 무조건 해결하려 하지 말고 WSL2 경로를 우선 검토한다.
- Windows native가 필요하면 npm global prefix를 사용자 디렉터리로 바꾼다.
- 회사 장비라면 보안 정책에 맞는 설치 경로를 사용한다.

## WSL systemd 안 됨

증상:

- `systemctl`이 동작하지 않음
- daemon 설치가 실패함

조치:

```bat
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\02-enable-wsl-systemd.ps1
wsl --shutdown
```

이후 distro를 다시 열고 확인한다.

```bash
systemctl --version
```

## Gateway status 실패

조치:

- `openclaw doctor` 결과를 확인한다.
- Windows native와 WSL2 중 어디에 Gateway를 설치했는지 확인한다.
- WSL2를 사용한다면 distro 이름이 맞는지 확인한다.

```bat
scripts\06-status.bat
```

## Telegram 응답 없음

조치:

- bot에게 `/start`를 보냈는지 확인한다.
- BotFather token이 현재 설정에 들어간 token과 같은지 확인한다.
- `dmPolicy`가 `allowlist`이면 Telegram numeric user id가 정확한지 확인한다.
- Gateway가 실행 중인지 확인한다.

## BotFather token 재발급

token이 노출되었거나 의심되면 BotFather에서 재발급한다.

1. `@BotFather` 대화 열기
2. `/mybots`
3. 대상 bot 선택
4. `API Token`
5. `Revoke current token`
6. 새 token을 `scripts\04-configure-telegram.bat`로 다시 입력

## Windows 절전 문제

증상:

- 절전 후 Gateway가 응답하지 않음
- WSL 네트워크가 끊김

조치:

- 개발 중에는 절전 시간을 늘린다.
- 절전 복귀 후 `scripts\05-restart-gateway.bat`를 실행한다.
- 장시간 운영이 필요하면 개인 PC 대신 관리되는 서버를 사용한다.

## 방화벽과 포트 문제

조치:

- Gateway가 어떤 host와 port에 bind되는지 확인한다.
- 공용 네트워크에서 포트를 열지 않는다.
- 필요한 경우 Windows 방화벽 inbound rule을 최소 범위로 제한한다.
