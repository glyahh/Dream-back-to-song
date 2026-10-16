$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot '_common.ps1')
foreach ($name in @('frontend', 'backend', 'agent')) {
  Stop-WorkerWindow $name
}
