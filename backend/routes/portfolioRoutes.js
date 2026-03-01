const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const portfolioController = require("../controllers/portfolioController");

// Handle multiple file uploads for landing and projects
const multiUpload = upload.fields([
  { name: 'landingImage', maxCount: 1 },
  { name: 'projectImage_0', maxCount: 1 },
  { name: 'projectImage_1', maxCount: 1 },
  { name: 'projectImage_2', maxCount: 1 },
  { name: 'projectImage_3', maxCount: 1 },
  { name: 'projectImage_4', maxCount: 1 },
  { name: 'projectImage_5', maxCount: 1 },
  { name: 'projectImage_6', maxCount: 1 },
  { name: 'projectImage_7', maxCount: 1 },
  { name: 'projectImage_8', maxCount: 1 },
  { name: 'projectImage_9', maxCount: 1 }
]);

router.post("/", multiUpload, portfolioController.savePortfolio);
router.get("/", portfolioController.getPortfolio);

module.exports = router;
