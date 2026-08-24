$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dir = Join-Path $root "v18_assets"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$phone = "https://images.unsplash.com/photo-1645701181277-f1cb7cb8268e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=3000"
$night = "https://images.unsplash.com/photo-1653745361060-5c366266e7f8?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=3000"
Invoke-WebRequest -Uri $phone -OutFile (Join-Path $dir "phone-attention.avif")
Invoke-WebRequest -Uri $night -OutFile (Join-Path $dir "night-reflection.avif")
Write-Host "V18 asset selesai diunduh. Tutup dan buka ulang HTML."
