const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const Note = require('../models/Note');
    const Assignment = require('../models/Assignment');
    const Paper = require('../models/Paper');
    const Quiz = require('../models/Quiz');

    const [userCount, noteCount, assignmentCount, paperCount, quizCount] = await Promise.all([
      User.countDocuments(),
      Note.countDocuments(),
      Assignment.countDocuments(),
      Paper.countDocuments(),
      Quiz.countDocuments(),
    ]);

    res.json({ userCount, noteCount, assignmentCount, paperCount, quizCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers, updateUserRole, deleteUser, getDashboardStats };
