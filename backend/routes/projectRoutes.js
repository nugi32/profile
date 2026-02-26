const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const projectController = require("../controllers/projectController");

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);
router.post("/", upload.single("image"), projectController.createProject);
router.put("/:id", upload.single("image"), projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;