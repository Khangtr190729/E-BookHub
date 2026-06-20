const express = require("express");
const router = express.Router();
const walletController = require("./wallet.controller");
const demoUserMiddleware = require("../../middlewares/demoUser.middleware");

router.use(demoUserMiddleware);

router.get("/", walletController.getWallet);
router.get("/transactions", walletController.getTransactions);

module.exports = router;
