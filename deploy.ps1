# Deploy script for GitHub Pages
Write-Host "Building the project..."
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful. Copying files for GitHub Pages deployment..."
    
    # Remove old deployment files if they exist
    if (Test-Path ".\index-deploy.html") { Remove-Item ".\index-deploy.html" }
    if (Test-Path ".\assets") { Remove-Item ".\assets" -Recurse -Force }
    if (Test-Path ".\vite-deploy.svg") { Remove-Item ".\vite-deploy.svg" }
    
    # Copy built files to root
    Copy-Item -Path ".\dist\index.html" -Destination ".\index-deploy.html"
    Copy-Item -Path ".\dist\assets" -Destination ".\assets" -Recurse
    Copy-Item -Path ".\dist\vite.svg" -Destination ".\vite-deploy.svg" -ErrorAction SilentlyContinue
    
    # Rename the source index.html temporarily
    Rename-Item -Path ".\index.html" -NewName "index-source.html"
    
    # Use the built index.html as the main index.html
    Rename-Item -Path ".\index-deploy.html" -NewName "index.html"
    
    Write-Host "Deployment files ready. You can now commit and push to GitHub."
    Write-Host "To restore source files for development, run: npm run dev:restore"
} else {
    Write-Host "Build failed. Please fix the errors and try again."
}
