const User = require('../models/User');

// IGNOU-style grade point mapping (commonly used scale)
const gradePointMap = { A: 9, B: 8, C: 7, D: 6, E: 5 };

const calculateAndSaveSGPA = async (req, res) => {
  try {
    const { semester, subjects } = req.body; // subjects: [{name, credit, grade}]
    if (!semester || !subjects || !subjects.length) {
      return res.status(400).json({ message: 'Semester and subjects are required' });
    }

    let totalCredits = 0;
    let totalPoints = 0;
    const processedSubjects = subjects.map((s) => {
      const gp = gradePointMap[s.grade?.toUpperCase()] ?? 0;
      totalCredits += Number(s.credit) || 0;
      totalPoints += (Number(s.credit) || 0) * gp;
      return { ...s, gradePoint: gp };
    });

    const sgpa = totalCredits > 0 ? +(totalPoints / totalCredits).toFixed(2) : 0;

    const user = await User.findById(req.user._id);
    const existingIndex = user.cgpaRecords.findIndex((r) => r.semester === Number(semester));
    const record = { semester: Number(semester), subjects: processedSubjects, sgpa };

    if (existingIndex >= 0) {
      user.cgpaRecords[existingIndex] = record;
    } else {
      user.cgpaRecords.push(record);
    }
    await user.save();

    res.json({ sgpa, record, cgpaRecords: user.cgpaRecords });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCGPA = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const records = user.cgpaRecords;
    if (!records.length) return res.json({ cgpa: 0, records: [] });

    const totalSGPA = records.reduce((sum, r) => sum + r.sgpa, 0);
    const cgpa = +(totalSGPA / records.length).toFixed(2);

    res.json({ cgpa, records });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateAndSaveSGPA, getCGPA, gradePointMap };
