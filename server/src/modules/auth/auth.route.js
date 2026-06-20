const express = require("express");
const router = express.Router();
const { successResponse } = require("../../utils/response");

router.post("/login", (req, res) => successResponse(res, "Skeleton Login"));
router.post("/register", (req, res) => successResponse(res, "Skeleton Register"));
router.get("/me", (req, res) => successResponse(res, "Skeleton Me"));

module.exports = router;
