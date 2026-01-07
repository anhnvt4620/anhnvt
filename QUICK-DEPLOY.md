# 🚀 Quick Deploy - Tam Thiên Thế Giới

Hướng dẫn deploy **NHANH NHẤT** lên GitHub Pages!

## ⚡ Cách 1: Dùng Script Tự Động (Khuyên dùng)

### Windows (PowerShell)

```powershell
cd "d:\OneDrive - MSFT\anhnvtgem"
.\deploy.ps1
```

### Mac/Linux (Bash)

```bash
cd /path/to/anhnvtgem
chmod +x deploy.sh
./deploy.sh
```

Script sẽ tự động:
- ✅ Kiểm tra Git
- ✅ Cấu hình repository
- ✅ Commit code
- ✅ Push lên GitHub
- ✅ Hướng dẫn bật GitHub Pages

## ⚡ Cách 2: Manual (3 Bước)

### Bước 1: Tạo Repo trên GitHub

1. Vào https://github.com/new
2. Tên: `tamthien-thegioi`
3. Public
4. Create repository

### Bước 2: Push Code

```powershell
cd "d:\OneDrive - MSFT\anhnvtgem"

# Thêm remote (thay YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/tamthien-thegioi.git

# Commit và push
git add .
git commit -m "Initial commit: PWA ready"
git branch -M main
git push -u origin main
```

### Bước 3: Bật GitHub Pages

1. Vào repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. **Save**
5. Đợi 1-2 phút

✅ Xong! Truy cập: `https://YOUR_USERNAME.github.io/tamthien-thegioi/`

## 🔑 Personal Access Token

Khi push lần đầu cần:

1. Vào https://github.com/settings/tokens
2. **Generate new token (classic)**
3. Chọn scope: **repo**
4. Copy token
5. Dùng token làm **password** khi git push

## ⚠️ Lưu Ý Quan Trọng

### 1. Tạo Icons Trước (Bắt buộc!)

```powershell
# Vào https://www.pwabuilder.com/imageGenerator
# Upload icons/icon-512x512.svg
# Tải về và copy vào folder icons/
```

### 2. Update Base Path

Nếu app không load, sửa `manifest.json`:

```json
{
  "start_url": "/tamthien-thegioi/",
  "scope": "/tamthien-thegioi/"
}
```

## 🎯 Checklist Deploy

- [ ] Đã tạo repository trên GitHub
- [ ] Đã tạo đầy đủ icons PNG (72-512px)
- [ ] Đã test icons hiển thị trong manifest
- [ ] Đã push code lên GitHub
- [ ] Đã bật GitHub Pages trong Settings
- [ ] Đã đợi vài phút để deploy
- [ ] Đã test PWA trên mobile
- [ ] Đã test install app

## 📱 Test PWA

1. Mở `https://YOUR_USERNAME.github.io/tamthien-thegioi/` trên mobile
2. Chrome: Menu → "Add to Home screen"
3. Safari: Share → "Add to Home Screen"
4. Mở app từ Home Screen
5. App phải mở toàn màn hình (không có address bar)

## 🆘 Troubleshooting

**Lỗi: Permission denied**
→ Dùng Personal Access Token

**Pages không hoạt động**
→ Đợi 2-3 phút, reload

**Icons không hiển thị**
→ Tạo PNG từ SVG, không được bỏ qua!

**Service Worker lỗi**
→ Check Console, có thể do base path

## 📚 Xem Thêm

- Chi tiết: [DEPLOY-GITHUB.md](DEPLOY-GITHUB.md)
- PWA Guide: [PWA-GUIDE.md](PWA-GUIDE.md)
- README: [README.md](README.md)

---

**Thời gian deploy: < 5 phút** ⚡
**Chi phí: MIỄN PHÍ** 💯
