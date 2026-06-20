# Hướng dẫn Triển khai

## Frontend
Sử dụng Vercel. Thiết lập biến môi trường:
`VITE_API_URL=https://your-backend-domain.com/api`

## Backend
Sử dụng Render hoặc Railway. Thiết lập các biến môi trường cần thiết (DATABASE_URL, JWT_SECRET, Cloudinary credentials, etc.)

## Database
Sử dụng Cloud MySQL (Railway, Aiven, RDS, etc.). Chạy migrate:
`npx prisma migrate deploy`
`npx prisma generate`
`node prisma/seed.js`

## Cloudinary
Cần cấu hình Cloudinary cho môi trường Production để lưu trữ tệp.
với `UPLOAD_DRIVER=cloudinary`.
