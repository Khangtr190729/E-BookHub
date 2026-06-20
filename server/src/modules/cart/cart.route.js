const express = require("express");
const router = express.Router();
const cartController = require("./cart.controller");
const demoUserMiddleware = require("../../middlewares/demoUser.middleware");

// Use demo user for MVP
router.use(demoUserMiddleware);

router.get("/", cartController.getCart);
router.post("/items", cartController.addItem);
router.delete("/items/:productId", cartController.removeItem);

module.exports = router;
