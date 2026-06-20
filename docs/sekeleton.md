You are a Senior Full-stack Engineer.

Generate a production-ready monorepo project named `ebookhub`.

Use JavaScript only.
Do NOT use TypeScript.

The user already has a local MySQL database named:

ebookhub_store_db

Use this database name in all local development examples.

Important UI requirement:
All frontend UI labels, buttons, headings, messages, placeholders, validation messages, errors, empty states, and visible text must be in Vietnamese.

Project goal:
E-BookHub is an online platform for selling and reading e-books, novels, comics, and chapters.

The system includes:

- Store
- Product listing
- Product detail
- Cart
- Internal wallet
- Wallet top-up order
- Checkout
- Orders
- Purchased library
- Reading chapters
- Reading progress
- Creator area
- Admin area
- Submission review
- Wishlist
- Product reviews
- Creator revenue
- Creator settlements
- Revenue share tiers
- Discounts

Main roles:

- USER: browse products, buy products, read chapters, review products, manage wishlist.
- CREATOR: publish books/stories/comics, manage chapters, submit drafts, view revenue.
- ADMIN: review submissions, manage users, manage products, manage the system.

MVP flow:

User browses products -> views product detail -> adds product to cart -> pays using internal wallet -> system creates order -> system deducts wallet balance -> product is added to user library -> user reads purchased chapters.

Tech stack:

Frontend:

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Zod
- TanStack Query
- Zustand

Backend:

- Node.js
- Express.js
- MySQL
- Prisma
- JWT
- bcrypt
- Zod
- Multer
- Cloudinary

Tools:

- ESLint
- Prettier
- Git/GitHub

Do NOT use:

- TypeScript
- MongoDB
- Postman
- Bruno

Main requirements:

- Create a clean enterprise-style project structure.
- Use a monorepo structure with `client`, `server`, `docs`, and `database`.
- Backend must be modular by business domain.
- Route files only define endpoints.
- Controllers only handle request/response.
- Services contain business logic.
- Prisma queries must be inside services.
- Controllers must not call Prisma directly.
- Use consistent API response format.
- Use centralized error handling middleware.
- Use Zod validation.
- Frontend must be organized into pages, components, services, hooks, stores, schemas, layouts, and utils.
- Do not put everything inside `App.jsx`.
- Do not hard-code API URLs inside components.
- Do not call Axios directly inside components when a service exists.
- Use centralized API service.
- Prepare the MVP flow first: Product -> Cart -> Wallet -> Checkout -> Library -> Reader.
- Create skeleton modules for Auth, User, Creator, and Admin, but do not over-engineer authentication at the beginning.
- The project must run after setup.

Important database name rule:

Local database name must be:

ebookhub_store_db

Local DATABASE_URL example:

mysql://root:password@localhost:3306/ebookhub_store_db

Important file storage rule:

Do not store image files, ebook files, PDF files, EPUB files, comic page images, or chapter images directly in MySQL.

MySQL should store only file URLs and metadata.

Examples:

- coverImageUrl
- coverImagePublicId
- fileUrl
- filePublicId
- imageUrl
- imagePublicId
- avatarUrl
- avatarPublicId
- bannerUrl
- bannerPublicId
- storageKey
- mimeType
- fileSize
- originalName
- uploadedAt

Actual files should be stored in:

Local development:

- server/uploads

Production:

- Cloudinary

Cloudinary must be used for production image/file storage preparation.

Use Cloudinary for:

- Book cover images
- Comic cover images
- Chapter illustration images
- Comic page images
- User avatars
- Creator banners
- Product preview images
- Optional ebook files for MVP

For long-term large PDF/EPUB storage, mention that AWS S3 or DigitalOcean Spaces may be more suitable, but for MVP Cloudinary is acceptable.

Cloudinary rule:

- Do not expose CLOUDINARY_API_SECRET to the frontend.
- Only backend can use Cloudinary API secret.
- Frontend only receives final public URLs from backend API.
- Store only Cloudinary `secure_url` and `public_id` in MySQL.

Recommended Cloudinary folders:

- ebookhub/covers
- ebookhub/chapters
- ebookhub/comic-pages
- ebookhub/avatars
- ebookhub/banners
- ebookhub/ebooks

Root structure:

