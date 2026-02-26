const Contact = require("../models/contact");

// GET contact info (returns first/latest entry)
exports.getContact = async (req, res) => {
  try {
    let contact = await Contact.findOne().sort({ createdAt: -1 });
    if (!contact) {
      // Return empty object if no contact exists yet
      return res.json({
        email: "",
        github: "",
        linkedin: "",
        twitter: ""
      });
    }
    res.json(contact);
  } catch (error) {
    console.error("Get contact error:", error);
    res.status(500).json({ message: error.message });
  }
};

// CREATE/UPDATE contact info
exports.saveContact = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Upsert - update if exists, create if not
    let contact = await Contact.findOne();
    
    if (contact) {
      contact.email = req.body.email;
      contact.github = req.body.github || "";
      contact.linkedin = req.body.linkedin || "";
      contact.twitter = req.body.twitter || "";
    } else {
      contact = new Contact({
        email: req.body.email,
        github: req.body.github || "",
        linkedin: req.body.linkedin || "",
        twitter: req.body.twitter || ""
      });
    }

    const saved = await contact.save();
    res.status(200).json(saved);
  } catch (error) {
    console.error("Save contact error:", error);
    res.status(400).json({ message: error.message });
  }
};
