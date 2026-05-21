@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem 사용자가 지정한 프롬프트 파일을 workspace-write sandbox에서 실행한다.

if "%~1"=="" (
  echo 사용법: scripts\codex-targeted-edit.bat ^<prompt-file^>
  exit /b 1
)

if not exist "%~1" (
  echo 프롬프트 파일을 찾지 못했습니다: %~1
  exit /b 1
)

type "%~1" | codex exec --cd . --sandbox workspace-write -
