const express = require('express');
const { getNotes, getNoteById, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getNotes);
router.get('/:id', protect, getNoteById);
router.post('/', protect, adminOnly, createNote);
router.put('/:id', protect, adminOnly, updateNote);
router.delete('/:id', protect, adminOnly, deleteNote);

module.exports = router;
