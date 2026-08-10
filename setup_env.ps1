# Setup Script for Personal Calendar Dev Environment on Windows (Fresh Install)
# Run this script in an Administrator PowerShell window.

Write-Host "--- Nebula Cal Windows Setup ---" -ForegroundColor Blue

# 1. Install Git
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Git..." -ForegroundColor Cyan
    winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
} else {
    Write-Host "Git is already installed." -ForegroundColor Green
}

# 2. Install Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Node.js (LTS)..." -ForegroundColor Cyan
    winget install --id OpenJS.NodeJS.LTS -e --source winget --accept-package-agreements --accept-source-agreements
    Write-Host "[Action Required] Please restart this PowerShell window after execution is finished to load Node.js." -ForegroundColor Yellow
} else {
    Write-Host "Node.js is already installed." -ForegroundColor Green
}

# 3. Install pnpm
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "Installing pnpm..." -ForegroundColor Cyan
    winget install --id JSFoundation.pnpm -e --source winget --accept-package-agreements --accept-source-agreements
} else {
    Write-Host "pnpm is already installed." -ForegroundColor Green
}

# 4. Install Docker Desktop
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Docker Desktop..." -ForegroundColor Cyan
    winget install --id Docker.DockerDesktop -e --source winget --accept-package-agreements --accept-source-agreements
    Write-Host "[Action Required] Please restart your PC after setup completes to finalize Docker and WSL2 configuration." -ForegroundColor Yellow
} else {
    Write-Host "Docker is already installed." -ForegroundColor Green
}

Write-Host "Setup Script execution complete!" -ForegroundColor Blue
