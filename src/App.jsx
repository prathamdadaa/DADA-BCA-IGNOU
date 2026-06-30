import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Assignments from './pages/Assignments';
import Papers from './pages/Papers';
import Quizzes from './pages/Quizzes';
import QuizAttempt from './pages/QuizAttempt';
import CGPACalculator from './pages/CGPACalculator';
import AIAssistant from './pages/AIAssistant';
import About from './pages/About';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/notes/:semester" element={<ProtectedRoute><Notes /></ProtectedRoute>} />

          <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="/assignments/:semester" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />

          <Route path="/papers" element={<ProtectedRoute><Papers /></ProtectedRoute>} />
          <Route path="/papers/:semester" element={<ProtectedRoute><Papers /></ProtectedRoute>} />

          <Route path="/quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
          <Route path="/quizzes/:semester" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
          <Route path="/quizzes/attempt/:id" element={<ProtectedRoute><QuizAttempt /></ProtectedRoute>} />

          <Route path="/cgpa" element={<ProtectedRoute><CGPACalculator /></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />

          <Route path="*" element={<div className="page"><h2>404 - Page not found</h2></div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
