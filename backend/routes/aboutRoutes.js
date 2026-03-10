const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");
const adminAuth = require("../adminAuth");

router.get("/", aboutController.getProjects);
router.post("/", adminAuth, aboutController.createProject);

module.exports = router;
