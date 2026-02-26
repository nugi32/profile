const About = require("../models/about");

exports.createAbout = async (req, res) => {
  try {
    const newAbout = new About({
      bio: req.body.bio,
      avatar: req.file ? req.file.path : req.body.avatar || null,
      skills: req.body.skills ? (Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(",").map(s => s.trim())) : []
    });

    const saved = await newAbout.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAbout = async (req, res) => {
  try {
    const entries = await About.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
