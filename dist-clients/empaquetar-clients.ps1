# Genera los paquetes de DYNAMIS para clientes sin MCP:
#   dynamis-claude-project.zip  → Claude Project (claude.ai)
#   dynamis-chatgpt-gpt.zip     → Custom GPT (ChatGPT)
#
# Uso:  powershell -ExecutionPolicy Bypass -File dist-clients\empaquetar-clients.ps1
# Requiere: correr desde la raiz del repo (DYNAMIS-dist).

param([string]$outDir = "dist-clients")

$ErrorActionPreference = "Stop"
$root = Resolve-Path "$PSScriptRoot\.."

$skillsSrc   = Join-Path $root ".cursor\skills"
$sintesisSrc = Join-Path $root "CEREBRO\DYNAMIS\sintesis"
$indiceSrc   = Join-Path $root "CEREBRO\DYNAMIS\indice_maestro.md"

foreach ($p in @($skillsSrc, $sintesisSrc, $indiceSrc)) {
  if (-not (Test-Path $p)) { throw "No existe: $p (corre el script desde la raiz del repo)" }
}

function Build-Package([string]$name, [string]$instrFile) {
  $tmp = Join-Path $env:TEMP "dynamis-$name"
  if (Test-Path $tmp) { cmd /c "rd /s /q `"$tmp`" 2>nul" }
  $staging = Join-Path $tmp "dynamis-$name"
  New-Item -ItemType Directory -Force -Path $staging | Out-Null

  Copy-Item -Recurse -Force $skillsSrc   (Join-Path $staging "skills")
  Copy-Item -Recurse -Force $sintesisSrc (Join-Path $staging "sintesis")
  Copy-Item -Force $indiceSrc            $staging
  Copy-Item -Force $instrFile            $staging

  $skillsN   = (Get-ChildItem -Recurse -Filter "SKILL.md" (Join-Path $staging "skills")).Count
  $sintesisN = (Get-ChildItem -Filter "*.md" (Join-Path $staging "sintesis")).Count

  $zip = Join-Path $root "$outDir\dynamis-$name.zip"
  if (Test-Path $zip) { Remove-Item $zip -Force }
  Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $zip -CompressionLevel Optimal

  cmd /c "rd /s /q `"$tmp`" 2>nul"
  Write-Host "OK: $zip  ($skillsN skills, $sintesisN sintesis)"
}

Build-Package "claude-project" (Join-Path $PSScriptRoot "claude-project\INSTRUCCIONES.md")
Build-Package "chatgpt-gpt"    (Join-Path $PSScriptRoot "chatgpt-gpt\INSTRUCCIONES.md")

Write-Host ""
Write-Host "Paquetes generados en $outDir/"
