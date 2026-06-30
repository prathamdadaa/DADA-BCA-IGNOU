const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    enrollmentNo: { type: String, trim: true },
    currentSemester: { type: Number, min: 1, max: 6, default: 1 },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    cgpaRecords: [
      {
        semester: Number,
        subjects: [
          {
            name: String,
            credit: Number,
            grade: String,
            gradePoint: Number,
          },
        ],
        sgpa: Number,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
