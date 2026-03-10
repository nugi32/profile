const express = require("express");
const router = express.Router();

const portfolioController = require("../controllers/portfolioController");
const adminAuth = require("../adminAuth");

router.post("/", adminAuth, portfolioController.savePortfolio);
router.get("/", portfolioController.getPortfolio);

module.exports = router;