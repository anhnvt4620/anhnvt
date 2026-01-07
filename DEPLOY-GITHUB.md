# 🚀 Deploy Tam Thiên Thế Giới lên GitHub Pages

Hướng dẫn chi tiết deploy ứng dụng lên GitHub Pages **HOÀN TOÀN MIỄN PHÍ**!

## 📋 Yêu Cầu

- Tài khoản GitHub (đăng ký miễn phí tại https://github.com)
- Git đã cài đặt trên máy

## 🔧 Cài Đặt Git (nếu chưa có)

### Windows
```powershell
# Tải từ: https://git-scm.com/download/win
# Hoặc dùng winget:
winget install Git.Git
```

### Mac
```bash
brew install git
```

### Kiểm tra
```bash
git --version
```

## 📦 Bước 1: Chuẩn Bị Project

### 1.1. Tạo Repository trên GitHub

1. Đăng nhập GitHub: https://github.com
2. Nhấn nút **"+"** → **"New repository"**
3. Đặt tên: `tamthien-thegioi` (hoặc tên bạn thích)
4. Chọn **Public** (miễn phí cho GitHub Pages)
5. **KHÔNG** chọn "Add a README" (vì đã có code)
6. Nhấn **"Create repository"**

### 1.2. Cấu hình Git Local

Mở Terminal/PowerShell trong thư mục project:

```powershell
cd "d:\OneDrive - MSFT\anhnvtgem"

# Cấu hình tên và email (chỉ làm 1 lần)
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

## 🚀 Bước 2: Push Code Lên GitHub

### 2.1. Khởi tạo Git Repository

```powershell
# Khởi tạo git
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit: Tam Thien The Gioi PWA"
```

### 2.2. Kết nối với GitHub

```powershell
# Thay YOUR_USERNAME và YOUR_REPO bằng thông tin của bạn
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Ví dụ:
# git remote add origin https://github.com/anhnvt/tamthien-thegioi.git

# Đổi tên branch thành main
git branch -M main

# Push lên GitHub
git push -u origin main
```

**Lưu ý:** GitHub sẽ yêu cầu đăng nhập:
- Username: tên GitHub của bạn
- Password: **Personal Access Token** (không phải password thường)

### 2.3. Tạo Personal Access Token (nếu cần)

1. Vào GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Chọn scope: `repo` (full control)
5. Generate và copy token (lưu lại, chỉ hiện 1 lần!)
6. Dùng token này làm password khi git push

## 🌐 Bước 3: Cấu Hình GitHub Pages

### 3.1. Bật GitHub Pages

1. Vào repository trên GitHub
2. **Settings** → **Pages** (menu bên trái)
3. **Source**: chọn `Deploy from a branch`
4. **Branch**: chọn `main` và folder `/ (root)`
5. Nhấn **Save**

### 3.2. Chờ Deploy

- GitHub sẽ tự động build và deploy (khoảng 1-2 phút)
- Reload trang để xem trạng thái
- Khi xong sẽ hiện: **"Your site is live at https://YOUR_USERNAME.github.io/YOUR_REPO/"**

## 🎉 Bước 4: Truy Cập Website

URL của bạn sẽ là:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

Ví dụ:
```
https://anhnvt.github.io/tamthien-thegioi/
```

## ✅ Kiểm Tra PWA

1. Mở URL trên mobile Chrome/Safari
2. Đợi vài giây → sẽ thấy popup "Cài đặt ứng dụng"
3. Cài đặt → App xuất hiện trên Home Screen
4. Mở app → trải nghiệm toàn màn hình!

## 🔄 Update Code Sau Này

Khi có thay đổi code:

```powershell
cd "d:\OneDrive - MSFT\anhnvtgem"

# Thêm files thay đổi
git add .

# Commit với message mô tả
git commit -m "Update: thêm tính năng xyz"

# Push lên GitHub
git push

# GitHub Pages sẽ tự động deploy lại!
```

## 🎨 Tạo Icons Trước Khi Deploy

**QUAN TRỌNG:** Cần tạo icons PNG trước khi deploy!

### Cách 1: PWA Builder (Khuyên dùng)

1. Vào https://www.pwabuilder.com/imageGenerator
2. Upload file `icons/icon-512x512.svg`
3. Tải về zip chứa tất cả icons
4. Copy vào folder `icons/`

### Cách 2: Realfavicongenerator

1. Vào https://realfavicongenerator.net/
2. Upload `icons/icon-512x512.svg`
3. Tùy chỉnh và tải về
4. Copy vào project

### Cách 3: Manual với ImageMagick

```powershell
# Cài ImageMagick trước
winget install ImageMagick.ImageMagick

# Tạo tất cả sizes
$sizes = @(72, 96, 128, 144, 152, 192, 384, 512)
foreach ($size in $sizes) {
    magick convert icons/icon-512x512.svg -resize ${size}x${size} icons/icon-${size}x${size}.png
}
```

## 🔧 Fix Base Path (nếu cần)

Nếu app không load đúng trên GitHub Pages, update base path:

### Cách 1: Update manifest.json

```json
{
  "start_url": "/YOUR_REPO/",
  "scope": "/YOUR_REPO/"
}
```

### Cách 2: Update service-worker.js

```javascript
// Thay đổi đường dẫn cache
const urlsToCache = [
  '/YOUR_REPO/',
  '/YOUR_REPO/index.html',
  '/YOUR_REPO/assets/index.js',
  '/YOUR_REPO/manifest.json',
  'https://cdn.tailwindcss.com'
];
```

## 🎯 Custom Domain (Optional)

Muốn dùng domain riêng (vd: tamthien.com)?

1. Mua domain (Namecheap, GoDaddy, ~$10/năm)
2. GitHub Settings → Pages → Custom domain
3. Nhập domain của bạn
4. Cấu hình DNS:
   - Type: `CNAME`
   - Name: `www`
   - Value: `YOUR_USERNAME.github.io`

## 📊 Monitor & Analytics

### Google Analytics (Free)

Thêm vào `index.html` trước `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🐛 Troubleshooting

### Lỗi: "Permission denied"
- Dùng Personal Access Token thay vì password
- Kiểm tra token có scope `repo`

### Lỗi: "Pages build failed"
- Kiểm tra Console trong GitHub Actions tab
- Đảm bảo `index.html` ở root folder

### Icons không hiển thị
- Tạo đầy đủ icons PNG
- Kiểm tra đường dẫn trong `manifest.json`
- Clear cache và reload

### Service Worker không hoạt động
- GitHub Pages đã có HTTPS mặc định ✅
- Check Console có lỗi không
- Đảm bảo đường dẫn `/service-worker.js` đúng

### App không install được
- Đợi vài phút sau khi deploy
- Hard refresh (Ctrl+Shift+R)
- Kiểm tra Lighthouse audit

## 📱 Test Trên Nhiều Thiết Bị

### Android
- Chrome: Mở URL → Menu → "Add to Home screen"
- Edge: Mở URL → Menu → "Install app"

### iOS
- Safari: Mở URL → Share → "Add to Home Screen"

### Desktop
- Chrome/Edge: Icon ➕ trên address bar → "Install"

## 🎊 Hoàn Thành!

✅ Code trên GitHub
✅ Website online miễn phí
✅ PWA có thể cài đặt
✅ HTTPS mặc định
✅ Auto deploy khi update
✅ Unlimited bandwidth (với GitHub Pages)

**URL của bạn:**
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

Chia sẻ link này với bạn bè để họ cài app! 🚀

## 💡 Tips

1. **Free Hosting:** GitHub Pages miễn phí cho public repos
2. **Auto Deploy:** Mỗi lần push code → tự động deploy
3. **HTTPS:** Bật mặc định, PWA cần HTTPS
4. **Custom 404:** Tạo `404.html` để custom error page
5. **Analytics:** Thêm Google Analytics để track users
6. **SEO:** Thêm meta tags cho tốt hơn

## 📚 Tài Liệu Tham Khảo

- GitHub Pages: https://pages.github.com/
- Git Guide: https://git-scm.com/book/vi/v2
- PWA Checklist: https://web.dev/pwa-checklist/
- GitHub Actions: https://docs.github.com/en/actions

---

**Chúc bạn deploy thành công! 🎉**

Có vấn đề gì cứ hỏi nhé!
