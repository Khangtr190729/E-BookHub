const express = require("express");
const router = express.Router();
const { successResponse } = require("../../utils/response");

router.get("/dashboard", (req, res) => successResponse(res, "Skeleton Admin Dashboard"));

module.exports = router;
