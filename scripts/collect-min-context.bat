@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem 현재 repo의 최소 컨텍스트만 수집한다.
rem .env, token, secret, 전체 파일 내용은 읽거나 출력하지 않는다.

set "OUT_DIR=.codex-context"
set "OUT_FILE=%OUT_DIR%\current-context.txt"

if not exist "%OUT_DIR%" mkdir "%OUT_DIR%"

(
  echo # Codex 최소 컨텍스트
  echo.
  echo ## branch
  git branch --show-current 2>nul
  echo.
  echo ## status
  git status --short 2>nul
  echo.
  echo ## diff stat
  git diff --stat 2>nul
  echo.
  echo ## root files
  dir /b /a 2>nul
  echo.
  echo ## required docs
  if exist AGENTS.md (echo AGENTS.md: 있음) else (echo AGENTS.md: 없음)
  if exist context\current-focus.md (echo context/current-focus.md: 있음) else (echo context/current-focus.md: 없음)
  if exist context\HANDOFF.md (echo context/HANDOFF.md: 있음) else (echo context/HANDOFF.md: 없음)
) > "%OUT_FILE%"

echo 최소 컨텍스트를 저장했습니다: %OUT_FILE%
echo token, secret, .env 내용은 수집하지 않았습니다.
