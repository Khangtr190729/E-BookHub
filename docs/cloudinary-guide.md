# Hướng dẫn sử dụng Cloudinary cho E-BookHub ☁️

Tài liệu này hướng dẫn chi tiết cách tích hợp và sử dụng Cloudinary để quản lý hình ảnh và tệp tin cho dự án E-BookHub một cách an toàn và chuyên nghiệp.

---

## PHẦN 1: Tạo tài khoản Cloudinary & Lấy API Keys

### 1. Đăng ký & Đăng nhập
- Truy cập [Cloudinary.com](https://cloudinary.com/).
- Nhấn **Sign Up for Free** hoặc **Log In** nếu đã có tài khoản.

### 2. Truy cập Dashboard
- Sau khi đăng nhập, bạn sẽ được đưa đến trang **Console** (hoặc Dashboard).
- Đây là nơi hiển thị tổng quan về dung lượng lưu trữ và băng thông đã sử dụng.

### 3. Tìm thông tin API
Tại mục **Product Environment Settings** (thường nằm ở góc cột trái hoặc trên Dashboard), bạn sẽ thấy 3 thông tin quan trọng:
- **Cloud name**: Tên định danh của bạn.
- **API Key**: Khóa công khai.
- **API Secret**: Khóa bí mật (Cực kỳ quan trọng).

### 4. Thiết lập file `server/.env`
Mở file `server/.env` và điền thông tin bạn vừa lấy được:
```env
UPLOAD_DRIVER="cloudinary"

CLOUDINARY_CLOUD_NAME="tên_cloud_của_bạn"
CLOUDINARY_API_KEY="key_của_bạn"
CLOUDINARY_API_SECRET="secret_của_bạn"
```

### 5. Tại sao `CLOUDINARY_API_SECRET` phải ở Backend?
- **Bảo mật:** Nếu bạn đưa Secret vào React (Frontend), bất kỳ ai f12/inspect cũng có thể lấy được và xóa sạch dữ liệu trên Cloudinary của bạn.
- **Quyền hạn:** Chỉ Backend mới có quyền ra lệnh cho Cloudinary tải lên (upload) hoặc xóa (delete) dữ liệu thông qua khóa bí mật này.

### 6. Không bao giờ commit `.env` lên GitHub
- Luôn thêm `.env` vào file `.gitignore`.
- Nếu lỡ để lộ API Secret, hãy vào Cloudinary Dashboard và nhấn "Regenerate" để đổi khóa mới.

---

## PHẦN 2: Cấu trúc thư mục (Folders) khuyến nghị

Để quản lý hàng ngàn tệp tin, hãy chia thư mục trên Cloudinary như sau:
- `ebookhub/covers`: Chứa ảnh bìa sách/tiểu thuyết/truyện tranh.
- `ebookhub/chapters`: Chứa ảnh minh họa cho các chương truyện chữ.
- `ebookhub/comic-pages`: Chứa các trang của truyện tranh (Comic/Manga).
- `ebookhub/avatars`: Ảnh đại diện của người dùng.
- `ebookhub/banners`: Ảnh bìa/banner của các tác giả (Creator).
- `ebookhub/ebooks`: Tệp tin PDF hoặc EPUB (lưu dạng `raw`).

---

## PHẦN 3: Cách lấy hình ảnh/tệp tin hợp pháp ⚖️

**NGHIÊM CẤM:** Không hướng dẫn tải lậu, cào dữ liệu (scrape) hoặc sao chép hình ảnh có bản quyền từ các website khác mà không được phép.

### Các nguồn hợp pháp:
1. **Nội dung tự sáng tạo:** Bạn tự vẽ bìa, tự thiết kế chương ảnh hoặc tự viết nội dung.
2. **Nội dung do người dùng tải lên:** Tác giả (Creators) trên hệ thống tự tải lên các tác phẩm do họ sở hữu.
3. **Nội dung công cộng (Public Domain):** Các tác phẩm kinh điển đã hết hạn bản quyền hoặc được cấp phép tự do (như CC BY-SA).
4. **Nội dung có bản quyền/giấy phép:** Chỉ sử dụng khi bạn đã mua bản quyền hoặc có thỏa thuận phân phối.
5. **Dữ liệu mẫu (Placeholders):** Trong quá trình phát triển, hãy dùng các URL ảnh mẫu từ Unsplash hoặc Placeholder.com.

---

## PHẦN 4: Tải lên thủ công qua Dashboard

Nếu bạn muốn tạo dữ liệu mẫu (Seed) mà chưa có giao diện Admin:
1. Vào **Media Library** trên Cloudinary.
2. Tạo thư mục: `ebookhub/covers`.
3. Nhấn **Upload** và chọn ảnh từ máy tính.
4. Sau khi tải xong, nhấn vào biểu tượng **Chain Link** (Copy URL) để lấy link ảnh.
5. Link sẽ có dạng: `https://res.cloudinary.com/.../ebookhub/covers/my-book.jpg`
6. `Public ID` sẽ là: `ebookhub/covers/my-book`

---

## PHẦN 5: Tải lên qua API Backend (Node.js)

Chúng tôi sử dụng **Multer** để nhận tệp từ Frontend và **Cloudinary SDK** để đẩy tệp lên mây.

### 1. Route (`server/src/modules/upload/upload.route.js`)
```javascript
const express = require('express');
const router = express.Router();
const uploadController = require('./upload.controller');
const uploadMiddleware = require('./upload.middleware');

router.post('/image', uploadMiddleware.single('file'), uploadController.uploadImage);
router.post('/ebook', uploadMiddleware.single('file'), uploadController.uploadEbook);

module.exports = router;
```

### 2. Service (`server/src/modules/upload/upload.service.js`)
```javascript
const uploadToCloudinary = async (file, type) => {
  const folder = type === 'image' ? 'ebookhub/images' : 'ebookhub/ebooks';
  const resourceType = type === 'image' ? 'image' : 'raw';

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          // ...metadata khác
        });
      }
    );
    uploadStream.end(file.buffer);
  });
};
```

---

## PHẦN 6: Tải lên từ Frontend (React)

Sử dụng `uploadService.js` để gửi yêu cầu tải lên.

### 1. Service (`client/src/services/uploadService.js`)
```javascript
import api from './api';

export const uploadService = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/uploads/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }
};
```

### 2. Component sử dụng:
```javascript
const [selectedFile, setSelectedFile] = useState(null);

const handleUpload = async () => {
  const data = await uploadService.uploadImage(selectedFile);
  const imageUrl = data.data.url;
  // Gửi imageUrl này sang API tạo Product
};
```

---

## PHẦN 7: Lưu URL vào MySQL (Prisma)

**Lưu ý:** Không lưu file binary (chuỗi base64 khổng lồ) vào MySQL vì sẽ làm chậm Database cực nhanh.

### Ví dụ Schema Product:
```prisma
model Product {
  id                 Int      @id @default(autoincrement())
  coverImageUrl      String?  // VD: https://res.cloudinary.com/.../cover.jpg
  coverImagePublicId String?  // VD: ebookhub/covers/abcxyz
  fileUrl            String?  // VD: Link PDF đã upload
  filePublicId       String?
  // ...
}
```

---

## PHẦN 8: Hiển thị hình ảnh trên website

Trong React, bạn chỉ cần dùng thẻ `<img>` bình thường:
```javascript
// Hiển thị bìa sách
<img src={product.coverImageUrl} alt={product.title} className="w-full h-auto" />

// Nút mở tệp PDF (Chỉ cho người đã mua)
<a href={product.fileUrl} target="_blank" className="bg-blue-500 text-white px-4 py-2">
  Mở tệp E-Book
</a>
```

---

## PHẦN 9: Luồng hoạt động khuyến nghị (Flow)

1. **Admin** chọn ảnh bìa -> Frontend gửi `FormData` (tệp tin) lên Backend.
2. **Backend** nhận tệp -> Upload lên Cloudinary -> Nhận lại `secure_url` và `public_id`.
3. **Backend** trả `secure_url` về cho Frontend.
4. **Admin** nhấn "Lưu sản phẩm" -> Frontend gửi thông tin sách kèm theo `secure_url` vừa nhận.
5. **Database** lưu lại chuỗi URL của ảnh bìa.
6. **Người dùng** vào trang web -> Frontend gọi API lấy thông tin sách -> Gán URL vào thẻ `src` của ảnh.

---

## PHẦN 10: Local vs Production

- **Local Development:** Bạn có thể dùng `UPLOAD_DRIVER="local"` để lưu tệp vào thư mục `server/uploads` (Nhanh và không tốn băng thông internet).
- **Production:** Bắt buộc dùng `UPLOAD_DRIVER="cloudinary"` vì các server như Render/Heroku sẽ tự động xóa sạch file của bạn sau mỗi lần khởi động lại nếu lưu trên đĩa local.

---

## PHẦN 11: Mở rộng trong tương lai

- **Cloudinary:** Rất tốt cho hình ảnh và tệp ebook nhỏ.
- **S3 (AWS) / DigitalOcean Spaces:** Phù hợp hơn nếu thư viện của bạn có hàng triệu file PDF/EPUB dung lượng lớn (vài trăm MB mỗi file) vì chi phí lưu trữ tệp thô rẻ hơn Cloudinary.

---

## PHẦN 12: Danh sách kiểm tra (Checklist) ✔️

1. [ ] Tạo tài khoản Cloudinary.
2. [ ] Lấy Cloud Name, API Key, API Secret.
3. [ ] Cấu hình `server/.env`.
4. [ ] Cấu hình `server/src/config/cloudinary.js`.
5. [ ] Tạo API Upload ở Backend.
6. [ ] Tạo hàm Upload ở Frontend Service.
7. [ ] Thử nghiệm Upload 1 ảnh và kiểm tra trên Cloudinary Media Library.
8. [ ] Lưu URL nhận được vào Database.
9. [ ] Hiển thị ảnh thành công dưới giao diện Steam-style.
10. [ ] Kiểm soát quyền truy cập file tệp tin (chỉ cho phép user đã mua).
