@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem OpenClaw agent workspace 등록을 돕는다.
rem push, merge, deploy 같은 위험 작업은 자동 승인하지 않는다.

echo.
echo [OpenClaw Agent Workspace 등록]
echo.

set /p "AGENT_NAME=agent 이름: "
if "%AGENT_NAME%"=="" (
  echo [중단] agent 이름이 비어 있습니다.
  exit /b 1
)

set /p "WORKSPACE_PATH=workspace 경로: "
if "%WORKSPACE_PATH%"=="" (
  echo [중단] workspace 경로가 비어 있습니다.
  exit /b 1
)

echo.
echo 아래 명령을 사용할 수 있습니다.
echo openclaw agents add "%AGENT_NAME%" --workspace "%WORKSPACE_PATH%"
echo.
echo [보안 원칙]
echo - agent에게 push, merge, deploy 권한을 자동 승인하지 마세요.
echo - secret 파일 읽기 권한을 기본값으로 부여하지 마세요.
echo - workspace 범위를 필요한 디렉터리로 제한하세요.
echo.

set /p "RUN_CMD=지금 명령을 실행할까요? (Y/N): "
if /i not "%RUN_CMD%"=="Y" (
  echo 실행하지 않았습니다. 위 명령을 검토한 뒤 직접 실행하세요.
  exit /b 0
)

where openclaw >nul 2>nul
if errorlevel 1 (
  echo [중단] openclaw 명령을 찾지 못했습니다.
  exit /b 1
)

openclaw agents add "%AGENT_NAME%" --workspace "%WORKSPACE_PATH%"
exit /b %ERRORLEVEL%
