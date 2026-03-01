const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    title: { type: String },
    socialLinks: [{
      name: { type: String },
      url: { type: String }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Footer", footerSchema);
