# launch-snake.ps1 - one-click clean launch for the Snake.io Monster Truck rig.
# Guarantees the unpacked extension loads FRESH from disk whenever it safely can:
# Chrome only re-reads unpacked extensions when its browser process starts, so a
# stale process = stale rig, which has repeatedly masqueraded as a "regression".
$ErrorActionPreference = 'SilentlyContinue'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$url = 'https://snake.io/crazygames/'

# map pid -> command line so the MCP-profile Chrome (--user-data-dir=...) is never touched
$cmdline = @{}
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ForEach-Object { $cmdline[[int]$_.ProcessId] = $_.CommandLine }
$normalProcs = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $cmdline[$_.Id] -and $cmdline[$_.Id] -notmatch 'user-data-dir' }

# 1. close any existing Snake window in the normal profile, gracefully
$normalProcs | Where-Object { $_.MainWindowTitle -like '*Snake.io*' } | ForEach-Object { [void]$_.CloseMainWindow() }
Start-Sleep -Seconds 3

# 2. if the normal profile has no OTHER visible window (mail, docs...), stop it fully so
#    the extension reloads; if other windows exist, leave them alone - the in-game
#    stale-build banner will say so if the rig is old
$cmdline = @{}
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ForEach-Object { $cmdline[[int]$_.ProcessId] = $_.CommandLine }
$normalProcs = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $cmdline[$_.Id] -and $cmdline[$_.Id] -notmatch 'user-data-dir' }
$otherWindows = $normalProcs | Where-Object { $_.MainWindowTitle -and $_.MainWindowTitle -notlike '*Snake.io*' }
if (-not $otherWindows) {
  $normalProcs | ForEach-Object { Stop-Process -Id $_.Id -Force }
  Start-Sleep -Seconds 2
}

# 3. launch the game in app mode
Start-Process $chrome "--app=$url"