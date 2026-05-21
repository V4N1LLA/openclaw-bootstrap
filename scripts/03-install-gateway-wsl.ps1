# WSL 내부에서 OpenClaw CLI와 Gateway service 설치 흐름을 실행한다.
# onboarding 중 대화형 입력이 나오면 사용자가 직접 입력해야 한다.

$ErrorActionPreference = "Stop"

if (-not (Get-Command "wsl" -ErrorAction SilentlyContinue)) {
    Write-Host "[중단] wsl 명령을 찾을 수 없습니다."
    Write-Host "WSL2 설치 후 다시 실행하세요: wsl --install"
    exit 1
}

Write-Host ""
Write-Host "[현재 WSL distro 목록]"
wsl --list --verbose
Write-Host ""

$distro = Read-Host "OpenClaw Gateway를 설치할 WSL distro 이름을 입력하세요"
if ([string]::IsNullOrWhiteSpace($distro)) {
    Write-Host "[중단] distro 이름이 비어 있습니다."
    exit 1
}

$linuxScript = @'
set -u

echo ""
echo "[OpenClaw] WSL 내부 설치 시작"

if ! command -v node >/dev/null 2>&1; then
  echo "[중단] node 명령이 없습니다. WSL 내부에 Node.js를 먼저 설치하세요."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[중단] npm 명령이 없습니다. WSL 내부 Node.js/npm 설치를 확인하세요."
  exit 1
fi

echo ""
echo "[실행] npm install -g openclaw@latest"
npm install -g openclaw@latest || exit $?

echo ""
echo "[확인] openclaw --version"
openclaw --version || true

echo ""
echo "[Gateway 설치]"
echo "onboarding 중 질문이 나오면 사용자가 직접 입력해야 합니다."

if openclaw onboard --help >/dev/null 2>&1; then
  openclaw onboard --install-daemon || echo "[주의] onboard --install-daemon 실행에 실패했습니다. 아래 gateway install 경로를 시도합니다."
else
  echo "[안내] openclaw onboard 명령 도움말을 확인하지 못했습니다."
fi

if openclaw gateway install --help >/dev/null 2>&1; then
  openclaw gateway install || echo "[주의] gateway install 실행에 실패했습니다. OpenClaw 문서의 현재 명령을 확인하세요."
fi

echo ""
echo "[상태 확인]"
openclaw gateway status || true
'@

wsl -d $distro -- bash -lc $linuxScript

Write-Host ""
Write-Host "WSL Gateway 설치 흐름이 끝났습니다. 실패 항목이 있으면 docs\TROUBLESHOOTING.md를 확인하세요."
