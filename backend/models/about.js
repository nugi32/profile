const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String },
    avatar: { type: String },
    skills: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