ebookhub/
├── client/
├── server/
├── docs/
├── database/
├── README.md
├── .gitignore
├── .prettierrc
├── .prettierignore
└── package.json

Root `.gitignore`:

node_modules
.env
.env.local
.env.production
dist
build
uploads
.DS_Store
.vscode
.idea

Root `package.json`:

{
  "name": "ebookhub",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\"",
    "dev:server": "npm run dev --prefix server",
    "dev:client": "npm run dev --prefix client",
    "install:all": "npm install && npm install --prefix server && npm install --prefix client",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "concurrently": "latest",
    "prettier": "latest"
  }
}

Create root `.prettierrc`:

{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}

Create root `.prettierignore`:

node_modules
dist
build
uploads

Create docs:

docs/
├── project-overview.md
├── user-flow.md
├── database-design.md
├── api-design.md
├── development-guide.md
├── deployment-guide.md
└── file-storage-guide.md

`docs/project-overview.md` content:

# E-BookHub

E-BookHub is an online platform for selling and reading e-books, novels, comics, and chapters.

Main roles:

- USER: browse products, buy products, read chapters, review products, manage wishlist.
- CREATOR: publish books/stories/comics, manage chapters, submit drafts, view revenue.
- ADMIN: review submissions, manage users, manage products, manage the system.

MVP flow:

User browses products -> views product detail -> adds product to cart -> pays using internal wallet -> product is added to library -> user reads purchased chapters.

`docs/user-flow.md` content:

# User Flow MVP

1. User views product list.
2. User views product detail.
3. User adds product to cart.
4. User views cart.
5. User pays using wallet.
6. System checks wallet balance.
7. System creates order.
8. System deducts wallet balance.
9. System creates wallet transaction.
10. System adds product to user library.
11. System clears cart.
12. User opens library.
13. User reads purchased chapters.

`docs/database-design.md` content:

# Database Design

Database name:

ebookhub_store_db

Full planned tables:

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

MVP tables:

- users
- wallets
- wallet_transactions
- genres
- products
- product_genres
- chapters
- carts
- cart_items
- store_orders
- store_order_items
- user_library

Advanced planned tables:

- roles
- user_roles
- creator_profiles
- wallet_topup_orders
- product_submissions
- discounts
- wishlist
- revenue_share_tiers
- product_revenue_stats
- creator_earnings
- creator_settlements
- reading_progress
- product_reviews

Important file storage rule:

Do not store image files, ebook files, PDF files, EPUB files, comic page images, or chapter image files directly in MySQL.

MySQL should store only:

- coverImageUrl
- coverImagePublicId
- fileUrl
- filePublicId
- imageUrl
- imagePublicId
- avatarUrl
- avatarPublicId
- bannerUrl
- bannerPublicId
- storageKey
- mimeType
- fileSize
- originalName
- uploadedAt

Actual files should be stored in:

Local development:

- server/uploads

Production:

- Cloudinary

`docs/api-design.md` content:

# API Design MVP

## Health

GET /api/health

## Product

GET /api/products
GET /api/products/:id
GET /api/products/:productId/chapters
GET /api/chapters/:id

## Cart

GET /api/cart
POST /api/cart/items
DELETE /api/cart/items/:productId

## Wallet

GET /api/wallet
GET /api/wallet/transactions

## Order

POST /api/orders/checkout
GET /api/orders
GET /api/orders/:id

## Library

GET /api/library
GET /api/library/:productId/chapters

## Upload

POST /api/uploads/image
POST /api/uploads/ebook

For MVP, upload routes can be basic local/Cloudinary upload APIs.

Use Multer to receive files.
Use Cloudinary for production upload.
Store only file URL and metadata in MySQL.

## Auth - after MVP

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

## User - skeleton

GET /api/users/me

## Creator - skeleton

GET /api/creator/dashboard

## Admin - skeleton

GET /api/admin/dashboard

`docs/development-guide.md` content:

# Development Guide

Development order:

1. Setup project structure.
2. Setup Express backend.
3. Setup Prisma + MySQL.
4. Create MVP schema.
5. Seed sample data.
6. Implement Product API.
7. Setup React frontend.
8. Implement Product UI.
9. Implement Cart.
10. Implement Wallet.
11. Implement Checkout.
12. Implement Library.
13. Implement Reader.
14. Add local upload with Multer.
15. Add Cloudinary upload service.
16. After MVP, implement Auth, Role, Creator, Admin, Review, Wishlist, Revenue.

