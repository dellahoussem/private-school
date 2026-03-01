const mongoose = require("mongoose");
const evaluationSchema =  mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coursId: { type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
  note: Number,
  evaluation: String
});
evaluationSchema.index({ studentId: 1, coursId: 1 }, { unique: true });
const evaluation = mongoose.model("Evaluation", evaluationSchema);
module.exports = evaluation;