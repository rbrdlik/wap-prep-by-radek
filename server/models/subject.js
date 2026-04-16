const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  year: { type: Number, required: true },
  minimumHoursPerWeek: { type: Number, required: true },
});

module.exports = mongoose.model("Subject", schema);
