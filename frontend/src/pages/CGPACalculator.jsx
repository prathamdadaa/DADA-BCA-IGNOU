import { useEffect, useState } from 'react';
import api from '../api/axios';

const gradeOptions = ['A', 'B', 'C', 'D', 'E'];
const gradePointMap = { A: 9, B: 8, C: 7, D: 6, E: 5 };

const emptySubject = () => ({ name: '', credit: 4, grade: 'A' });

const CGPACalculator = () => {
  const [semester, setSemester] = useState(1);
  const [subjects, setSubjects] = useState([emptySubject()]);
  const [sgpaResult, setSgpaResult] = useState(null);
  const [overview, setOverview] = useState({ cgpa: 0, records: [] });
  const [error, setError] = useState('');

  const loadOverview = () => {
    api.get('/cgpa').then((res) => setOverview(res.data)).catch(() => {});
  };

  useEffect(() => { loadOverview(); }, []);

  const updateSubject = (idx, field, value) => {
    const next = [...subjects];
    next[idx][field] = value;
    setSubjects(next);
  };

  const addSubject = () => setSubjects([...subjects, emptySubject()]);
  const removeSubject = (idx) => setSubjects(subjects.filter((_, i) => i !== idx));

  const previewSGPA = () => {
    let totalCredits = 0, totalPoints = 0;
    subjects.forEach((s) => {
      const gp = gradePointMap[s.grade] || 0;
      totalCredits += Number(s.credit) || 0;
      totalPoints += (Number(s.credit) || 0) * gp;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const handleSave = async () => {
    setError('');
    try {
      const res = await api.post('/cgpa/sgpa', { semester, subjects });
      setSgpaResult(res.data.sgpa);
      loadOverview();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    }
  };

  return (
    <div className="page">
      <h1>📊 CGPA Calculator</h1>

      <div className="cgpa-overview">
        <h3>Overall CGPA: {overview.cgpa}</h3>
        {overview.records?.length > 0 && (
          <ul>
            {overview.records.map((r) => (
              <li key={r.semester}>Semester {r.semester}: SGPA {r.sgpa}</li>
            ))}
          </ul>
        )}
      </div>

      <h2>Calculate SGPA</h2>
      {error && <p className="error-text">{error}</p>}
      <label>
        Semester:{' '}
        <select value={semester} onChange={(e) => setSemester(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      <div className="subject-rows">
        {subjects.map((s, idx) => (
          <div className="subject-row" key={idx}>
            <input
              placeholder="Subject name (e.g. BCS-011)"
              value={s.name}
              onChange={(e) => updateSubject(idx, 'name', e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Credit"
              value={s.credit}
              onChange={(e) => updateSubject(idx, 'credit', e.target.value)}
            />
            <select value={s.grade} onChange={(e) => updateSubject(idx, 'grade', e.target.value)}>
              {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <button className="btn-link" onClick={() => removeSubject(idx)}>Remove</button>
          </div>
        ))}
      </div>

      <button className="btn-outline" onClick={addSubject}>+ Add Subject</button>
      <p>Live SGPA preview: <strong>{previewSGPA()}</strong></p>
      <button className="btn" onClick={handleSave}>Save SGPA</button>
      {sgpaResult !== null && <p>Saved! SGPA for semester {semester}: {sgpaResult}</p>}
    </div>
  );
};

export default CGPACalculator;