Backend setup:

Create `server/` as a Node.js Express project.

Install backend dependencies:

express
cors
dotenv
@prisma/client
zod
jsonwebtoken
bcrypt
multer
helmet
morgan
cookie-parser
cloudinary

Install backend devDependencies:

nodemon
prisma
eslint
prettier

Backend structure:

server/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   ├── env.js
│   │   ├── prisma.js
│   │   └── cloudinary.js
│   ├── constants/
│   │   ├── roles.js
│   │   ├── orderStatus.js
│   │   ├── productStatus.js
│   │   └── walletTransactionType.js
│   ├── modules/
│   │   ├── health/
│   │   │   ├── health.route.js
│   │   │   └── health.controller.js
│   │   ├── product/
│   │   │   ├── product.route.js
│   │   │   ├── product.controller.js
│   │   │   ├── product.service.js
│   │   │   └── product.validation.js
│   │   ├── cart/
│   │   │   ├── cart.route.js
│   │   │   ├── cart.controller.js
│   │   │   ├── cart.service.js
│   │   │   └── cart.validation.js
│   │   ├── wallet/
│   │   │   ├── wallet.route.js
│   │   │   ├── wallet.controller.js
│   │   │   └── wallet.service.js
│   │   ├── order/
│   │   │   ├── order.route.js
│   │   │   ├── order.controller.js
│   │   │   └── order.service.js
│   │   ├── library/
│   │   │   ├── library.route.js
│   │   │   ├── library.controller.js
│   │   │   └── library.service.js
│   │   ├── upload/
│   │   │   ├── upload.route.js
│   │   │   ├── upload.controller.js
│   │   │   ├── upload.service.js
│   │   │   └── upload.middleware.js
│   │   ├── auth/
│   │   │   ├── auth.route.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   ├── user/
│   │   │   ├── user.route.js
│   │   │   ├── user.controller.js
│   │   │   └── user.service.js
│   │   ├── creator/
│   │   │   ├── creator.route.js
│   │   │   ├── creator.controller.js
│   │   │   └── creator.service.js
│   │   └── admin/
│   │       ├── admin.route.js
│   │       ├── admin.controller.js
│   │       └── admin.service.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── demoUser.middleware.js
│   │   ├── error.middleware.js
│   │   ├── notFound.middleware.js
│   │   └── validate.middleware.js
│   ├── routes/
│   │   └── index.js
│   ├── utils/
│   │   ├── response.js
│   │   ├── AppError.js
│   │   ├── asyncHandler.js
│   │   └── generateToken.js
│   ├── app.js
│   └── server.js
├── uploads/
├── .env.example
├── .prettierrc
├── .prettierignore
└── package.json

Backend `package.json` scripts:

{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "prisma:migrate": "npx prisma migrate dev",
    "prisma:studio": "npx prisma studio",
    "prisma:generate": "npx prisma generate",
    "prisma:seed": "node prisma/seed.js",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}

Do not create a real committed production `.env`.
Create `server/.env.example` only.

`server/.env.example`:

PORT=3000
NODE_ENV=development
DATABASE_URL="mysql://root:password@localhost:3306/ebookhub_store_db"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"

UPLOAD_DRIVER="local"
UPLOAD_DIR="uploads"
LOCAL_FILE_BASE_URL="http://localhost:3000/uploads"

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

Production environment variables must be configured on the hosting platform:

NODE_ENV=production
PORT=3000
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/ebookhub_store_db"
JWT_SECRET="strong_production_secret"
JWT_EXPIRES_IN="7d"
CLIENT_URL="https://your-frontend-domain.com"

UPLOAD_DRIVER="cloudinary"

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

Backend core files:

`src/config/env.js`:

- Load dotenv.
- Export port, nodeEnv, databaseUrl, jwtSecret, jwtExpiresIn, clientUrl, uploadDriver, uploadDir, localFileBaseUrl.
- Export Cloudinary env variables.
- Validate required env variables.
- In production, do not allow missing JWT_SECRET, DATABASE_URL, CLIENT_URL, or Cloudinary credentials when UPLOAD_DRIVER is cloudinary.

