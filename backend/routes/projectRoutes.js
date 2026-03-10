const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const adminAuth = require("../adminAuth");

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);
router.post("/", adminAuth, projectController.createProject);
router.put("/:id", adminAuth, projectController.updateProject);
router.delete("/:id", adminAuth, projectController.deleteProject);

module.exports = router;