@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem OpenClaw Gateway 재시작을 시도한다.
rem Windows native와 WSL 경로를 모두 안내한다.

echo.
echo [OpenClaw Gateway] 재시작
echo.

where openclaw >nul 2>nul
if errorlevel 1 (
  echo [안내] Windows native openclaw 명령을 찾지 못했습니다.
) else (
  echo [실행] openclaw gateway restart
  openclaw gateway restart
  if errorlevel 1 (
    echo [주의] Windows native gateway restart가 실패했습니다.
  )
)

echo.
echo WSL Gateway를 재시작하려면 distro 이름을 입력하세요.
echo 건너뛰려면 Enter를 누르세요.
set /p "DISTRO=WSL distro 이름: "

if not "%DISTRO%"=="" (
  where wsl >nul 2>nul
  if errorlevel 1 (
    echo [주의] wsl 명령을 찾지 못했습니다.
  ) else (
    echo [실행] WSL 내부 Gateway 재시작
    wsl -d "%DISTRO%" -- bash -lc "openclaw gateway restart || systemctl --user restart openclaw-gateway || sudo systemctl restart openclaw-gateway; openclaw gateway status || true"
  )
)

echo.
echo [상태 확인]
call "%~dp006-status.bat"