`src/config/prisma.js`:

- Create and export a PrismaClient instance.

`src/config/cloudinary.js`:

- Configure Cloudinary using environment variables.
- Export configured cloudinary instance.
- Do not expose secrets to frontend.

`src/utils/response.js`:

- Create `successResponse(res, message, data = null, statusCode = 200)`.
- Create `errorResponse(res, message, statusCode = 400, errors = null)`.

Success response format:

{
  "success": true,
  "message": "Message",
  "data": {}
}

Error response format:

{
  "success": false,
  "message": "Error message",
  "errors": null
}

`src/utils/AppError.js`:

- Create custom AppError class with `message`, `statusCode`, and `isOperational`.

`src/utils/asyncHandler.js`:

- Wrap async route handlers and forward errors to `next`.

`src/utils/generateToken.js`:

- Generate JWT token using env config.

Middlewares:

- `error.middleware.js`: centralized error response.
- `notFound.middleware.js`: handle unknown routes.
- `validate.middleware.js`: validate request body, params, and query using Zod.
- `auth.middleware.js`: skeleton for JWT auth.
- `role.middleware.js`: skeleton for role checking.
- `demoUser.middleware.js`: development-only middleware for MVP.

Temporary MVP user:

Before full authentication is implemented, create a development-only demo user middleware.

`demoUser.middleware.js` should attach:

req.user = { id: 1, role: "USER" }

Use it only in development for cart, wallet, order, and library routes.

Add TODO comments explaining this will be replaced by JWT authentication later.

`src/app.js`:

- Setup express.
- Setup helmet.
- Setup cors.
- Setup morgan.
- Setup cookie-parser.
- Parse JSON and URL encoded body.
- Serve `/uploads` statically for local development.
- Add root health message.
- Mount `/api` routes.
- Add notFound and error middlewares.

CORS:

- Backend CORS must use CLIENT_URL from environment variables.
- Do not hard-code localhost in production.
- Do not use wildcard "*" when credentials are enabled.

Example:

cors({
  origin: env.clientUrl,
  credentials: true
})

`src/server.js`:

- Start server using env port.

Prisma schema:

Create `server/prisma/schema.prisma` with MySQL datasource and these MVP + planned models:

- User
- Role
- UserRole
- CreatorProfile
- Wallet
- WalletTransaction
- WalletTopupOrder
- Genre
- Product
- ProductGenre
- Chapter
- ProductSubmission
- Discount
- Wishlist
- Cart
- CartItem
- StoreOrder
- StoreOrderItem
- UserLibrary
- RevenueShareTier
- ProductRevenueStat
- CreatorEarning
- CreatorSettlement
- ReadingProgress
- ProductReview

Use appropriate relations, unique constraints, timestamps, and `@@unique` where needed.

Important unique constraints:

- Wallet.userId unique
- Cart.userId unique
- CreatorProfile.userId unique
- User.email unique
- User.username unique
- Role.name unique
- Genre.slug unique
- Product.slug unique
- ProductGenre composite unique productId + genreId
- CartItem composite unique cartId + productId
- UserLibrary composite unique userId + productId
- Wishlist composite unique userId + productId
- ProductReview composite unique userId + productId if each user can review a product once
- ReadingProgress composite unique userId + productId

Recommended model fields:

User:

- id
- username
- email
- password
- displayName
- avatarUrl nullable
- avatarPublicId nullable
- isActive
- createdAt
- updatedAt

Role:

- id
- name
- description nullable
- createdAt
- updatedAt

UserRole:

- userId
- roleId
- createdAt

CreatorProfile:

- id
- userId
- penName
- bio nullable
- bannerUrl nullable
- bannerPublicId nullable
- status
- createdAt
- updatedAt

Wallet:

- id
- userId
- balance
- createdAt
- updatedAt

WalletTransaction:

- id
- walletId
- type
- amount
- description nullable
- referenceType nullable
- referenceId nullable
- createdAt

WalletTopupOrder:

- id
- userId
- amount
- status
- paymentMethod nullable
- paymentReference nullable
- createdAt
- updatedAt

Genre:

- id
- name
- slug
- createdAt
- updatedAt

Product:

