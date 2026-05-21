@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem xhigh effort로 다음 작업 하나를 실행한다.
rem push, commit, OpenClaw 실행, token 출력은 하지 않는다.

echo 경고: xhigh는 자동 루프의 기본값으로 사용하지 않습니다.
echo 실행 전 범위를 줄여 high로 처리할 수 있는지 먼저 확인하십시오.
set /p CONFIRM="xhigh 실행 사유를 확인했고 계속하려면 XHIGH를 입력하세요: "
if /I not "%CONFIRM%"=="XHIGH" (
  echo xhigh 실행을 취소했습니다.
  exit /b 1
)

if not exist "scripts\collect-min-context.bat" (
  echo scripts\collect-min-context.bat 파일을 찾을 수 없습니다.
  exit /b 1
)

if not exist "prompts\agent-loop\00-run-next-task.md" (
  echo prompts\agent-loop\00-run-next-task.md 파일을 찾을 수 없습니다.
  exit /b 1
)

call scripts\collect-min-context.bat
if errorlevel 1 exit /b %errorlevel%

type prompts\agent-loop\00-run-next-task.md | codex exec --cd . --sandbox workspace-write -c model_reasoning_effort=xhigh -
