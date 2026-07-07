# Genera los paquetes de DYNAMIS para clientes sin MCP:
#   dynamis-claude-project.zip  -> Claude Project (claude.ai)        [skills/ + sintesis/ + indice]
#   dynamis-chatgpt-gpt.zip     -> Custom GPT (ChatGPT)              [skills/ + sintesis/ + indice]
#   dynamis-gemini-gem.zip      -> Gemini Gem (consolidado, max 10)  [skills-todas.md + sintesis-todas.md + indice]
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

# Orden logico para que los archivos consolidados sean legibles
$skillOrder = @(
  "dynamis-index",
  "estructura-lanzamiento-cierre",
  "whatsapp-grupos-cierre",
  "oferta-anclaje-backend",
  "equipo-comercial-closers",
  "ecosistema-escalera-valor",
  "agencia-equipos-contratacion",
  "operacion-agil-delegacion"
)
$sintesisOrder = @(
  "A_estructura_lanzamiento_cierre.md",
  "C_whatsapp_grupos_chat.md",
  "D_trafico_creativos.md",
  "E_equipo_comercial_closers.md",
  "F_oferta_anclaje_backend_ltv.md",
  "G_ecosistema_escalera_valor.md",
  "H_agencia_equipos_contratacion.md",
  "I_operacion_agil_delegacion.md"
)

$sep = "================================================================================"

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

function Build-GemPackage([string]$name, [string]$instrFile) {
  $tmp = Join-Path $env:TEMP "dynamis-$name"
  if (Test-Path $tmp) { cmd /c "rd /s /q `"$tmp`" 2>nul" }
  $staging = Join-Path $tmp "dynamis-$name"
  New-Item -ItemType Directory -Force -Path $staging | Out-Null

  $utf8NoBom = New-Object Text.UTF8Encoding $false

  # Consolidar skills en un solo archivo
  $skillsOut = Join-Path $staging "skills-todas.md"
  $sb = New-Object Text.StringBuilder
  [void]$sb.AppendLine("# DYNAMIS - Skills operativas (8 consolidadas para Gemini Gem)")
  [void]$sb.AppendLine("")
  foreach ($s in $skillOrder) {
    $f = Join-Path $skillsSrc "$s\SKILL.md"
    if (-not (Test-Path $f)) { Write-Warning "Falta skill: $s"; continue }
    [void]$sb.AppendLine("")
    [void]$sb.AppendLine($sep)
    [void]$sb.AppendLine("# SKILL: $s")
    [void]$sb.AppendLine($sep)
    [void]$sb.AppendLine("")
    [void]$sb.AppendLine((Get-Content $f -Raw))
  }
  [IO.File]::WriteAllText($skillsOut, $sb.ToString(), $utf8NoBom)

  # Consolidar sintesis en un solo archivo
  $sintOut = Join-Path $staging "sintesis-todas.md"
  $sb2 = New-Object Text.StringBuilder
  [void]$sb2.AppendLine("# DYNAMIS - Sintesis cross-experto por cluster (8 consolidadas para Gemini Gem)")
  [void]$sb2.AppendLine("")
  foreach ($s in $sintesisOrder) {
    $f = Join-Path $sintesisSrc $s
    if (-not (Test-Path $f)) { Write-Warning "Falta sintesis: $s"; continue }
    [void]$sb2.AppendLine("")
    [void]$sb2.AppendLine($sep)
    [void]$sb2.AppendLine("# SINTESIS: $s")
    [void]$sb2.AppendLine($sep)
    [void]$sb2.AppendLine("")
    [void]$sb2.AppendLine((Get-Content $f -Raw))
  }
  [IO.File]::WriteAllText($sintOut, $sb2.ToString(), $utf8NoBom)

  Copy-Item -Force $indiceSrc $staging
  Copy-Item -Force $instrFile $staging

  $files = Get-ChildItem $staging -File
  $zip = Join-Path $root "$outDir\dynamis-$name.zip"
  if (Test-Path $zip) { Remove-Item $zip -Force }
  Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $zip -CompressionLevel Optimal

  cmd /c "rd /s /q `"$tmp`" 2>nul"
  Write-Host "OK: $zip  ($($files.Count) archivos: skills-todas.md, sintesis-todas.md, indice + INSTRUCCIONES)"
}

Build-Package    "claude-project" (Join-Path $PSScriptRoot "claude-project\INSTRUCCIONES.md")
Build-Package    "chatgpt-gpt"    (Join-Path $PSScriptRoot "chatgpt-gpt\INSTRUCCIONES.md")
Build-GemPackage "gemini-gem"     (Join-Path $PSScriptRoot "gemini-gem\INSTRUCCIONES.md")

Write-Host ""
Write-Host "Paquetes generados en $outDir/"