- id
- creatorId nullable
- title
- slug
- authorName
- description
- price
- coverImageUrl nullable
- coverImagePublicId nullable
- fileUrl nullable
- filePublicId nullable
- productType
- status
- createdAt
- updatedAt

ProductGenre:

- productId
- genreId

Chapter:

- id
- productId
- title
- chapterNumber
- content
- imageUrl nullable
- imagePublicId nullable
- isFree
- createdAt
- updatedAt

ProductSubmission:

- id
- productId
- creatorId
- status
- note nullable
- reviewedById nullable
- reviewedAt nullable
- createdAt
- updatedAt

Discount:

- id
- code
- type
- value
- startsAt nullable
- endsAt nullable
- isActive
- createdAt
- updatedAt

Wishlist:

- id
- userId
- productId
- createdAt

Cart:

- id
- userId
- createdAt
- updatedAt

CartItem:

- id
- cartId
- productId
- createdAt
- updatedAt

StoreOrder:

- id
- userId
- totalAmount
- status
- createdAt
- updatedAt

StoreOrderItem:

- id
- orderId
- productId
- price
- createdAt

UserLibrary:

- id
- userId
- productId
- purchasedAt

RevenueShareTier:

- id
- name
- creatorPercent
- platformPercent
- isDefault
- createdAt
- updatedAt

ProductRevenueStat:

- id
- productId
- totalRevenue
- totalSales
- creatorRevenue
- platformRevenue
- updatedAt

CreatorEarning:

- id
- creatorId
- productId
- orderItemId
- amount
- status
- createdAt
- updatedAt

CreatorSettlement:

- id
- creatorId
- amount
- status
- note nullable
- settledAt nullable
- createdAt
- updatedAt

ReadingProgress:

- id
- userId
- productId
- chapterId nullable
- progressPercent
- lastReadAt
- createdAt
- updatedAt

ProductReview:

- id
- userId
- productId
- rating
- comment nullable
- createdAt
- updatedAt

Important database rule:

Do not store actual image binary data, ebook binary data, PDF binary data, EPUB binary data, or base64 files in MySQL.

Store only URLs and metadata.

Seed data:

Create `server/prisma/seed.js`:

- Delete old data in correct relational order.
- Create roles: USER, CREATOR, ADMIN.
- Create user `reader01`.
- Create user `creator01`.
- Create admin user `admin01`.
- Assign roles through user_roles.
- Create creator profile for `creator01`.
- Create wallet for reader with balance 500000.
- Create wallet transaction TOPUP.
- Create genres: Hành động, Kỳ ảo, Lãng mạn, Truyện tranh.
- Create 4 sample products.
- Include at least:
  - 1 ebook
  - 1 novel
  - 1 comic
- Each product has sample chapters.
- All sample UI-facing content must be Vietnamese.
- Use realistic placeholder image URLs for coverImageUrl.
- Do not insert base64 images into the database.

Backend modules:

Implement fully for MVP:

- health
- product
- cart
- wallet
- order checkout
- library
- upload

Create skeleton modules for:

- auth
- user
- creator
- admin

Health API:

GET /api/health

Response:

{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "status": "OK"
  }
}

Product APIs:

GET /api/products
GET /api/products/:id
GET /api/products/:productId/chapters
GET /api/chapters/:id

Product service functions:

- getAllProducts()
- getProductById(id)
- getChaptersByProductId(productId)
- getChapterById(id)

Cart APIs:

GET /api/cart
POST /api/cart/items
DELETE /api/cart/items/:productId

Cart service functions:

- getCartByUserId(userId)
- addItemToCart(userId, productId)
- removeItemFromCart(userId, productId)

Wallet APIs:

GET /api/wallet
GET /api/wallet/transactions

Wallet service functions:

- getWalletByUserId(userId)
- getWalletTransactions(userId)

Order APIs:

POST /api/orders/checkout
GET /api/orders
GET /api/orders/:id

Order service functions:

- checkout(userId)
- getOrdersByUserId(userId)
- getOrderById(userId, orderId)

Checkout:

Checkout must use Prisma transaction.

During checkout:

1. Read user's cart items.
2. Calculate total price.
3. Check wallet balance.
4. Create store order.
5. Create store order items.
6. Deduct wallet balance.
7. Create wallet transaction.
8. Add purchased products to user library.
9. Clear cart.
10. Update product revenue stats if possible.
11. Create creator earnings if product has creator.
12. Commit transaction.

