const express = require('express');
const router = express.Router();

const healthRoutes = require('../modules/health/health.route');
const productRoutes = require('../modules/product/product.route');
const cartRoutes = require('../modules/cart/cart.route');
const walletRoutes = require('../modules/wallet/wallet.route');
const orderRoutes = require('../modules/order/order.route');
const libraryRoutes = require('../modules/library/library.route');
const uploadRoutes = require('../modules/upload/upload.route');

// Skeleton routes
const authRoutes = require('../modules/auth/auth.route');
const userRoutes = require('../modules/user/user.route');
const creatorRoutes = require('../modules/creator/creator.route');
const adminRoutes = require('../modules/admin/admin.route');

const demoUserMiddleware = require('../middlewares/demoUser.middleware');

// Public routes
router.use('/health', healthRoutes);
router.use('/products', productRoutes);
router.use('/uploads', uploadRoutes);

// MVP Routes with Demo User Middleware (Replacement for Auth temporarily)
router.use('/cart', demoUserMiddleware, cartRoutes);
router.use('/wallet', demoUserMiddleware, walletRoutes);
router.use('/orders', demoUserMiddleware, orderRoutes);
router.use('/library', demoUserMiddleware, libraryRoutes);

// Skeleton modules
router.use('/auth', authRoutes);
router.use('/users', demoUserMiddleware, userRoutes);
router.use('/creator', demoUserMiddleware, creatorRoutes);
router.use('/admin', demoUserMiddleware, adminRoutes);

module.exports = router;
