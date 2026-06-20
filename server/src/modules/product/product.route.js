const express = require("express");
const router = express.Router();
const productController = require("./product.controller");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.get("/:productId/chapters", productController.getChapters);
// Note: Chapter reading moved to library for paid chapters, 
// but we can have public view for free chapters or listing.
router.get("/chapters/:id", productController.getChapter);

module.exports = router;
