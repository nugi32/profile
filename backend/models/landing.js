const mongoose = require("mongoose");

const landingSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    heroImage: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Landing", landingSchema);
