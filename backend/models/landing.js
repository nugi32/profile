const mongoose = require("mongoose");

const landingSchema = new mongoose.Schema(
  {
    greeting: { type: String },
    role: { type: String },
    description: { type: String },
    profilePicture: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Landing", landingSchema);
