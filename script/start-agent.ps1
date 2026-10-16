param([switch]$Worker)
. (Join-Path $PSScriptRoot '_common.ps1')
if (-not $Worker) {
  Assert-PortAvailable 8091
  Start-WorkerWindow 'agent' $MyInvocation.MyCommand.Path
  exit 0
}
$Host.UI.RawUI.WindowTitle = '梦回宋朝 - Python Agent'
Set-Location $RepoRoot
& npm run agent:catalog
if ($LASTEXITCODE -ne 0) { throw 'Agent 目录生成失败。' }
& python (Join-Path $RepoRoot 'Dream-Back-To-Song_backend\agent\server.py')
