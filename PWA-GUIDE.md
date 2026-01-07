# 📱 Hướng Dẫn Cài Đặt Mobile App

Ứng dụng **Tam Thiên Thế Giới** hiện đã hỗ trợ Progressive Web App (PWA) - có thể cài đặt như một ứng dụng native trên điện thoại!

## ✨ Tính Năng PWA

- ✅ **Cài đặt trên Home Screen** như app thật
- ✅ **Hoạt động offline** (sau khi tải lần đầu)
- ✅ **Toàn màn hình** (không có thanh địa chỉ)
- ✅ **Nhanh hơn** với cache và service worker
- ✅ **Notifications** (sẵn sàng cho tính năng tương lai)
- ✅ **Background Sync** (đồng bộ khi online trở lại)

## 📲 Cách Cài Đặt

### **Android (Chrome/Edge)**
1. Mở trang web trong Chrome
2. Nhấn vào menu ⋮ (3 chấm)
3. Chọn "Thêm vào màn hình chính" hoặc "Cài đặt ứng dụng"
4. Xác nhận cài đặt
5. Icon sẽ xuất hiện trên Home Screen!

### **iOS (Safari)**
1. Mở trang web trong Safari
2. Nhấn nút Chia sẻ 📤 (ở dưới cùng)
3. Cuộn xuống và chọn "Thêm vào Màn hình chính"
4. Đặt tên và nhấn "Thêm"
5. Icon sẽ xuất hiện trên Home Screen!

### **Desktop (Chrome/Edge)**
1. Vào trang web
2. Nhấn vào icon ➕ trên thanh địa chỉ
3. Hoặc menu ⋮ → "Cài đặt Tam Thiên Thế Giới..."
4. App sẽ mở như ứng dụng độc lập!

## 🎨 Tạo Icons

Hiện tại đã có file SVG mẫu. Để tạo đầy đủ icons PNG:

### **Cách 1: Sử dụng Tool Online**
1. Mở https://www.pwabuilder.com/imageGenerator
2. Upload file `icons/icon-512x512.svg`
3. Tải về bộ icons đầy đủ
4. Copy vào thư mục `/icons/`

### **Cách 2: Sử dụng ImageMagick**
```bash
# Install ImageMagick first
# Windows: choco install imagemagick
# Mac: brew install imagemagick

# Chuyển SVG sang PNG các kích thước
magick convert icons/icon-512x512.svg -resize 72x72 icons/icon-72x72.png
magick convert icons/icon-512x512.svg -resize 96x96 icons/icon-96x96.png
magick convert icons/icon-512x512.svg -resize 128x128 icons/icon-128x128.png
magick convert icons/icon-512x512.svg -resize 144x144 icons/icon-144x144.png
magick convert icons/icon-512x512.svg -resize 152x152 icons/icon-152x152.png
magick convert icons/icon-512x512.svg -resize 192x192 icons/icon-192x192.png
magick convert icons/icon-512x512.svg -resize 384x384 icons/icon-384x384.png
magick convert icons/icon-512x512.svg -resize 512x512 icons/icon-512x512.png
```

### **Cách 3: Sử dụng Online Tool Khác**
- https://realfavicongenerator.net/
- https://favicon.io/
- https://www.favicon-generator.org/

## 🚀 Deploy để Test PWA

PWA cần chạy qua HTTPS để hoạt động đầy đủ. Options:

### **1. GitHub Pages (Miễn phí)**
```bash
# Push code lên GitHub
git init
git add .
git commit -m "PWA ready"
git branch -M main
git remote add origin https://github.com/yourusername/tamthien.git
git push -u origin main

# Vào Settings → Pages → Source: main branch
# URL: https://yourusername.github.io/tamthien/
```

### **2. Netlify (Miễn phí)**
1. Đăng ký tài khoản https://netlify.com
2. Kéo thả thư mục project vào Netlify
3. Done! PWA sẽ hoạt động ngay

### **3. Vercel (Miễn phí)**
```bash
npm install -g vercel
vercel --prod
```

### **4. Test Local với HTTPS**
```bash
# Install http-server
npm install -g http-server

# Chạy với SSL
http-server -S -C cert.pem -K key.pem -p 8080
```

## 🔧 Testing PWA

### **Chrome DevTools**
1. Mở DevTools (F12)
2. Tab "Application"
3. Kiểm tra:
   - ✅ Manifest
   - ✅ Service Workers
   - ✅ Cache Storage
   - ✅ Installability

### **Lighthouse Audit**
1. DevTools → Lighthouse tab
2. Chọn "Progressive Web App"
3. Click "Generate report"
4. Score nên > 90

## 📝 Checklist PWA

- ✅ manifest.json
- ✅ service-worker.js
- ✅ Icons (72x72 đến 512x512)
- ✅ Meta tags cho mobile
- ✅ Theme color
- ✅ HTTPS (khi deploy)
- ✅ Responsive design
- ✅ Offline support
- ✅ Install prompt

## 🎯 Tính Năng Sẽ Thêm

- [ ] Push Notifications cho story updates
- [ ] Background Sync cho auto-save
- [ ] Share API để chia sẻ stories
- [ ] File System API để export/import
- [ ] Web Speech API cho đọc truyện
- [ ] Vibration API cho effects

## 🆘 Troubleshooting

**Không thấy Install Prompt?**
- Đảm bảo chạy qua HTTPS
- Clear cache và reload
- Kiểm tra manifest.json trong DevTools

**Service Worker không hoạt động?**
- Kiểm tra Console có lỗi không
- Đảm bảo đường dẫn `/service-worker.js` đúng
- Unregister và register lại

**Icons không hiển thị?**
- Tạo đầy đủ icons PNG từ SVG
- Kiểm tra đường dẫn trong manifest.json
- Clear cache

## 📱 Kết Quả

Sau khi cài đặt:
- App xuất hiện với icon đẹp trên Home Screen
- Mở app sẽ toàn màn hình, không có thanh địa chỉ
- Hoạt động mượt mà như native app
- Có thể dùng offline (sau lần đầu)
- Tự động update khi có version mới

---

**Chúc bạn thành công với Mobile App! 🎉**
