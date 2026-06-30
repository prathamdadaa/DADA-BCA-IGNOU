import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="home-hero">
      <h1>IGNOU BCA Student Portal</h1>
      <p>Notes, assignments, previous year papers, quizzes, CGPA calculator and an AI study assistant — all in one place for IGNOU BCA students.</p>
      <div className="hero-actions">
        {user ? (
          <Link className="btn" to="/dashboard">Go to Dashboard</Link>
        ) : (
          <>
            <Link className="btn" to="/register">Get Started</Link>
            <Link className="btn-outline" to="/login">Login</Link>
          </>
        )}
      </div>
      <div className="feature-list">
        <div className="feature">📚 Semester-wise Notes</div>
        <div className="feature">📝 Assignments</div>
        <div className="feature">📄 Previous Year Papers</div>
        <div className="feature">🧠 Quizzes</div>
        <div className="feature">🤖 AI Study Assistant</div>
        <div className="feature">📊 CGPA Calculator</div>
      </div>
    </div>
  );
};

export default Home;
