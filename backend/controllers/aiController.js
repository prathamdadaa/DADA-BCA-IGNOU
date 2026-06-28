// AI Study Assistant controller.
// Uses Anthropic's Claude API. Requires ANTHROPIC_API_KEY to be set in .env
// Get a key at https://console.anthropic.com/

const askAssistant = async (req, res) => {
  try {
    const { question, semester, subjectName } = req.body;
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        message:
          'AI Assistant is not configured. Set ANTHROPIC_API_KEY in your backend .env file.',
      });
    }

    const systemPrompt = `You are a helpful study assistant for IGNOU BCA students. ` +
      `Answer clearly and concisely, using simple language suitable for an undergraduate student.` +
      (subjectName ? ` The student is asking about the subject: ${subjectName}.` : '') +
      (semester ? ` They are in semester ${semester}.` : '');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: question }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: data?.error?.message || 'AI request failed' });
    }

    const textBlock = (data.content || []).find((c) => c.type === 'text');
    res.json({ answer: textBlock ? textBlock.text : 'No response generated.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { askAssistant };
