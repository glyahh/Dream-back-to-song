param([switch]$Worker)
. (Join-Path $PSScriptRoot '_common.ps1')
if (-not $Worker) {
  Assert-PortAvailable 8080
  Start-WorkerWindow 'backend' $MyInvocation.MyCommand.Path
  exit 0
}
$Host.UI.RawUI.WindowTitle = '梦回宋朝 - Java 后端'
$backend = Join-Path $RepoRoot 'Dream-Back-To-Song_backend'
Set-Location $backend
& .\mvnw.cmd spring-boot:run '-Dspring-boot.run.profiles=dev,agent-local' '-Dspring-boot.run.arguments=--server.port=8080'
