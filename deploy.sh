#!/bin/bash
# Auto Deploy Script for Mac/Linux

echo ""
echo "🌟 TAM THIÊN THẾ GIỚI - AUTO DEPLOY 🌟"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git chưa được cài đặt!"
    echo "Mac: brew install git"
    echo "Ubuntu: sudo apt-get install git"
    exit 1
fi

echo "✅ Git version: $(git --version)"
echo ""

# Get user input
echo "📝 Nhập thông tin GitHub của bạn:"
echo ""
read -p "GitHub Username: " username
read -p "Repository Name (vd: tamthien-thegioi): " repoName

if [ -z "$username" ] || [ -z "$repoName" ]; then
    echo ""
    echo "❌ Cần nhập đầy đủ thông tin!"
    exit 1
fi

echo ""
echo "🔧 Chuẩn bị deploy..."

# Configure git if needed
gitUser=$(git config --global user.name)
if [ -z "$gitUser" ]; then
    echo ""
    read -p "Nhập tên của bạn: " name
    read -p "Nhập email của bạn: " email
    git config --global user.name "$name"
    git config --global user.email "$email"
    echo "✅ Đã cấu hình Git user"
fi

# Add remote
remoteUrl="https://github.com/$username/$repoName.git"
existingRemote=$(git remote get-url origin 2>/dev/null)

if [ ! -z "$existingRemote" ]; then
    echo ""
    echo "⚠️  Remote 'origin' đã tồn tại: $existingRemote"
    read -p "Bạn có muốn thay đổi thành $remoteUrl? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        git remote remove origin
        git remote add origin $remoteUrl
        echo "✅ Đã update remote"
    fi
else
    git remote add origin $remoteUrl
    echo "✅ Đã thêm remote: $remoteUrl"
fi

# Add and commit
echo ""
echo "📦 Chuẩn bị files..."
git add .

read -p "Nhập commit message (Enter để dùng mặc định): " commitMsg
if [ -z "$commitMsg" ]; then
    commitMsg="Deploy: Tam Thiên Thế Giới PWA - $(date '+%Y-%m-%d %H:%M')"
fi

git commit -m "$commitMsg"

# Push
echo ""
echo "🚀 Đang push lên GitHub..."
echo "📍 URL: $remoteUrl"
echo ""
echo "💡 Nếu yêu cầu đăng nhập:"
echo "   - Username: $username"
echo "   - Password: Dùng Personal Access Token"
echo "   - Tạo token tại: https://github.com/settings/tokens"
echo ""

git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DEPLOY THÀNH CÔNG! 🎉"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌐 Repository URL:"
    echo "   https://github.com/$username/$repoName"
    echo ""
    echo "📱 Các bước tiếp theo:"
    echo "   1. Vào GitHub repository"
    echo "   2. Settings → Pages"
    echo "   3. Source: Deploy from a branch"
    echo "   4. Branch: main / (root)"
    echo "   5. Save và đợi vài phút"
    echo ""
    echo "🎯 Website sẽ online tại:"
    echo "   https://$username.github.io/$repoName/"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    read -p "Mở GitHub repository trong browser? (y/n): " openBrowser
    if [ "$openBrowser" = "y" ]; then
        if command -v open &> /dev/null; then
            open "https://github.com/$username/$repoName"
        elif command -v xdg-open &> /dev/null; then
            xdg-open "https://github.com/$username/$repoName"
        fi
    fi
else
    echo ""
    echo "❌ Có lỗi xảy ra khi push!"
    echo ""
    echo "💡 Giải pháp:"
    echo "   1. Kiểm tra username/repo name có đúng không"
    echo "   2. Đảm bảo đã tạo repository trên GitHub"
    echo "   3. Dùng Personal Access Token thay vì password"
    echo "   4. Xem chi tiết trong DEPLOY-GITHUB.md"
    echo ""
fi
