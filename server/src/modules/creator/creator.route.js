const express = require("express");
const router = express.Router();
const { successResponse } = require("../../utils/response");

router.get("/dashboard", (req, res) => successResponse(res, "Skeleton Creator Dashboard"));

module.exports = router;
