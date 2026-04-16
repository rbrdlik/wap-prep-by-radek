const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  contract: { type: Number, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject", default: null }],
});

module.exports = mongoose.model("Teacher", schema);