const About = require("../models/about");

exports.createAbout = async (req, res) => {
  try {
    const newAbout = new About({
      subTitle: req.body.subTitle,
      whoIam: req.body.whoIam,
      experience: req.body.experience,
      projects: req.body.projects,
      skills: req.body.skills ? (Array.isArray(req.body.skills) ? req.body.skills : []) : []
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
