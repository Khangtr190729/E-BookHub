# E-BookHub Monorepo 🚀

Dự án E-BookHub là một nền tảng trực tuyến dành cho việc mua bán và đọc sách điện tử, tiểu thuyết và truyện tranh. Giao diện được thiết kế lấy cảm hứng từ **Steam Desktop App** với chế độ tối (Dark Mode) hiện đại và chuyên nghiệp.

## 🏗 Cấu trúc Dự án
- `client/`: Frontend được xây dựng bằng React, Vite, Tailwind CSS v4.
- `server/`: Backend sử dụng Node.js, Express.js và Prisma ORM.
- `docs/`: Tài liệu chi tiết về thiết kế API, Database và hướng dẫn phát triển.
- `database/`: Cấu hình Docker để chạy MySQL local nhanh chóng.

## 🌟 Tính năng MVP hiện tại (V1.0)
- **Giao diện Steam Style:** Tông màu tối (Dark Navy/Blue), card sản phẩm và trang chi tiết mô phỏng Steam.
- **Cửa hàng & Sản phẩm:** Xem danh sách, chi tiết sản phẩm, thể loại và danh sách chương.
- **Giỏ hàng:** Thêm/Xóa sản phẩm, tính tổng tiền.
- **Thanh toán bằng ví:** Trừ số dư ví nội bộ, tạo đơn hàng và cấp quyền đọc sách.
- **Thư viện cá nhân:** Quản lý các tác phẩm đã sở hữu.
- **Trình đọc sách:** Đọc chương miễn phí hoặc chương đã mua với giao diện tập trung.
- **Hệ thống Upload:** Hỗ trợ tải ảnh bìa và ebook lên Local hoặc Cloudinary.

## 🛠 Hướng dẫn Cài đặt & Chạy dự án

### 1. Cài đặt Dependencies
Từ thư mục gốc:
```powershell
npm install
npm run install:all
```

### 2. Thiết lập Môi trường (.env)
- **Backend:** Tạo `server/.env` từ `server/.env.example`.
  - Cập nhật `DATABASE_URL` với mật khẩu MySQL của bạn (ví dụ: `123456`).
  - Nếu muốn dùng Cloudinary, hãy điền thông tin API và đổi `UPLOAD_DRIVER="cloudinary"`.
- **Frontend:** Tạo `client/.env` từ `client/.env.example`.

### 3. Khởi tạo Database (MySQL)
Nếu bạn dùng MySQL trên máy:
```powershell
cd server
npx prisma migrate dev --name init_mvp_schema
npm run prisma:seed
```

### 4. Chạy dự án
Từ thư mục gốc:
```powershell
npm run dev
```
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)

## ☁️ Hướng dẫn sử dụng Cloudinary
E-BookHub hỗ trợ lưu trữ ảnh bìa và file ebook trên Cloudinary để sẵn sàng cho môi trường Production.
1. Đăng ký tài khoản tại [Cloudinary](https://cloudinary.com/).
2. Lấy `Cloud Name`, `API Key` và `API Secret` tại Dashboard.
3. Điền vào `server/.env`.
4. Khi chạy local, hãy đảm bảo `UPLOAD_DRIVER="local"` nếu chưa có key.

## 📖 Trình đọc sách (Reader)
- **Sách chữ:** Hiển thị nội dung văn bản thuần túy, giãn dòng đẹp mắt.
- **Truyện tranh:** Tự động hiển thị ảnh chương (nếu có `imageUrl`).
- **E-Book (PDF/EPUB):** Hỗ trợ lưu trữ link file để người dùng tải về sau khi mua.

## ⚠️ Lưu ý Quan trọng
- Hệ thống hiện đang chạy ở chế độ **Demo User** (ID: 1). Bạn sẽ mặc định là "Độc Giả Số 1" với 500,000đ trong ví để thử nghiệm luồng mua hàng.
- Tất cả các văn bản hiển thị (UI) đều là Tiếng Việt.
- Không lưu file binary trực tiếp vào Database.

---
*Phát triển bởi Đội ngũ Advanced Coding Agent.*
