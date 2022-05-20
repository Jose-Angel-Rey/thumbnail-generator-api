const express = require("express");
const thumbnail = require("../controllers/thumbnail.controller");

const router = express.Router();
router.use("/api/thumbnail", thumbnail);

module.exports = router;