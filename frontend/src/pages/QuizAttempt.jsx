import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => {
      setQuiz(res.data);
      setAnswers(new Array(res.data.questions.length).fill(-1));
      setLoading(false);
    });
  }, [id]);

  const selectAnswer = (qIdx, optIdx) => {
    const next = [...answers];
    next[qIdx] = optIdx;
    setAnswers(next);
  };

  const handleSubmit = async () => {
    const res = await api.post(`/quizzes/${id}/submit`, { answers });
    setResult(res.data);
  };

  if (loading) return <div className="page"><p>Loading quiz...</p></div>;
  if (!quiz) return <div className="page"><p>Quiz not found.</p></div>;

  return (
    <div className="page">
      <h1>{quiz.title}</h1>
      <p className="muted">{quiz.subjectName} · Semester {quiz.semester}</p>

      {result ? (
        <div className="quiz-result">
          <h2>Score: {result.score} / {result.total}</h2>
          {result.results.map((r, idx) => (
            <div key={idx} className={`result-item ${r.isCorrect ? 'correct' : 'incorrect'}`}>
              <p><strong>Q{idx + 1}:</strong> {r.questionText}</p>
              <p>Your answer: {r.selected >= 0 ? quiz.questions[idx].options[r.selected] : 'Not answered'}</p>
              <p>Correct answer: {quiz.questions[idx].options[r.correctOptionIndex] ?? r.correctOptionIndex}</p>
              {r.explanation && <p className="muted">Explanation: {r.explanation}</p>}
            </div>
          ))}
          <button className="btn" onClick={() => navigate('/quizzes')}>Back to Quizzes</button>
        </div>
      ) : (
        <div>
          {quiz.questions.map((q, qIdx) => (
            <div className="quiz-question" key={qIdx}>
              <p><strong>Q{qIdx + 1}.</strong> {q.questionText}</p>
              <div className="options">
                {q.options.map((opt, optIdx) => (
                  <label key={optIdx} className={`option ${answers[qIdx] === optIdx ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={`q-${qIdx}`}
                      checked={answers[qIdx] === optIdx}
                      onChange={() => selectAnswer(qIdx, optIdx)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="btn" onClick={handleSubmit}>Submit Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
