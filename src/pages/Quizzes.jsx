import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import SemesterGrid from '../components/SemesterGrid';

const Quizzes = () => {
  const { semester } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!semester) return;
    setLoading(true);
    api
      .get('/quizzes', { params: { semester } })
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, [semester]);

  if (!semester) {
    return (
      <div className="page">
        <h1>🧠 Quizzes - Select Semester</h1>
        <SemesterGrid basePath="/quizzes" />
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/quizzes" className="back-link">← Back to semesters</Link>
      <h1>Semester {semester} - Quizzes</h1>
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>No quizzes available yet for this semester.</p>}
      <div className="list">
        {items.map((q) => (
          <div className="list-item" key={q._id}>
            <div>
              <h4>{q.subjectName} ({q.subjectCode})</h4>
              <p>{q.title} · {q.questions?.length || 0} questions</p>
            </div>
            <Link to={`/quizzes/attempt/${q._id}`} className="btn-small">Start</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
