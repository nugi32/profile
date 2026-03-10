const express = require("express");
const router = express.Router();
const landingController = require("../controllers/landingController");
const adminAuth = require("../adminAuth");

router.get("/", landingController.getLanding);
router.post("/", adminAuth, landingController.createLanding);

module.exports = router;
