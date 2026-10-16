param([switch]$Worker)
. (Join-Path $PSScriptRoot '_common.ps1')
if (-not $Worker) {
  Start-WorkerWindow 'frontend' $MyInvocation.MyCommand.Path
  exit 0
}
$Host.UI.RawUI.WindowTitle = '梦回宋朝 - 前端 watch'
Set-Location $RepoRoot
& npm run dev:mp-weixin:watch
