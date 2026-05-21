@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem plan-only 프롬프트를 read-only sandbox에서 실행한다.

if not exist "prompts\token\00-plan-only.md" (
  echo 프롬프트 파일을 찾지 못했습니다: prompts\token\00-plan-only.md
  exit /b 1
)

type prompts\token\00-plan-only.md | codex exec --cd . --sandbox read-only -
