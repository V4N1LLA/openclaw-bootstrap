@echo off
setlocal

set "REPO_ROOT=%~dp0.."
set "GATEWAY_DIR=%REPO_ROOT%\gateway\discord-agent-gateway"

if not exist "%GATEWAY_DIR%\package.json" (
  echo Discord Agent Gateway package not found: %GATEWAY_DIR%
  exit /b 1
)

pushd "%GATEWAY_DIR%"
call npm run start
set "EXIT_CODE=%ERRORLEVEL%"
popd

exit /b %EXIT_CODE%
