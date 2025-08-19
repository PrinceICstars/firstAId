# Restore source files for development
Write-Host "Restoring source files for development..."

# Remove deployment files
if (Test-Path ".\assets") { Remove-Item ".\assets" -Recurse -Force }
if (Test-Path ".\vite-deploy.svg") { Remove-Item ".\vite-deploy.svg" }

# Restore source index.html
if (Test-Path ".\index-source.html") {
    Remove-Item ".\index.html"
    Rename-Item -Path ".\index-source.html" -NewName "index.html"
    Write-Host "Source files restored. You can now run 'npm run dev' for development."
} else {
    Write-Host "Source index.html not found. You may need to manually restore it."
}
