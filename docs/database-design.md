# Thiết kế Cơ sở Dữ liệu

Tên cơ sở dữ liệu: `ebookhub_store_db`

### Các bảng dự kiến đầy đủ:

1. users
2. roles
3. user_roles
4. creator_profiles
5. wallets
6. wallet_transactions
7. wallet_topup_orders
8. genres
9. products
10. product_genres
11. chapters
12. product_submissions
13. discounts
14. wishlist
15. carts
16. cart_items
17. store_orders
18. store_order_items
19. user_library
20. revenue_share_tiers
21. product_revenue_stats
22. creator_earnings
23. creator_settlements
24. reading_progress
25. product_reviews

### Quy tắc lưu trữ tệp quan trọng:

**KHÔNG** lưu trữ trực tiếp các tệp hình ảnh, tệp ebook, tệp PDF, tệp EPUB, hoặc hình ảnh chương truyện trong MySQL.

MySQL chỉ nên lưu trữ:
- URL và metadata (coverImageUrl, coverImagePublicId, fileUrl, filePublicId, etc.)

### Lưu trữ thực tế:
- Phát triển local: `server/uploads`
- Production: Cloudinary
