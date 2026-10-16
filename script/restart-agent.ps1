$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot '_common.ps1')
& (Join-Path $PSScriptRoot 'stop-agent.ps1')
& (Join-Path $PSScriptRoot 'start-agent.ps1')
Wait-DevPort 8091
