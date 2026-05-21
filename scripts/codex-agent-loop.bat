@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem 여러 번 자동으로 다음 작업을 실행한다.
rem push, commit, merge, rebase는 하지 않는다.

set "COUNT=%~1"
set "MAX=5"

if "%COUNT%"=="" set "COUNT=1"
set /a COUNT=COUNT+0 2>nul
if errorlevel 1 set "COUNT=1"
if %COUNT% LSS 1 set "COUNT=1"
if %COUNT% GTR %MAX% set "COUNT=%MAX%"

echo Codex 자율 작업 루프를 %COUNT%회 실행합니다.
echo 중단하려면 Ctrl+C를 누르십시오.

for /L %%I in (1,1,%COUNT%) do (
  echo.
  echo [%%I/%COUNT%] 다음 작업 실행
  call scripts\codex-run-next.bat
  if errorlevel 1 (
    echo codex-run-next.bat 실행이 실패했습니다.
    exit /b %errorlevel%
  )
  echo.
  echo [%%I/%COUNT%] git status --short
  git status --short
)

echo.
echo Codex 자율 작업 루프가 끝났습니다.
