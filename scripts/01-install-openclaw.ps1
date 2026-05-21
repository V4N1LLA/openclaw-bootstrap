# Windows native 환경에 OpenClaw CLI 설치를 시도한다.
# 실패하면 WSL2 설치 경로를 안내한다.

$ErrorActionPreference = "Continue"

function Test-Command {
    param([Parameter(Mandatory = $true)][string]$Name)
    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

Write-Host ""
Write-Host "[OpenClaw] Windows native 설치 시작"
Write-Host ""

if (-not (Test-Command "node")) {
    Write-Host "[중단] node 명령을 찾을 수 없습니다."
    Write-Host "Node.js를 설치한 뒤 다시 실행하세요: https://nodejs.org/"
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "[중단] npm 명령을 찾을 수 없습니다."
    Write-Host "npm은 보통 Node.js와 함께 설치됩니다. Node.js 설치 상태를 확인하세요."
    exit 1
}

Write-Host "[확인] Node 버전:"
node --version
Write-Host "[확인] npm 버전:"
npm --version

Write-Host ""
Write-Host "[실행] npm install -g openclaw@latest"
npm install -g openclaw@latest
$installExitCode = $LASTEXITCODE

if ($installExitCode -ne 0) {
    Write-Host ""
    Write-Host "[실패] Windows native OpenClaw 설치가 실패했습니다."
    Write-Host "권한 문제나 전역 npm prefix 문제가 있으면 WSL2 경로를 권장합니다."
    Write-Host "다음 문서를 확인하세요: docs\WINDOWS-SETUP.md"
    exit $installExitCode
}

Write-Host ""
Write-Host "[확인] openclaw --version"
if (Test-Command "openclaw") {
    openclaw --version
} else {
    Write-Host "[주의] 설치 후에도 openclaw 명령을 찾지 못했습니다. PATH를 새로 고침하거나 터미널을 다시 여세요."
}

Write-Host ""
Write-Host "[확인] openclaw doctor"
if (Test-Command "openclaw") {
    openclaw doctor
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[주의] openclaw doctor가 문제를 보고했습니다. WSL2 설치 경로도 검토하세요."
    }
}

Write-Host ""
Write-Host "완료되었습니다. Gateway 서비스는 아직 설치하거나 시작하지 않았습니다."
