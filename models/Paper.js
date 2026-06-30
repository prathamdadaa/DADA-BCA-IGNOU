const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema(
  {
    semester: { type: Number, required: true, min: 1, max: 6 },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    year: { type: String, required: true },
    term: { type: String, enum: ['June', 'December'], required: true },
    // External official IGNOU resource link (no copyrighted content stored on our server)
    officialLinkUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Paper', paperSchema);
