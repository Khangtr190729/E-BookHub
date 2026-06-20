const express = require("express");
const router = express.Router();
const { successResponse } = require("../../utils/response");

router.get("/me", (req, res) => successResponse(res, "Skeleton User Me"));

module.exports = router;
