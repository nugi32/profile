const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const aboutController = require("../controllers/aboutController");

router.get("/", aboutController.getAbout);
router.post("/", upload.single("avatar"), aboutController.createAbout);

module.exports = router;
