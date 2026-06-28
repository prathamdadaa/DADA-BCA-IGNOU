import { useEffect, useState } from 'react';
import api from '../api/axios';

const tabs = ['stats', 'notes', 'assignments', 'papers', 'quizzes', 'users'];

const emptyNote = { title: '', semester: 1, subjectCode: '', subjectName: '', fileUrl: '', unit: '', description: '' };
const emptyAssignment = { title: '', semester: 1, subjectCode: '', subjectName: '', session: '', fileUrl: '', dueDate: '' };
const emptyPaper = { semester: 1, subjectCode: '', subjectName: '', year: '', term: 'June', officialLinkUrl: '' };

const Admin = () => {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [notes, setNotes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [papers, setPapers] = useState([]);
  const [users, setUsers] = useState([]);

  const [noteForm, setNoteForm] = useState(emptyNote);
  const [assignmentForm, setAssignmentForm] = useState(emptyAssignment);
  const [paperForm, setPaperForm] = useState(emptyPaper);

  const refresh = (t) => {
    if (t === 'stats') api.get('/admin/stats').then((r) => setStats(r.data));
    if (t === 'notes') api.get('/notes').then((r) => setNotes(r.data));
    if (t === 'assignments') api.get('/assignments').then((r) => setAssignments(r.data));
    if (t === 'papers') api.get('/papers').then((r) => setPapers(r.data));
    if (t === 'users') api.get('/admin/users').then((r) => setUsers(r.data));
  };

  useEffect(() => { refresh(tab); }, [tab]);

  const addNote = async (e) => {
    e.preventDefault();
    await api.post('/notes', noteForm);
    setNoteForm(emptyNote);
    refresh('notes');
  };
  const deleteNote = async (id) => { await api.delete(`/notes/${id}`); refresh('notes'); };

  const addAssignment = async (e) => {
    e.preventDefault();
    await api.post('/assignments', assignmentForm);
    setAssignmentForm(emptyAssignment);
    refresh('assignments');
  };
  const deleteAssignment = async (id) => { await api.delete(`/assignments/${id}`); refresh('assignments'); };

  const addPaper = async (e) => {
    e.preventDefault();
    await api.post('/papers', paperForm);
    setPaperForm(emptyPaper);
    refresh('papers');
  };
  const deletePaper = async (id) => { await api.delete(`/papers/${id}`); refresh('papers'); };

  const changeRole = async (id, role) => { await api.put(`/admin/users/${id}/role`, { role }); refresh('users'); };
  const deleteUser = async (id) => { await api.delete(`/admin/users/${id}`); refresh('users'); };

  return (
    <div className="page">
      <h1>⚙️ Admin Panel</h1>
      <div className="tabs">
        {tabs.map((t) => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'stats' && stats && (
        <div className="grid">
          <div className="card"><h3>{stats.userCount}</h3><p>Users</p></div>
          <div className="card"><h3>{stats.noteCount}</h3><p>Notes</p></div>
          <div className="card"><h3>{stats.assignmentCount}</h3><p>Assignments</p></div>
          <div className="card"><h3>{stats.paperCount}</h3><p>Papers</p></div>
          <div className="card"><h3>{stats.quizCount}</h3><p>Quizzes</p></div>
        </div>
      )}

      {tab === 'notes' && (
        <div>
          <form className="admin-form" onSubmit={addNote}>
            <input placeholder="Title" value={noteForm.title} onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })} required />
            <select value={noteForm.semester} onChange={(e) => setNoteForm({ ...noteForm, semester: Number(e.target.value) })}>
              {[1,2,3,4,5,6].map((s) => <option key={s} value={s}>Sem {s}</option>)}
            </select>
            <input placeholder="Subject Code" value={noteForm.subjectCode} onChange={(e) => setNoteForm({ ...noteForm, subjectCode: e.target.value })} required />
            <input placeholder="Subject Name" value={noteForm.subjectName} onChange={(e) => setNoteForm({ ...noteForm, subjectName: e.target.value })} required />
            <input placeholder="Unit (optional)" value={noteForm.unit} onChange={(e) => setNoteForm({ ...noteForm, unit: e.target.value })} />
            <input placeholder="File URL" value={noteForm.fileUrl} onChange={(e) => setNoteForm({ ...noteForm, fileUrl: e.target.value })} required />
            <button className="btn" type="submit">Add Note</button>
          </form>
          <div className="list">
            {notes.map((n) => (
              <div className="list-item" key={n._id}>
                <div><h4>{n.subjectName} ({n.subjectCode}) - Sem {n.semester}</h4><p>{n.title}</p></div>
                <button className="btn-link" onClick={() => deleteNote(n._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'assignments' && (
        <div>
          <form className="admin-form" onSubmit={addAssignment}>
            <input placeholder="Title" value={assignmentForm.title} onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })} required />
            <select value={assignmentForm.semester} onChange={(e) => setAssignmentForm({ ...assignmentForm, semester: Number(e.target.value) })}>
              {[1,2,3,4,5,6].map((s) => <option key={s} value={s}>Sem {s}</option>)}
            </select>
            <input placeholder="Subject Code" value={assignmentForm.subjectCode} onChange={(e) => setAssignmentForm({ ...assignmentForm, subjectCode: e.target.value })} required />
            <input placeholder="Subject Name" value={assignmentForm.subjectName} onChange={(e) => setAssignmentForm({ ...assignmentForm, subjectName: e.target.value })} required />
            <input placeholder="Session (e.g. Jan-2026)" value={assignmentForm.session} onChange={(e) => setAssignmentForm({ ...assignmentForm, session: e.target.value })} required />
            <input type="date" value={assignmentForm.dueDate} onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })} />
            <input placeholder="File URL" value={assignmentForm.fileUrl} onChange={(e) => setAssignmentForm({ ...assignmentForm, fileUrl: e.target.value })} required />
            <button className="btn" type="submit">Add Assignment</button>
          </form>
          <div className="list">
            {assignments.map((a) => (
              <div className="list-item" key={a._id}>
                <div><h4>{a.subjectName} ({a.subjectCode}) - Sem {a.semester}</h4><p>{a.title} · {a.session}</p></div>
                <button className="btn-link" onClick={() => deleteAssignment(a._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'papers' && (
        <div>
          <form className="admin-form" onSubmit={addPaper}>
            <select value={paperForm.semester} onChange={(e) => setPaperForm({ ...paperForm, semester: Number(e.target.value) })}>
              {[1,2,3,4,5,6].map((s) => <option key={s} value={s}>Sem {s}</option>)}
            </select>
            <input placeholder="Subject Code" value={paperForm.subjectCode} onChange={(e) => setPaperForm({ ...paperForm, subjectCode: e.target.value })} required />
            <input placeholder="Subject Name" value={paperForm.subjectName} onChange={(e) => setPaperForm({ ...paperForm, subjectName: e.target.value })} required />
            <input placeholder="Year (e.g. 2025)" value={paperForm.year} onChange={(e) => setPaperForm({ ...paperForm, year: e.target.value })} required />
            <select value={paperForm.term} onChange={(e) => setPaperForm({ ...paperForm, term: e.target.value })}>
              <option value="June">June</option>
              <option value="December">December</option>
            </select>
            <input placeholder="Official IGNOU Link" value={paperForm.officialLinkUrl} onChange={(e) => setPaperForm({ ...paperForm, officialLinkUrl: e.target.value })} required />
            <button className="btn" type="submit">Add Paper Link</button>
          </form>
          <div className="list">
            {papers.map((p) => (
              <div className="list-item" key={p._id}>
                <div><h4>{p.subjectName} ({p.subjectCode}) - Sem {p.semester}</h4><p>{p.term} {p.year}</p></div>
                <button className="btn-link" onClick={() => deletePaper(p._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'quizzes' && (
        <div>
          <p className="muted">Quizzes can be added via the API (POST /api/quizzes) with a full question set. A creation form can be added here later.</p>
        </div>
      )}

      {tab === 'users' && (
        <div className="list">
          {users.map((u) => (
            <div className="list-item" key={u._id}>
              <div><h4>{u.name}</h4><p>{u.email} · {u.role}</p></div>
              <div>
                <select value={u.role} onChange={(e) => changeRole(u._id, e.target.value)}>
                  <option value="student">student</option>
                  <option value="admin">admin</option>
                </select>
                <button className="btn-link" onClick={() => deleteUser(u._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
