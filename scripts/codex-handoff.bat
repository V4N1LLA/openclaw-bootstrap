@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem HANDOFF.md 갱신 프롬프트를 workspace-write sandbox에서 실행한다.

if not exist "prompts\token\05-handoff.md" (
  echo 프롬프트 파일을 찾지 못했습니다: prompts\token\05-handoff.md
  exit /b 1
)

type prompts\token\05-handoff.md | codex exec --cd . --sandbox workspace-write -
