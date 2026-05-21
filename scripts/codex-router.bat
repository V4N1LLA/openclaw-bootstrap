@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem 다음 작업의 reasoning effort만 분류한다. 작업 실행, commit, push, deploy는 하지 않는다.

if not exist "prompts\router\classify-effort.md" (
  echo prompts\router\classify-effort.md 파일을 찾을 수 없습니다.
  exit /b 1
)

type prompts\router\classify-effort.md | codex exec --cd . --sandbox workspace-write -c model_reasoning_effort=medium -
