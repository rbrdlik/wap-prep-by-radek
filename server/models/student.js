const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gradeAverage: { type: Number, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null },
});

module.exports = mongoose.model("Student", schema);
