const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    semester: { type: Number, required: true, min: 1, max: 6 },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    session: { type: String, required: true }, // e.g. "Jan-2026" or "July-2025"
    dueDate: { type: Date },
    fileUrl: { type: String, required: true },
    description: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
