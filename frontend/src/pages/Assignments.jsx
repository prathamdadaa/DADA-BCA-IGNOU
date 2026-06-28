import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import SemesterGrid from '../components/SemesterGrid';

const Assignments = () => {
  const { semester } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!semester) return;
    setLoading(true);
    api
      .get('/assignments', { params: { semester } })
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, [semester]);

  if (!semester) {
    return (
      <div className="page">
        <h1>📝 Assignments - Select Semester</h1>
        <SemesterGrid basePath="/assignments" />
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/assignments" className="back-link">← Back to semesters</Link>
      <h1>Semester {semester} - Assignments</h1>
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>No assignments uploaded yet for this semester.</p>}
      <div className="list">
        {items.map((a) => (
          <div className="list-item" key={a._id}>
            <div>
              <h4>{a.subjectName} ({a.subjectCode})</h4>
              <p>{a.title} · Session: {a.session}</p>
              {a.dueDate && <p className="muted">Due: {new Date(a.dueDate).toLocaleDateString()}</p>}
            </div>
            <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-small">
              Open
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
