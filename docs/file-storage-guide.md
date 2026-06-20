# Hướng dẫn Lưu trữ Tệp

## Cách tiếp cận SAI
Lưu trực tiếp dữ liệu nhị phân (binary) của ảnh hoặc tệp ebook vào MySQL.

## Cách tiếp cận ĐÚNG
Lưu tệp vào bộ nhớ lưu trữ tệp (File Storage).

- **Phát triển local:** Tệp được tải lên `server/uploads`.
- **Production:** Tệp được tải lên Cloudinary.

## MySQL lưu trữ gì?
MySQL chỉ lưu trữ metadata:
- `coverImageUrl`
- `coverImagePublicId`
- `fileUrl`
- `filePublicId`
...
