# Thiết kế API MVP

## Hệ thống
- `GET /api/health`: Kiểm tra trạng thái server.

## Sản phẩm (Product)
- `GET /api/products`: Lấy danh sách sản phẩm.
- `GET /api/products/:id`: Lấy chi tiết sản phẩm.
- `GET /api/products/:productId/chapters`: Lấy danh sách chương của sản phẩm.
- `GET /api/chapters/:id`: Lấy nội dung chương.

## Giỏ hàng (Cart)
- `GET /api/cart`: Lấy giỏ hàng của người dùng.
- `POST /api/cart/items`: Thêm sản phẩm vào giỏ hàng.
- `DELETE /api/cart/items/:productId`: Xóa sản phẩm khỏi giỏ hàng.

## Ví (Wallet)
- `GET /api/wallet`: Xem số dư ví.
- `GET /api/wallet/transactions`: Xem lịch sử giao dịch.

## Đơn hàng (Order)
- `POST /api/orders/checkout`: Thanh toán giỏ hàng.
- `GET /api/orders`: Danh sách đơn hàng.
- `GET /api/orders/:id`: Chi tiết đơn hàng.

## Thư viện (Library)
- `GET /api/library`: Danh sách sản phẩm đã sở hữu.
- `GET /api/library/:productId/chapters`: Đọc các chương đã mua.

## Tải lên (Upload)
- `POST /api/uploads/image`: Tải lên hình ảnh.
- `POST /api/uploads/ebook`: Tải lên tệp ebook.