If any step fails, rollback everything.

Library APIs:

GET /api/library
GET /api/library/:productId/chapters

Library service functions:

- getLibraryByUserId(userId)
- getPurchasedChapters(userId, productId)

Library rule:

- User can only read paid chapters if the product exists in user_library.
- Free chapters can be read without purchase.
- For MVP, keep this logic simple but clear.

Upload module:

Create upload module:

server/src/modules/upload/
├── upload.route.js
├── upload.controller.js
├── upload.service.js
└── upload.middleware.js

Use Multer to parse multipart/form-data.

Upload service rule:

- Controllers must not contain storage logic.
- upload.service.js handles file URL generation.
- For local driver, return URL like:
  http://localhost:3000/uploads/filename
- For Cloudinary driver, upload to Cloudinary and return:
  - secureUrl
  - publicId
  - resourceType
  - format
  - bytes
  - originalName
  - mimeType

Upload APIs:

POST /api/uploads/image
POST /api/uploads/ebook

Image upload:

- Accept jpg, jpeg, png, webp.
- Store in Cloudinary folder depending on request field or default:
  ebookhub/images

Ebook upload:

- Accept pdf, epub if possible.
- For MVP, support local upload and Cloudinary raw upload.
- Store in folder:
  ebookhub/ebooks

Multer rule:

- Use memory storage for Cloudinary upload if possible.
- Use disk storage for local development if UPLOAD_DRIVER is local.
- Add file size limits.
- Add file type validation.
- Return Vietnamese error messages when file type is invalid.

Cloudinary upload logic:

- If UPLOAD_DRIVER is "local", save file locally and return local URL.
- If UPLOAD_DRIVER is "cloudinary", upload file to Cloudinary and return Cloudinary secure URL.
- Do not save file binary data into MySQL.

Auth skeleton:

Create auth routes/controllers/services/validation with placeholder or simple structure:

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

Do not fully over-engineer auth in MVP.
But prepare JWT, bcrypt, and Zod structure correctly.

User skeleton:

GET /api/users/me

Creator skeleton:

GET /api/creator/dashboard

Admin skeleton:

GET /api/admin/dashboard

Route index:

`server/src/routes/index.js` must import and mount:

- healthRoutes at `/health`
- productRoutes at `/products`
- cartRoutes at `/cart`
- walletRoutes at `/wallet`
- orderRoutes at `/orders`
- libraryRoutes at `/library`
- uploadRoutes at `/uploads`
- authRoutes at `/auth`
- userRoutes at `/users`
- creatorRoutes at `/creator`
- adminRoutes at `/admin`

Frontend setup:

Create Vite React JavaScript app in `client`.

Install frontend dependencies:

react
react-dom
vite
@vitejs/plugin-react
tailwindcss
@tailwindcss/vite
react-router-dom
axios
react-hook-form
zod
@hookform/resolvers
@tanstack/react-query
zustand

Install devDependencies:

eslint
prettier

Frontend structure:

client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── product/
│   │       └── ProductCard.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductListPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── ReaderPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── LibraryPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   ├── walletService.js
│   │   ├── orderService.js
│   │   ├── libraryService.js
│   │   ├── uploadService.js
│   │   └── authService.js
│   ├── hooks/
│   │   ├── useProducts.js
│   │   ├── useCart.js
│   │   ├── useWallet.js
│   │   └── useLibrary.js
│   ├── stores/
│   │   ├── authStore.js
│   │   └── cartStore.js
│   ├── schemas/
│   │   ├── loginSchema.js
│   │   └── registerSchema.js
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .prettierrc
├── .prettierignore
├── package.json
└── vite.config.js

Do not create a real committed production `.env`.
Create `client/.env.example` only.

Frontend `.env.example`:

VITE_API_URL=http://localhost:3000/api

Production frontend environment variable:

VITE_API_URL=https://your-backend-domain.com/api

Tailwind config:

Use Tailwind CSS v4 style setup with `@tailwindcss/vite`.
Do not create old Tailwind v3 config unless necessary.

`client/vite.config.js`:

- Use React plugin.
- Use Tailwind Vite plugin.

`client/src/index.css`:

@import "tailwindcss";

Axios setup:

