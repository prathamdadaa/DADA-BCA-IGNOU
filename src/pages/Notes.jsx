import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import SemesterGrid from '../components/SemesterGrid';

const Notes = () => {
  const { semester } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!semester) return;
    setLoading(true);
    api
      .get('/notes', { params: { semester } })
      .then((res) => setNotes(res.data))
      .finally(() => setLoading(false));
  }, [semester]);

  if (!semester) {
    return (
      <div className="page">
        <h1>📚 Notes - Select Semester</h1>
        <SemesterGrid basePath="/notes" />
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/notes" className="back-link">← Back to semesters</Link>
      <h1>Semester {semester} - Notes</h1>
      {loading && <p>Loading...</p>}
      {!loading && notes.length === 0 && <p>No notes uploaded yet for this semester.</p>}
      <div className="list">
        {notes.map((note) => (
          <div className="list-item" key={note._id}>
            <div>
              <h4>{note.subjectName} ({note.subjectCode})</h4>
              <p>{note.title} {note.unit && `· ${note.unit}`}</p>
              {note.description && <p className="muted">{note.description}</p>}
            </div>
            <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-small">
              Open
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
