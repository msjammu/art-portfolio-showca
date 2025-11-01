# Development Setup Script for Art Portfolio Showcase
# This script sets up the development environment and starts the dev server

Write-Host "Art Studio by Akash - Development Setup" -ForegroundColor Magenta
Write-Host "=========================================" -ForegroundColor Magenta

# Add Node.js to PATH for current session
Write-Host "Adding Node.js to PATH..." -ForegroundColor Yellow
$env:PATH += ";C:\Program Files\nodejs"

# Verify Node.js and npm are available
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js or npm not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "Run: winget install OpenJS.NodeJS.LTS" -ForegroundColor Yellow
    exit 1
}

# Set execution policy for npm scripts
Write-Host "Setting execution policy for PowerShell scripts..." -ForegroundColor Yellow
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "Dependencies already installed" -ForegroundColor Green
}

# Check for security vulnerabilities and fix them
Write-Host "Checking for security vulnerabilities..." -ForegroundColor Yellow
npm audit fix --silent

Write-Host ""
Write-Host "Development Environment Ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "  npm run dev     - Start development server" -ForegroundColor White
Write-Host "  npm run build   - Build for production" -ForegroundColor White
Write-Host "  npm run preview - Preview production build" -ForegroundColor White
Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host "The app will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""

# Start the development server
npm run dev