`client/src/services/api.js`:

- Create Axios instance using `import.meta.env.VITE_API_URL`.
- Enable `withCredentials`.
- Add request interceptor to attach `Authorization: Bearer token` from localStorage if token exists.
- Do not hard-code API URLs in components.

Frontend routing:

Routes:

- `/`
- `/products`
- `/products/:id`
- `/reader/:chapterId`
- `/cart`
- `/library`
- `/login`
- `/register`

All visible text must be Vietnamese.

Create:

`Header.jsx` with Vietnamese navigation labels:

- Trang chủ
- Cửa hàng
- Giỏ hàng
- Thư viện
- Đăng nhập

Create:

- `Footer.jsx`
- `MainLayout.jsx`

Product feature:

Implement fully:

- `productService.js`
- `useProducts.js`
- `ProductCard.jsx`
- `ProductListPage.jsx`
- `ProductDetailPage.jsx`
- `ReaderPage.jsx`

Product UI text must be Vietnamese:

- “Danh sách sản phẩm”
- “Xem chi tiết”
- “Thêm vào giỏ hàng”
- “Danh sách chương”
- “Đọc”
- “Đang tải...”
- “Không tìm thấy dữ liệu”
- “Sản phẩm nổi bật”
- “Thể loại”
- “Tác giả”
- “Giá bán”

Use TanStack Query for product list, product detail, chapters, cart, wallet, checkout, and library where appropriate.

Setup TanStack Query:

- In `main.jsx`, wrap app with `QueryClientProvider`.
- Also wrap app with `BrowserRouter`.

Zustand stores:

`authStore.js`:

- user
- accessToken
- login(user, token)
- logout()

`cartStore.js`:

- cartCount
- setCartCount(count)

Schemas:

- `loginSchema.js`
- `registerSchema.js`

Use Zod.
Validation error messages must be Vietnamese.

Utility:

`formatCurrency.js`:

- Format number as Vietnamese VND currency.

MVP pages:

- HomePage
- ProductListPage
- ProductDetailPage
- CartPage
- LibraryPage
- ReaderPage

Placeholder pages:

- LoginPage: Vietnamese login form layout.
- RegisterPage: Vietnamese register form layout.

CartPage:

- Show cart items.
- Show total price.
- Show wallet checkout button with Vietnamese label “Thanh toán bằng ví”.
- Show empty state in Vietnamese when cart is empty.

LibraryPage:

- Show purchased products.
- Allow opening purchased chapters.
- Show empty state in Vietnamese when library is empty.

ReaderPage:

- Show chapter title and content.
- If chapter has imageUrl, display image.
- All visible messages must be Vietnamese.

Deployment and cloud requirements:

Prepare the project for both local development and production deployment.

Local development:

- MySQL can run on localhost.
- DATABASE_URL example:
  mysql://root:password@localhost:3306/ebookhub_store_db
- Uploaded files can be stored in `server/uploads`.

Production:

- Do not use localhost database in production.
- The project must support a cloud MySQL database.
- DATABASE_URL must be read from environment variables.
- Production DATABASE_URL format:
  mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
- Mention compatible cloud MySQL providers in documentation:
  Railway MySQL, Aiven MySQL, PlanetScale, DigitalOcean Managed MySQL, AWS RDS MySQL.
- The backend deployment platform must set production environment variables.
- The frontend deployment platform must set `VITE_API_URL`.
- Production upload must use Cloudinary, not local server disk.

Frontend deployment:

- Prepare for Vercel deployment.

Backend deployment:

- Prepare for Render or Railway deployment.

Database deployment:

- Use cloud MySQL.
- Do not use local MySQL for production.
- Do not use `localhost` in production DATABASE_URL.

Prisma:

For local development, use:

npx prisma migrate dev --name init_mvp_schema

For production deployment, use:

npx prisma migrate deploy

Generate Prisma client:

npx prisma generate

Docker:

Create `database/docker-compose.yml` for local MySQL development.

Use MySQL 8.

The Docker database should use:

MYSQL_DATABASE=ebookhub_store_db
MYSQL_ROOT_PASSWORD=password
port 3306:3306

Example structure:

database/
└── docker-compose.yml

This is for local development only.
Production must use cloud MySQL.

`database/docker-compose.yml` should include a persistent MySQL volume.

