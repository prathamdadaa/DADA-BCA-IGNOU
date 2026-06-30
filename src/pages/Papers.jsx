import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import SemesterGrid from '../components/SemesterGrid';

const Papers = () => {
  const { semester } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!semester) return;
    setLoading(true);
    api
      .get('/papers', { params: { semester } })
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, [semester]);

  if (!semester) {
    return (
      <div className="page">
        <h1>📄 Previous Year Papers - Select Semester</h1>
        <SemesterGrid basePath="/papers" />
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/papers" className="back-link">← Back to semesters</Link>
      <h1>Semester {semester} - Previous Year Papers</h1>
      <p className="muted">Links point to official IGNOU resources.</p>
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>No papers added yet for this semester.</p>}
      <div className="list">
        {items.map((p) => (
          <div className="list-item" key={p._id}>
            <div>
              <h4>{p.subjectName} ({p.subjectCode})</h4>
              <p>{p.term} {p.year}</p>
            </div>
            <a href={p.officialLinkUrl} target="_blank" rel="noopener noreferrer" className="btn-small">
              View on IGNOU
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Papers;
