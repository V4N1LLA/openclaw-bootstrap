@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem 현재 저장소 루트에서 실행한다고 가정한다.
rem push, commit, OpenClaw 실행, token 출력은 하지 않는다.

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

type prompts\agent-loop\00-run-next-task.md | codex exec --cd . --sandbox workspace-write -
