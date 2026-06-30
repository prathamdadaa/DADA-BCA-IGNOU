const express = require('express');
const { getPapers, createPaper, updatePaper, deletePaper } = require('../controllers/paperController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getPapers);
router.post('/', protect, adminOnly, createPaper);
router.put('/:id', protect, adminOnly, updatePaper);
router.delete('/:id', protect, adminOnly, deletePaper);

module.exports = router;
