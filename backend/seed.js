// Run with: node seed.js
// Creates an admin user and a few sample subjects/notes so the portal isn't empty on first run.
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Note = require('./models/Note');

const run = async () => {
  await connectDB();

  const adminEmail = 'admin@ignoubca.local';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: 'Portal Admin',
      email: adminEmail,
      password: 'Admin@123',
      role: 'admin',
      currentSemester: 1,
    });
    console.log('Admin created -> email: admin@ignoubca.local password: Admin@123');
  } else {
    console.log('Admin already exists');
  }

  const sampleNoteCount = await Note.countDocuments();
  if (sampleNoteCount === 0) {
    await Note.create([
      {
        title: 'Unit 1 - Introduction to Programming',
        semester: 1,
        subjectCode: 'BCS-011',
        subjectName: 'Computer Basics and PC Software',
        fileUrl: 'https://example.com/replace-with-real-note-link.pdf',
        unit: 'Unit 1',
        uploadedBy: admin._id,
      },
    ]);
    console.log('Sample note created');
  }

  console.log('Seeding complete');
  mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
