const Landing = require("../models/landing");

// Create landing entry
exports.createLanding = async (req, res) => {
  try {
    const newLanding = new Landing({
      title: req.body.title,
      subtitle: req.body.subtitle,
      heroImage: req.file ? req.file.path : req.body.heroImage || null
    });

    const saved = await newLanding.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all landing entries (or latest)
exports.getLanding = async (req, res) => {
  try {
    const entries = await Landing.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