Deployment guide:

Create `docs/deployment-guide.md`.

It must explain:

# Deployment Guide

## Frontend Deployment

Use Vercel.

Set environment variable:

VITE_API_URL=https://your-backend-domain.com/api

## Backend Deployment

Use Render or Railway.

Set environment variables:

NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/ebookhub_store_db
JWT_SECRET=strong_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend-domain.com
UPLOAD_DRIVER=cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## Database Deployment

Use cloud MySQL.

After setting DATABASE_URL, run:

npx prisma migrate deploy
npx prisma generate
node prisma/seed.js

## Cloudinary Setup

Create a Cloudinary account.
Copy these values from Cloudinary dashboard:

- Cloud name
- API key
- API secret

Set them in backend environment variables.

Never expose API secret to frontend.

## Important Notes

- Do not use localhost database in production.
- Do not commit `.env`.
- Do not store production uploads only on local disk.
- Store production files in Cloudinary.
- Store only file URLs and metadata in MySQL.

File storage guide:

Create `docs/file-storage-guide.md`.

It must explain:

# File Storage Guide

## Wrong approach

Do not store images, covers, ebook files, PDFs, EPUBs, comic pages, or chapter images directly in MySQL.

Bad examples:

- Storing base64 image strings in product records.
- Storing binary ebook files in database rows.
- Storing comic page binary data in database rows.

## Correct approach

Store actual files in file storage.

Local development:

- Files are uploaded to `server/uploads`.
- Backend serves files through `/uploads`.

Production:

- Files should be uploaded to Cloudinary.

## What MySQL stores

MySQL stores only metadata:

- coverImageUrl
- coverImagePublicId
- fileUrl
- filePublicId
- imageUrl
- imagePublicId
- avatarUrl
- avatarPublicId
- bannerUrl
- bannerPublicId
- storageKey
- mimeType
- fileSize
- originalName
- uploadedAt

Example:

Product table:

coverImageUrl = "https://res.cloudinary.com/ebookhub/image/upload/book-cover.jpg"
coverImagePublicId = "ebookhub/covers/book-cover"

The frontend displays the image using that URL.

## File display flow

Admin uploads image.
Backend uploads image to Cloudinary.
Cloudinary returns secure_url and public_id.
Backend stores secure_url and public_id in MySQL using Prisma.
Frontend fetches product data from backend API.
Frontend displays image using:

<img src={product.coverImageUrl} alt={product.title} />

README:

Create root `README.md` with setup instructions in Vietnamese.

README must include:

- Tech stack
- Project structure
- Backend setup
- Frontend setup
- Database setup
- Local MySQL with Docker
- Cloud database explanation
- Cloudinary file storage explanation
- How to run Prisma migration
- How to run seed
- How to run backend
- How to run frontend
- API test URLs
- Deployment notes

Use these URLs:

- Backend: http://localhost:3000
- Health API: http://localhost:3000/api/health
- Product API: http://localhost:3000/api/products
- Frontend: http://localhost:5173
- Product page: http://localhost:5173/products

After generating the project, print the exact commands I need to run:

1. Create `server/.env` from `server/.env.example`.
2. Update `server/.env` and replace MySQL password in DATABASE_URL.
3. Make sure DATABASE_URL uses database name `ebookhub_store_db`.
4. Add Cloudinary credentials to `server/.env` if using Cloudinary.
5. Create `client/.env` from `client/.env.example`.

From root:

npm install

Backend:

cd server
npm install
npx prisma migrate dev --name init_mvp_schema
npm run prisma:seed
npm run dev

Frontend:

cd client
npm install
npm run dev

Or from root:

npm run dev

Quality rules:

- Clean code.
- Enterprise folder structure.
- No TypeScript.
- No MongoDB.
- Vietnamese UI only.
- Do not put business logic in controllers.
- Do not call Prisma from controllers.
- Do not call Axios directly inside components when a service exists.
- Use centralized API service.
- Use consistent API response.
- Use centralized error middleware.
- Use Prisma transaction for checkout.
- Do not store files directly in MySQL.
- Store files in local uploads for development.
- Store production files in Cloudinary.
- Store only file URLs and metadata in MySQL.
- Do not expose Cloudinary API secret to frontend.
- Project must run after setup.