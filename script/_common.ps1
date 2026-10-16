$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$RuntimeDir = Join-Path $RepoRoot '.runtime\dev'
$StateFile = Join-Path $RuntimeDir 'pids.json'
function Initialize-DevState {
  New-Item -ItemType Directory -Force -Path $RuntimeDir | Out-Null
  if (-not (Test-Path -LiteralPath $StateFile)) {
    '{}' | Set-Content -LiteralPath $StateFile -Encoding utf8
  }
}
function Read-DevState {
  Initialize-DevState
  $raw = Get-Content -Raw -LiteralPath $StateFile
  if ([string]::IsNullOrWhiteSpace($raw)) { return @{} }
  $parsed = $raw | ConvertFrom-Json
  $state = @{}
  if ($parsed) {
    $parsed.PSObject.Properties | ForEach-Object { $state[$_.Name] = [int]$_.Value }
  }
  return $state
}
function Write-DevState($state) {
  Initialize-DevState
  $state | ConvertTo-Json | Set-Content -LiteralPath $StateFile -Encoding utf8
}
function Get-WorkerProcess($name) {
  $state = Read-DevState
  if (-not $state.ContainsKey($name)) { return $null }
  $process = Get-Process -Id ([int]$state[$name]) -ErrorAction SilentlyContinue
  if ($process) { return $process }
  $state.Remove($name)
  Write-DevState $state
  return $null
}
function Start-WorkerWindow($name, $scriptPath) {
  if (Get-WorkerProcess $name) {
    Write-Output "$name 已在运行。"
    return
  }
  $shell = (Get-Command powershell.exe -ErrorAction SilentlyContinue).Source
  if (-not $shell) { throw '未找到 powershell.exe，无法打开可见开发窗口。' }
  $window = Start-Process -FilePath $shell -ArgumentList @(
    '-NoExit', '-ExecutionPolicy', 'Bypass', '-File', ('"{0}"' -f $scriptPath), '-Worker'
  ) -WorkingDirectory $RepoRoot -PassThru
  $state = Read-DevState
  $state[$name] = $window.Id
  Write-DevState $state
  Write-Output "$name 已启动，窗口 PID=$($window.Id)。"
}
function Stop-WorkerWindow($name) {
  $state = Read-DevState
  if (-not $state.ContainsKey($name)) {
    Write-Output "$name 没有脚本记录的运行进程。"
    return
  }
  $processId = [int]$state[$name]
  if (Get-Process -Id $processId -ErrorAction SilentlyContinue) {
    & taskkill.exe /PID $processId /T /F | Out-Null
    Write-Output "$name 已停止。"
  } else {
    Write-Output "$name 的进程已退出。"
  }
  $state.Remove($name)
  Write-DevState $state
}
function Assert-PortAvailable($port) {
  $listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $listener) { return }
  $state = Read-DevState
  $tracked = $state.Values -contains [int]$listener.OwningProcess
  if (-not $tracked) {
    throw "端口 $port 已被其他进程占用（PID=$($listener.OwningProcess)），未强制停止它。"
  }
}
function Wait-DevPort($port, $timeoutSeconds = 60) {
  $deadline = (Get-Date).AddSeconds($timeoutSeconds)
  do {
    if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
      Write-Output "端口 $port 已就绪。"
      return
    }
    Start-Sleep -Seconds 1
  } while ((Get-Date) -lt $deadline)
  throw "等待端口 $port 超时，请查看对应服务窗口。"
}
