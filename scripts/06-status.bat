@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem OpenClaw와 WSL 상태를 확인한다.
rem token, secret, password 값은 출력하지 않는다.

echo.
echo [OpenClaw 상태 확인]
echo.

where openclaw >nul 2>nul
if errorlevel 1 (
  echo [누락] Windows native openclaw 명령을 찾지 못했습니다.
) else (
  echo.
  echo [실행] openclaw --version
  openclaw --version

  echo.
  echo [실행] openclaw doctor
  openclaw doctor

  echo.
  echo [실행] openclaw gateway status
  openclaw gateway status
)

echo.
echo [WSL 상태]
where wsl >nul 2>nul
if errorlevel 1 (
  echo [누락] wsl 명령을 찾지 못했습니다.
) else (
  wsl --list --verbose
)

echo.
echo [보안] 이 스크립트는 token 값을 출력하지 않습니다.
