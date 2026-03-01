const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footerController");

router.get("/", footerController.getFooter);
router.post("/", footerController.createFooter);
router.put("/:id", footerController.updateFooter);
router.delete("/:id", footerController.deleteFooter);

module.exports = router;
