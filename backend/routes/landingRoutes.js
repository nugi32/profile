const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const landingController = require("../controllers/landingController");

router.get("/", landingController.getLanding);
router.post("/", upload.single("heroImage"), landingController.createLanding);

module.exports = router;
