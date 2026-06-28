const Paper = require('../models/Paper');

const getPapers = async (req, res) => {
  try {
    const { semester, subjectCode } = req.query;
    const filter = {};
    if (semester) filter.semester = semester;
    if (subjectCode) filter.subjectCode = subjectCode;
    const papers = await Paper.find(filter).sort({ year: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPaper = async (req, res) => {
  try {
    const paper = await Paper.create({ ...req.body, uploadedBy: req.user._id });
    res.status(201).json(paper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePaper = async (req, res) => {
  try {
    const paper = await Paper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paper) return res.status(404).json({ message: 'Paper not found' });
    res.json(paper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePaper = async (req, res) => {
  try {
    const paper = await Paper.findByIdAndDelete(req.params.id);
    if (!paper) return res.status(404).json({ message: 'Paper not found' });
    res.json({ message: 'Paper deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPapers, createPaper, updatePaper, deletePaper };
