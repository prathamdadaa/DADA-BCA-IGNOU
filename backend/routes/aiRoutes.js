const express = require('express');
const { askAssistant } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/ask', protect, askAssistant);

module.exports = router;
