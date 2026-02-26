const Project = require("../models/project");

// GET all
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
exports.createProject = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link || "",
      image: req.file ? req.file.path : null,
      technologies: req.body.technologies || ""
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
exports.updateProject = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      link: req.body.link || "",
      technologies: req.body.technologies || ""
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};