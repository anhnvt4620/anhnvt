# 🌏 Tam Thiên Thế Giới - Cloud Version

## ✨ Điểm mới

✅ **Đăng nhập với Google** - An toàn, nhanh chóng  
✅ **Lưu trữ trên cloud** - Firebase Firestore (miễn phí)  
✅ **Đồng bộ đa thiết bị** - Login ở đâu cũng thấy data  
✅ **Xóa Discord & Ủng hộ** - Giao diện sạch sẽ hơn  
✅ **Không còn export/import file** - Tự động sync  

## 🚀 Cách triển khai

### Bước 1: Setup Firebase
Xem hướng dẫn chi tiết trong `FIREBASE-SETUP.md`

Tóm tắt:
1. Tạo Firebase project tại https://console.firebase.google.com/
2. Bật Google Authentication
3. Tạo Firestore Database
4. Copy Firebase config vào `app.js`

### Bước 2: Deploy

```powershell
# Thay index.html cũ bằng index.html mới
Remove-Item index.html
Rename-Item index-new.html index.html

# Xóa assets cũ (không dùng nữa)
Remove-Item -Recurse -Force assets

# Commit và push
git add .
git commit -m "Migrate to Firebase cloud storage with Google login"
git push
```

### Bước 3: Cấu hình Domain

Trong Firebase Console:
- Authentication → Settings → Authorized domains
- Thêm: `anhnvt4620.github.io`

### Bước 4: Truy cập

https://anhnvt4620.github.io/anhnvt/

## 📱 Features

- **Login:** Chỉ hỗ trợ Google (dễ, nhanh, an toàn)
- **Games:** Lưu/Load trò chơi từ cloud
- **Settings:** Theme, AI config sync trên cloud
- **No Discord/Donate buttons:** Giao diện sạch sẽ

## 🏗️ Cấu trúc

```
anhnvt/
├── index.html          # Giao diện với login screen
├── app.js              # Firebase logic + Storage Manager
├── manifest.json       # PWA config
├── service-worker.js   # Offline support
├── icons/              # App icons
└── FIREBASE-SETUP.md   # Hướng dẫn setup
```

## 💾 Data Structure

### Games Collection
```javascript
{
  id: "auto-generated",
  userId: "user-uid",
  title: "Tên game",
  description: "Mô tả",
  content: {...},
  createdAt: "2026-01-07T...",
  updatedAt: "2026-01-07T..."
}
```

### Settings Collection
```javascript
{
  id: "userId_settingKey",
  userId: "user-uid",
  key: "theme",
  value: "dark",
  updatedAt: "2026-01-07T..."
}
```

## 🔒 Security

- **Firebase Auth:** Chỉ authenticated users mới truy cập được
- **Firestore Rules:** User chỉ đọc/ghi data của mình
- **No API Keys exposed:** Config public nhưng rules bảo vệ data

## 📊 Firebase Quotas (Free Tier)

- Auth: 10K verifications/tháng
- Firestore: 1 GB storage
- Reads: 50K/ngày
- Writes: 20K/ngày

**Đủ cho hàng nghìn users!**

## 🐛 Known Issues

1. **First load slow:** Firebase SDK ~200KB
   - Giải pháp: Cache service worker
   
2. **Offline không hoạt động:** Cần internet để đăng nhập
   - Giải pháp: Sau khi login, offline vẫn chạy được

## 🔄 Migration từ version cũ

Nếu bạn đã có data trong IndexedDB (version cũ):

1. Mở version cũ
2. Export data (nút Export)
3. Login vào version mới
4. Import data (sẽ tự động sync lên cloud)

## 🎯 Roadmap

- [ ] Add email/password login
- [ ] Offline sync queue
- [ ] Share games với friends
- [ ] Public gallery
- [ ] AI chat history cloud backup

---

Made with ❤️ for cloud-based storytelling
