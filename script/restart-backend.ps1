$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot '_common.ps1')
& (Join-Path $PSScriptRoot 'stop-backend.ps1')
& (Join-Path $PSScriptRoot 'start-backend.ps1')
Wait-DevPort 8080
