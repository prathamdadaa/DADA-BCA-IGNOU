const express = require('express');
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  deleteQuiz,
  submitQuizAttempt,
  getMyAttempts,
} = require('../controllers/quizController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getQuizzes);
router.get('/my-attempts', protect, getMyAttempts);
router.get('/:id', protect, getQuizById);
router.post('/', protect, adminOnly, createQuiz);
router.post('/:id/submit', protect, submitQuizAttempt);
router.delete('/:id', protect, adminOnly, deleteQuiz);

module.exports = router;
