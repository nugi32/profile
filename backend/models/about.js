const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    subTitle: { type: String },
    whoIam: { type: String },
    experience: { type: String },
    projects: { type: String },
    skills: [{
      name: { type: String },
      level: { type: Number, default: 0 }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
