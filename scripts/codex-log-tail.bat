@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem 로그 파일의 마지막 N줄만 .codex-context/error-tail.txt에 저장한다.
rem token, secret, password로 보이는 값은 간단히 마스킹한다.

if "%~1"=="" (
  echo 사용법: scripts\codex-log-tail.bat logs\app.log 80
  exit /b 1
)

set "LOG_FILE=%~1"
set "LINE_COUNT=%~2"
if "%LINE_COUNT%"=="" set "LINE_COUNT=80"

if not exist "%LOG_FILE%" (
  echo 로그 파일을 찾지 못했습니다: %LOG_FILE%
  exit /b 1
)

if not exist ".codex-context" mkdir ".codex-context"

powershell -NoProfile -ExecutionPolicy Bypass -Command "$path = $env:LOG_FILE; $n = [int]$env:LINE_COUNT; Get-Content -LiteralPath $path -Tail $n | ForEach-Object { $_ -replace '(?i)(token|secret|password|authorization|bearer)([=: ]+)[^ ]+', '$1$2[REDACTED]' } | Set-Content -LiteralPath '.codex-context\error-tail.txt' -Encoding UTF8"

echo 로그 tail을 저장했습니다: .codex-context\error-tail.txt
echo 민감값으로 보이는 문자열은 마스킹했습니다.
