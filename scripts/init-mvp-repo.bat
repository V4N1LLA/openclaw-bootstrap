@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem Draft bootstrap helper for an existing MVP repository.
rem Default mode is dry-run. Set APPLY=1 to write files.
rem This script does not create the target repo, run OpenClaw, commit, push, or read secrets.

set "TARGET=%~1"
if "%TARGET%"=="" (
  echo Usage: scripts\init-mvp-repo.bat TARGET_REPO_PATH
  echo Dry-run by default. Set APPLY=1 to write bootstrap files.
  exit /b 2
)

if not exist "%TARGET%\" (
  echo Target path does not exist: %TARGET%
  echo Create the MVP repo manually first, then rerun this helper.
  exit /b 1
)

if exist "%TARGET%\.env" (
  echo Refusing to continue because target contains .env.
  echo Move secrets out of Codex-readable scope before bootstrapping.
  exit /b 1
)

if /i not "%APPLY%"=="1" (
  echo DRY RUN: would prepare bootstrap files in "%TARGET%"
  echo - AGENTS.md from codex\root.AGENTS.md
  echo - codex\*.AGENTS.md support files
  echo - context\TASK_QUEUE.md
  echo - context\current-focus.md
  echo - context\HANDOFF.md
  echo - docs\README.md
  echo - docs\PRODUCT.md
  echo.
  echo To apply: set APPLY=1 and rerun this command.
  exit /b 0
)

if not exist "%TARGET%\context\" mkdir "%TARGET%\context"
if not exist "%TARGET%\docs\" mkdir "%TARGET%\docs"
if not exist "%TARGET%\codex\" mkdir "%TARGET%\codex"

if exist "%TARGET%\AGENTS.md" (
  echo SKIP existing AGENTS.md
) else (
  copy "codex\root.AGENTS.md" "%TARGET%\AGENTS.md" >nul
)

if exist "%TARGET%\codex\global.AGENTS.md" (
  echo SKIP existing codex\global.AGENTS.md
) else (
  copy "codex\global.AGENTS.md" "%TARGET%\codex\global.AGENTS.md" >nul
)

if exist "%TARGET%\codex\handoff.AGENTS.md" (
  echo SKIP existing codex\handoff.AGENTS.md
) else (
  copy "codex\handoff.AGENTS.md" "%TARGET%\codex\handoff.AGENTS.md" >nul
)

if exist "%TARGET%\codex\token-budget.AGENTS.md" (
  echo SKIP existing codex\token-budget.AGENTS.md
) else (
  copy "codex\token-budget.AGENTS.md" "%TARGET%\codex\token-budget.AGENTS.md" >nul
)

if not exist "%TARGET%\context\TASK_QUEUE.md" (
  > "%TARGET%\context\TASK_QUEUE.md" echo # TASK_QUEUE
  >> "%TARGET%\context\TASK_QUEUE.md" echo.
  >> "%TARGET%\context\TASK_QUEUE.md" echo - ID: TASK-001
  >> "%TARGET%\context\TASK_QUEUE.md" echo - 상태: TODO
  >> "%TARGET%\context\TASK_QUEUE.md" echo - 우선순위: P0
  >> "%TARGET%\context\TASK_QUEUE.md" echo - 추천 effort: low
  >> "%TARGET%\context\TASK_QUEUE.md" echo - 작업 목표: MVP 저장소의 문서, 보안 경계, 검증 명령을 확정한다.
  >> "%TARGET%\context\TASK_QUEUE.md" echo - 수정 허용 파일: `AGENTS.md`, `context/`, `docs/`
  >> "%TARGET%\context\TASK_QUEUE.md" echo - 금지사항: 실제 서비스 코드 생성 금지, token/secret/.env 출력 금지, git push 금지
  >> "%TARGET%\context\TASK_QUEUE.md" echo - 완료 조건: 첫 기능 구현 전 작업 큐와 검증 기준이 문서화됨
  >> "%TARGET%\context\TASK_QUEUE.md" echo - 검증 명령: `git diff --stat`
)

if not exist "%TARGET%\context\current-focus.md" (
  > "%TARGET%\context\current-focus.md" echo # current-focus
  >> "%TARGET%\context\current-focus.md" echo.
  >> "%TARGET%\context\current-focus.md" echo - 현재 작업: MVP 저장소 부트스트랩
  >> "%TARGET%\context\current-focus.md" echo - 수정 허용 범위: `AGENTS.md`, `context/`, `docs/`
  >> "%TARGET%\context\current-focus.md" echo - 검증 명령: `git diff --stat`
)

if not exist "%TARGET%\context\HANDOFF.md" (
  > "%TARGET%\context\HANDOFF.md" echo # HANDOFF
  >> "%TARGET%\context\HANDOFF.md" echo.
  >> "%TARGET%\context\HANDOFF.md" echo - 현재 목표: MVP 저장소 부트스트랩
  >> "%TARGET%\context\HANDOFF.md" echo - 다음 단계: TASK_QUEUE.md의 첫 TODO를 실행한다.
)

if not exist "%TARGET%\docs\README.md" (
  > "%TARGET%\docs\README.md" echo # MVP README
  >> "%TARGET%\docs\README.md" echo.
  >> "%TARGET%\docs\README.md" echo 로컬 실행 전제, 문서 구조, 안전한 검증 명령을 적는다.
)

if not exist "%TARGET%\docs\PRODUCT.md" (
  > "%TARGET%\docs\PRODUCT.md" echo # PRODUCT
  >> "%TARGET%\docs\PRODUCT.md" echo.
  >> "%TARGET%\docs\PRODUCT.md" echo 문제, 대상 사용자, 핵심 흐름, MVP 범위, 성공 기준을 적는다.
)

echo Bootstrap files prepared in "%TARGET%".
echo Review before committing. No git commit or push was performed.
