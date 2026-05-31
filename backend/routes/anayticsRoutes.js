const express = require("express");

const { getAdminAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/", getAdminAnalytics);

module.exports = router;
