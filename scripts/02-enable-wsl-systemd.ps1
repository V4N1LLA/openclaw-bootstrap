# WSL distro에 systemd 설정을 추가한다.
# /etc/wsl.conf가 있으면 백업을 만든 뒤 [boot] systemd=true 설정을 반영한다.

$ErrorActionPreference = "Stop"

if (-not (Get-Command "wsl" -ErrorAction SilentlyContinue)) {
    Write-Host "[중단] wsl 명령을 찾을 수 없습니다."
    Write-Host "관리자 권한 PowerShell에서 wsl --install 실행 후 재부팅하세요."
    exit 1
}

Write-Host ""
Write-Host "[현재 WSL distro 목록]"
wsl --list --verbose
Write-Host ""

$distro = Read-Host "systemd를 켤 WSL distro 이름을 입력하세요"
if ([string]::IsNullOrWhiteSpace($distro)) {
    Write-Host "[중단] distro 이름이 비어 있습니다."
    exit 1
}

$linuxScript = @'
set -eu
if [ -f /etc/wsl.conf ]; then
  sudo cp /etc/wsl.conf "/etc/wsl.conf.bak.$(date +%Y%m%d%H%M%S)"
else
  sudo touch /etc/wsl.conf
fi

if grep -Eq "^[[:space:]]*systemd[[:space:]]*=" /etc/wsl.conf; then
  sudo sed -i -E "s/^[[:space:]]*systemd[[:space:]]*=.*/systemd=true/" /etc/wsl.conf
elif grep -Eq "^\[boot\]" /etc/wsl.conf; then
  sudo sed -i "/^\[boot\]/a systemd=true" /etc/wsl.conf
else
  printf "\n[boot]\nsystemd=true\n" | sudo tee -a /etc/wsl.conf >/dev/null
fi

echo ""
echo "[/etc/wsl.conf]"
sudo cat /etc/wsl.conf
'@

Write-Host ""
Write-Host "[실행] $distro 내부 /etc/wsl.conf 갱신"
wsl -d $distro -- sh -lc $linuxScript

Write-Host ""
$shutdown = Read-Host "변경 적용을 위해 지금 wsl --shutdown을 실행할까요? (Y/N)"
if ($shutdown -match "^[Yy]") {
    wsl --shutdown
    Write-Host "WSL을 종료했습니다. 다음 실행부터 systemd 설정이 적용됩니다."
} else {
    Write-Host "나중에 직접 실행하세요: wsl --shutdown"
}
