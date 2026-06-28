const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true, validate: v => v.length === 4 },
  correctOptionIndex: { type: Number, required: true, min: 0, max: 3 },
  explanation: { type: String },
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    semester: { type: Number, required: true, min: 1, max: 6 },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    questions: { type: [questionSchema], required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
