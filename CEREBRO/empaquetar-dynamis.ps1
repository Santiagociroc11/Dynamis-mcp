# Empaqueta el sistema DYNAMIS transferible (sin contexto personal del operador)
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$staging = Join-Path $env:TEMP "dynamis-transfer-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$zipOut = Join-Path $root "DYNAMIS-transferible.zip"

if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
New-Item -ItemType Directory -Path $staging | Out-Null

# CEREBRO (excluir OPERADOR.md personal)
$destCerebro = Join-Path $staging "CEREBRO"
Copy-Item (Join-Path $root "CEREBRO") $destCerebro -Recurse
$operador = Join-Path $destCerebro "OPERADOR.md"
if (Test-Path $operador) { Remove-Item $operador -Force }

# Skills DYNAMIS
$skillNames = @(
  "dynamis-index",
  "estructura-lanzamiento-cierre",
  "whatsapp-grupos-cierre",
  "oferta-anclaje-backend",
  "equipo-comercial-closers",
  "ecosistema-escalera-valor",
  "agencia-equipos-contratacion",
  "operacion-agil-delegacion"
)
$destSkills = Join-Path $staging ".cursor\skills"
New-Item -ItemType Directory -Path $destSkills -Force | Out-Null
foreach ($name in $skillNames) {
  $src = Join-Path $root ".cursor\skills\$name"
  if (Test-Path $src) {
    Copy-Item $src (Join-Path $destSkills $name) -Recurse
  }
}

if (Test-Path $zipOut) { Remove-Item $zipOut -Force }
Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $zipOut -Force
Remove-Item $staging -Recurse -Force

Write-Host "Paquete creado: $zipOut"
