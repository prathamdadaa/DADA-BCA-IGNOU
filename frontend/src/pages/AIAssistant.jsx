import { useState } from 'react';
import api from '../api/axios';

const AIAssistant = () => {
  const [question, setQuestion] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [semester, setSemester] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setError('');
    const userMsg = { role: 'user', text: question };
    setChat((c) => [...c, userMsg]);
    setLoading(true);
    setQuestion('');
    try {
      const res = await api.post('/ai/ask', { question, subjectName, semester });
      setChat((c) => [...c, { role: 'assistant', text: res.data.answer }]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get a response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>🤖 AI Study Assistant</h1>
      <p className="muted">Ask any doubt related to your BCA subjects. Powered by Claude.</p>

      <div className="ai-context-fields">
        <input placeholder="Subject (optional)" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Semester (optional)</option>
          {[1, 2, 3, 4, 5, 6].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="chat-box">
        {chat.map((m, idx) => (
          <div key={idx} className={`chat-msg ${m.role}`}>
            <strong>{m.role === 'user' ? 'You' : 'Assistant'}:</strong>
            <p>{m.text}</p>
          </div>
        ))}
        {loading && <p className="muted">Thinking...</p>}
      </div>

      {error && <p className="error-text">{error}</p>}

      <form className="chat-input" onSubmit={handleAsk}>
        <input
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit" className="btn" disabled={loading}>Send</button>
      </form>
    </div>
  );
};

export default AIAssistant;
