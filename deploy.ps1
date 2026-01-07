# 🚀 Auto Deploy Script
# Chạy script này để tự động deploy lên GitHub

Write-Host "`n🌟 TAM THIÊN THẾ GIỚI - AUTO DEPLOY 🌟`n" -ForegroundColor Magenta

# 1. Kiểm tra Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git chưa được cài đặt!" -ForegroundColor Red
    Write-Host "Cài đặt từ: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Hoặc chạy: winget install Git.Git" -ForegroundColor Yellow
    exit
}

Write-Host "✅ Git version: $(git --version)`n" -ForegroundColor Green

# 2. Lấy thông tin từ user
Write-Host "📝 Nhập thông tin GitHub của bạn:`n" -ForegroundColor Cyan

$username = Read-Host "GitHub Username"
$repoName = Read-Host "Repository Name (vd: tamthien-thegioi)"

if ([string]::IsNullOrWhiteSpace($username) -or [string]::IsNullOrWhiteSpace($repoName)) {
    Write-Host "`n❌ Cần nhập đầy đủ thông tin!" -ForegroundColor Red
    exit
}

Write-Host "`n🔧 Chuẩn bị deploy..." -ForegroundColor Cyan

# 3. Cấu hình Git (nếu chưa có)
$gitUser = git config --global user.name
if ([string]::IsNullOrWhiteSpace($gitUser)) {
    $name = Read-Host "`nNhập tên của bạn (để hiển thị trong commits)"
    $email = Read-Host "Nhập email của bạn"
    git config --global user.name "$name"
    git config --global user.email "$email"
    Write-Host "✅ Đã cấu hình Git user" -ForegroundColor Green
}

# 4. Kiểm tra và add remote
$remoteUrl = "https://github.com/$username/$repoName.git"
$existingRemote = git remote get-url origin 2>$null

if ($existingRemote) {
    Write-Host "`n⚠️  Remote 'origin' đã tồn tại: $existingRemote" -ForegroundColor Yellow
    $confirm = Read-Host "Bạn có muốn thay đổi thành $remoteUrl? (y/n)"
    if ($confirm -eq 'y') {
        git remote remove origin
        git remote add origin $remoteUrl
        Write-Host "✅ Đã update remote" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✅ Đã thêm remote: $remoteUrl" -ForegroundColor Green
}

# 5. Add và commit files
Write-Host "`n📦 Chuẩn bị files..." -ForegroundColor Cyan
git add .

$commitMsg = Read-Host "`nNhập commit message (Enter để dùng mặc định)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Deploy: Tam Thiên Thế Giới PWA - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

git commit -m "$commitMsg"

# 6. Push lên GitHub
Write-Host "`n🚀 Đang push lên GitHub..." -ForegroundColor Cyan
Write-Host "📍 URL: $remoteUrl" -ForegroundColor Yellow
Write-Host "`n💡 Nếu yêu cầu đăng nhập:" -ForegroundColor Yellow
Write-Host "   - Username: $username" -ForegroundColor White
Write-Host "   - Password: Dùng Personal Access Token (không phải password thường)" -ForegroundColor White
Write-Host "   - Tạo token tại: https://github.com/settings/tokens`n" -ForegroundColor White

git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ DEPLOY THÀNH CÔNG! 🎉`n" -ForegroundColor Green
    
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "🌐 Repository URL:" -ForegroundColor Yellow
    Write-Host "   https://github.com/$username/$repoName`n" -ForegroundColor White
    
    Write-Host "📱 Các bước tiếp theo:" -ForegroundColor Yellow
    Write-Host "   1. Vào GitHub repository" -ForegroundColor White
    Write-Host "   2. Settings → Pages" -ForegroundColor White
    Write-Host "   3. Source: Deploy from a branch" -ForegroundColor White
    Write-Host "   4. Branch: main / (root)" -ForegroundColor White
    Write-Host "   5. Save và đợi vài phút`n" -ForegroundColor White
    
    Write-Host "🎯 Website sẽ online tại:" -ForegroundColor Yellow
    Write-Host "   https://$username.github.io/$repoName/`n" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    
    # Mở browser
    $openBrowser = Read-Host "`nMở GitHub repository trong browser? (y/n)"
    if ($openBrowser -eq 'y') {
        Start-Process "https://github.com/$username/$repoName"
    }
    
} else {
    Write-Host "`n❌ Có lỗi xảy ra khi push!" -ForegroundColor Red
    Write-Host "`n💡 Giải pháp:" -ForegroundColor Yellow
    Write-Host "   1. Kiểm tra username/repo name có đúng không" -ForegroundColor White
    Write-Host "   2. Đảm bảo đã tạo repository trên GitHub" -ForegroundColor White
    Write-Host "   3. Dùng Personal Access Token thay vì password" -ForegroundColor White
    Write-Host "   4. Xem chi tiết trong DEPLOY-GITHUB.md`n" -ForegroundColor White
}

Write-Host "`nNhấn Enter để thoát..." -ForegroundColor Gray
Read-Host
