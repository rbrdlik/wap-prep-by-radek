const mongoose = require("mongoose");

const schema = mongoose.Schema({
  year: { type: Number, required: true },
  code: { type: String, required: true },
  hasClassroom: { type: Boolean, required: true },
  classroomCode: { type: Number },
});

module.exports = mongoose.model("Class", schema);
