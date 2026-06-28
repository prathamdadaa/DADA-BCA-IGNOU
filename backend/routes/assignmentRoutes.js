const express = require('express');
const {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require('../controllers/assignmentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getAssignments);
router.post('/', protect, adminOnly, createAssignment);
router.put('/:id', protect, adminOnly, updateAssignment);
router.delete('/:id', protect, adminOnly, deleteAssignment);

module.exports = router;
