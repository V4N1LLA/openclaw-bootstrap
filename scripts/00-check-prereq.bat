@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem Windows 개발 환경에서 필요한 명령어가 있는지 확인한다.
rem 이 스크립트는 설치를 수행하지 않고 안내만 출력한다.

set "MISSING=0"

echo.
echo [OpenClaw Telegram Bootstrap] 사전 요구사항 확인
echo.

call :check node "Node.js 설치 필요: https://nodejs.org/"
call :check npm "npm은 Node.js와 함께 설치된다. Node.js 설치를 확인하세요."
call :check git "Git for Windows 설치 필요: https://git-scm.com/download/win"
call :check powershell "Windows PowerShell 또는 PowerShell 7 설치 상태를 확인하세요."
call :check wsl "WSL2 설치 권장: wsl --install"
call :check codex "Codex CLI가 필요하면 설치 문서를 확인하세요."
call :check openclaw "OpenClaw CLI가 없으면 scripts\01-install-openclaw.ps1 또는 WSL 경로를 사용하세요."

echo.
if "%MISSING%"=="0" (
  echo 모든 주요 명령어가 발견되었습니다.
) else (
  echo 누락된 항목이 있습니다. 위 안내를 따라 설치한 뒤 다시 실행하세요.
)

exit /b %MISSING%

:check
set "CMD_NAME=%~1"
set "GUIDE=%~2"
where "%CMD_NAME%" >nul 2>nul
if errorlevel 1 (
  echo [누락] %CMD_NAME%
  echo        %GUIDE%
  set "MISSING=1"
) else (
  set "FIRST_PATH="
  for /f "delims=" %%P in ('where "%CMD_NAME%" 2^>nul') do if not defined FIRST_PATH set "FIRST_PATH=%%P"
  call echo [확인] %CMD_NAME%: %%FIRST_PATH%%
)
exit /b 0
