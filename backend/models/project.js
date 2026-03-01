const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  short: {
    type: String
  },
  details: {
    type: String
  },
  link: {
    type: String
  },
  image: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);