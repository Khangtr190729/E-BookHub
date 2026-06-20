const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");
const demoUserMiddleware = require("../../middlewares/demoUser.middleware");

router.use(demoUserMiddleware);

router.post("/checkout", orderController.checkout);
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrder);

module.exports = router;
