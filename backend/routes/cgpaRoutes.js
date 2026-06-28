const express = require('express');
const { calculateAndSaveSGPA, getCGPA } = require('../controllers/cgpaController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sgpa', protect, calculateAndSaveSGPA);
router.get('/', protect, getCGPA);

module.exports = router;
