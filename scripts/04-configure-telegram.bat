@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { $script = (Get-Content -LiteralPath '%~f0' -Encoding UTF8 | Select-Object -Skip 3) -join [Environment]::NewLine; Invoke-Expression $script }"
exit /b %ERRORLEVEL%

# 이 아래는 PowerShell 코드다. token을 화면에 다시 출력하지 않고 사용자 프로필 설정 파일에만 저장한다.

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "[OpenClaw Telegram 설정]"
Write-Host "BotFather에서 발급한 token을 입력하세요. 입력값은 화면에 표시하지 않습니다."

$secureToken = Read-Host "Telegram bot token" -AsSecureString
$tokenPtr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
try {
    $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($tokenPtr)
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($tokenPtr)
}

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host "[중단] token이 비어 있습니다."
    exit 1
}

Write-Host ""
Write-Host "dmPolicy를 선택하세요."
Write-Host "1. pairing  - 처음 연결할 때 권장"
Write-Host "2. allowlist - 허용된 Telegram numeric user id만 사용"
$policyChoice = Read-Host "선택 값 입력 (1 또는 2)"

$dmPolicy = "pairing"
$allowlist = @()

if ($policyChoice -eq "2") {
    $dmPolicy = "allowlist"
    $userIdInput = Read-Host "허용할 Telegram numeric user id를 쉼표로 구분해서 입력"
    $allowlist = $userIdInput -split "," |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ -match "^[0-9]+$" }

    if ($allowlist.Count -eq 0) {
        Write-Host "[중단] allowlist에는 최소 하나의 numeric user id가 필요합니다."
        exit 1
    }
}

$configDir = Join-Path $env:USERPROFILE ".openclaw"
$configPath = Join-Path $configDir "openclaw.json"
New-Item -ItemType Directory -Force -Path $configDir | Out-Null

if (Test-Path $configPath) {
    $backupPath = "$configPath.bak.$(Get-Date -Format 'yyyyMMddHHmmss')"
    Copy-Item -LiteralPath $configPath -Destination $backupPath
    Write-Host "[백업] 기존 설정을 백업했습니다: $backupPath"
}

$config = [ordered]@{}
if (Test-Path $configPath) {
    try {
        $raw = Get-Content -Raw -LiteralPath $configPath -Encoding UTF8
        if (-not [string]::IsNullOrWhiteSpace($raw)) {
            $configObject = $raw | ConvertFrom-Json
            $configObject.PSObject.Properties | ForEach-Object {
                $config[$_.Name] = $_.Value
            }
        }
    } catch {
        Write-Host "[주의] 기존 JSON을 읽지 못했습니다. 백업을 만든 뒤 새 설정으로 덮어씁니다."
        $config = [ordered]@{}
    }
}

if (-not $config.Contains("integrations")) {
    $config["integrations"] = [ordered]@{}
}

$integrations = $config["integrations"]
if ($integrations -isnot [System.Collections.IDictionary]) {
    $converted = [ordered]@{}
    $integrations.PSObject.Properties | ForEach-Object {
        $converted[$_.Name] = $_.Value
    }
    $integrations = $converted
}

$integrations["telegram"] = [ordered]@{
    enabled = $true
    botToken = $token
    dmPolicy = $dmPolicy
    allowlist = @($allowlist)
}
$config["integrations"] = $integrations

$json = $config | ConvertTo-Json -Depth 20
Set-Content -LiteralPath $configPath -Value $json -Encoding UTF8

Write-Host ""
Write-Host "[완료] Telegram 설정을 저장했습니다: $configPath"
Write-Host "token은 git 저장소 내부에 저장하지 않았습니다."
Write-Host "이제 Gateway를 재시작하세요: scripts\05-restart-gateway.bat"
