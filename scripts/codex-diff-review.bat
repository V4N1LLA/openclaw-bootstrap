@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem 현재 git diff만 read-only로 리뷰한다.

if not exist "prompts\token\03-diff-review.md" (
  echo 프롬프트 파일을 찾지 못했습니다: prompts\token\03-diff-review.md
  exit /b 1
)

type prompts\token\03-diff-review.md | codex exec --cd . --sandbox read-only -
