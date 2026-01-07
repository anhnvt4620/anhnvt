# 🔥 Setup Firebase cho Tam Thiên Thế Giới

Hướng dẫn cấu hình Firebase để lưu data trên cloud miễn phí.

## Bước 1: Tạo Firebase Project

1. Truy cập **https://console.firebase.google.com/**
2. Click **"Add project"** hoặc **"Create a project"**
3. Đặt tên project: `tamthien-thegioi`
4. Tắt Google Analytics (không bắt buộc) → **Continue**
5. Đợi vài giây → **Continue**

## Bước 2: Tạo Web App

1. Trong Firebase Console, click icon **</>** (Web)
2. App nickname: `Tam Thien Web App`
3. Tích **"Also set up Firebase Hosting"**
4. Click **"Register app"**

## Bước 3: Lấy Firebase Config

1. Sau khi đăng ký, bạn sẽ thấy **firebaseConfig** object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "tamthien-xxx.firebaseapp.com",
  projectId: "tamthien-xxx",
  storageBucket: "tamthien-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

2. **Copy toàn bộ config này**
3. Continue to console

## Bước 4: Bật Authentication

1. Trong Firebase Console, menu bên trái → **Authentication**
2. Click **"Get started"**
3. Tab **"Sign-in method"**
4. Click **Google** → **Enable** → Save

## Bước 5: Tạo Firestore Database

1. Menu bên trái → **Firestore Database**
2. Click **"Create database"**
3. Chọn location: `asia-southeast1` (Singapore) hoặc gần bạn nhất
4. **Start in production mode** → Next
5. Click **"Enable"**

## Bước 6: Cấu hình Firestore Rules

1. Tab **"Rules"**
2. Paste rules sau:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Games collection - chỉ user có thể đọc/ghi games của mình
    match /games/{gameId} {
      allow read, write: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
    
    // Settings collection - chỉ user có thể đọc/ghi settings của mình
    match /settings/{settingId} {
      allow read, write: if request.auth != null && settingId.matches(request.auth.uid + '_.*');
    }
  }
}
```

3. Click **"Publish"**

## Bước 7: Cập nhật Code

1. Mở file `app.js`
2. Tìm dòng `const firebaseConfig = {`
3. **Thay thế** toàn bộ config bằng config bạn copy ở Bước 3:

```javascript
// Thay đổi từ:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  // ...
};

// Thành config thực của bạn:
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",  // Config thực từ Firebase
  authDomain: "tamthien-xxx.firebaseapp.com",
  // ...
};
```

4. Save file

## Bước 8: Deploy lên GitHub Pages

```powershell
# Backup file cũ
mv index.html index-old.html

# Sử dụng file mới
mv index-new.html index.html

# Commit và push
git add .
git commit -m "Add Firebase authentication and cloud storage"
git push
```

## Bước 9: Test

1. Đợi 1-2 phút để GitHub Pages deploy
2. Truy cập: https://anhnvt4620.github.io/anhnvt/
3. Click **"Đăng nhập với Google"**
4. Chọn tài khoản Google
5. Cho phép truy cập

✅ **Xong!** Data giờ được lưu trên Firebase thay vì local!

## ✨ Ưu điểm

- ✅ **Lưu trữ cloud:** Data không mất khi xóa browser cache
- ✅ **Đồng bộ:** Login trên nhiều thiết bị, data vẫn giống nhau
- ✅ **Bảo mật:** Mỗi user chỉ thấy data của mình
- ✅ **Miễn phí:** Firebase Free tier đủ dùng cho project nhỏ
- ✅ **Realtime:** Data update tự động không cần refresh

## 📊 Firebase Free Tier Limits

- **Authentication:** 10,000 verifications/tháng
- **Firestore:** 
  - 1 GB storage
  - 50,000 reads/ngày
  - 20,000 writes/ngày
  - 20,000 deletes/ngày

Đủ cho **hàng nghìn người dùng**!

## 🔧 Troubleshooting

### Lỗi: "Firebase: Error (auth/unauthorized-domain)"

Giải pháp:
1. Firebase Console → Authentication → Settings
2. Tab **"Authorized domains"**
3. Click **"Add domain"**
4. Thêm: `anhnvt4620.github.io`
5. Save

### Lỗi: "Missing or insufficient permissions"

Giải pháp: Kiểm tra lại Firestore Rules (Bước 6)

### Login popup bị block

Giải pháp: Cho phép popups cho domain github.io trong browser settings

## 📚 Tài liệu

- Firebase Docs: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/
- Firestore Rules: https://firebase.google.com/docs/firestore/security/get-started

---

**Chúc bạn setup thành công! 🎉**
