const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    semester: { type: Number, required: true, min: 1, max: 6 },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    unit: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
