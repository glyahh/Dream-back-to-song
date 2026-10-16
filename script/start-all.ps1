$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot '_common.ps1')
& (Join-Path $PSScriptRoot 'start-agent.ps1')
Wait-DevPort 8091
& (Join-Path $PSScriptRoot 'start-backend.ps1')
Wait-DevPort 8080
& (Join-Path $PSScriptRoot 'start-frontend.ps1')
Write-Output ''
Write-Output '开发链路已启动：'
Write-Output '  微信开发者工具固定目录：dist/dev/mp-weixin'
Write-Output '  前端修改：保存后自动编译和热重载'
Write-Output '  Java 修改：.\script\restart-backend.ps1'
Write-Output '  Agent 修改：.\script\restart-agent.ps1'
Write-Output '  停止全部：.\script\stop-all.ps1'
