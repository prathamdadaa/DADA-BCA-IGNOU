const Assignment = require('../models/Assignment');

const getAssignments = async (req, res) => {
  try {
    const { semester, subjectCode } = req.query;
    const filter = {};
    if (semester) filter.semester = semester;
    if (subjectCode) filter.subjectCode = subjectCode;
    const assignments = await Assignment.find(filter).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({ ...req.body, uploadedBy: req.user._id });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAssignments, createAssignment, updateAssignment, deleteAssignment };
