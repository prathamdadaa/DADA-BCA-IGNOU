const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const { semester, subjectCode } = req.query;
    const filter = {};
    if (semester) filter.semester = semester;
    if (subjectCode) filter.subjectCode = subjectCode;
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNote = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, uploadedBy: req.user._id });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote };
