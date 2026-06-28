const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

const getQuizzes = async (req, res) => {
  try {
    const { semester, subjectCode } = req.query;
    const filter = {};
    if (semester) filter.semester = semester;
    if (subjectCode) filter.subjectCode = subjectCode;
    // Don't leak correct answers in list view
    const quizzes = await Quiz.find(filter).select('-questions.correctOptionIndex -questions.explanation');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select('-questions.correctOptionIndex -questions.explanation');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Submit answers and get score + explanations
const submitQuizAttempt = async (req, res) => {
  try {
    const { answers } = req.body; // array of selected option indices
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    const results = quiz.questions.map((q, idx) => {
      const selected = answers[idx];
      const isCorrect = selected === q.correctOptionIndex;
      if (isCorrect) score += 1;
      return {
        questionText: q.questionText,
        selected,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      user: req.user._id,
      answers,
      score,
      totalQuestions: quiz.questions.length,
    });

    res.json({ score, total: quiz.questions.length, results, attemptId: attempt._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMyAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user._id })
      .populate('quiz', 'title subjectName semester')
      .sort({ createdAt: -1 });
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getQuizzes, getQuizById, createQuiz, deleteQuiz, submitQuizAttempt, getMyAttempts };
