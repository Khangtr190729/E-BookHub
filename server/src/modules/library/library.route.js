const express = require("express");
const router = express.Router();
const libraryController = require("./library.controller");
const demoUserMiddleware = require("../../middlewares/demoUser.middleware");

router.use(demoUserMiddleware);

router.get("/", libraryController.getLibrary);
router.get("/:productId/chapters", libraryController.getPurchasedChapters);

module.exports = router;
