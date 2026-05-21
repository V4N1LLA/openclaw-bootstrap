# Windows 설치 경로

OpenClaw Gateway는 Windows native 또는 WSL2에서 준비할 수 있다. 이 저장소는 두 경로를 모두 다루지만, 장시간 실행되는 Gateway service에는 WSL2를 권장한다.

## Windows native

장점:

- Windows CMD와 PowerShell에서 바로 실행할 수 있다.
- 별도 Linux distro 관리가 필요 없다.
- 간단한 CLI 테스트에 빠르다.

주의점:

- npm 전역 설치 권한 문제가 발생할 수 있다.
- service 등록 방식이 OpenClaw 버전에 따라 달라질 수 있다.
- 장시간 실행 프로세스 관리가 WSL2보다 번거로울 수 있다.

실행:

```bat
scripts\00-check-prereq.bat
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\01-install-openclaw.ps1
```

## WSL2 권장 경로

장점:

- Linux service와 systemd를 사용할 수 있다.
- Gateway daemon 설치 흐름이 더 자연스럽다.
- 파일 권한과 네트워크 도구가 Linux 문서와 잘 맞는다.
- Windows 업데이트나 절전 후에도 복구 절차가 비교적 명확하다.

준비:

```bat
wsl --install
wsl --list --verbose
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\02-enable-wsl-systemd.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\03-install-gateway-wsl.ps1
```

systemd 설정을 변경한 뒤에는 WSL을 재시작해야 한다.

```bat
wsl --shutdown
```

## 공통 후속 작업

BotFather에서 token을 발급한 뒤 Telegram 설정을 적용한다.

```bat
scripts\04-configure-telegram.bat
scripts\05-restart-gateway.bat
scripts\06-status.bat
```
