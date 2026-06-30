import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Welcome, {user?.name} 👋</h1>
      <p>Current Semester: {user?.currentSemester}</p>

      <div className="grid">
        <Link to="/notes" className="card">
          <h3>📚 Notes</h3>
          <p>Subject-wise notes for all semesters</p>
        </Link>
        <Link to="/assignments" className="card">
          <h3>📝 Assignments</h3>
          <p>Latest assignment questions by session</p>
        </Link>
        <Link to="/papers" className="card">
          <h3>📄 Previous Year Papers</h3>
          <p>Official IGNOU previous year paper links</p>
        </Link>
        <Link to="/quizzes" className="card">
          <h3>🧠 Quizzes</h3>
          <p>Test your knowledge subject-wise</p>
        </Link>
        <Link to="/cgpa" className="card">
          <h3>📊 CGPA Calculator</h3>
          <p>Track your SGPA and CGPA</p>
        </Link>
        <Link to="/ai-assistant" className="card">
          <h3>🤖 AI Study Assistant</h3>
          <p>Ask doubts and get instant help</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
