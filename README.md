# IGNOU BCA Student Portal

A full-stack MERN (MongoDB, Express, React, Node.js) web app for IGNOU BCA students.

## Features
- Authentication (Register/Login with JWT)
- Student Dashboard
- Semester 1–6 navigation
- Subject-wise Notes
- Assignments section
- Previous Year Paper links (to official IGNOU resources)
- Quiz system with scoring and explanations
- AI Study Assistant (powered by Claude API)
- CGPA / SGPA Calculator
- Admin Panel (manage notes, assignments, papers, users, view stats)
- Responsive design
- About page

## Project Structure
```
ignou-bca-portal/
├── backend/         # Node.js + Express + MongoDB API
└── frontend/        # React + Vite client
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGO_URI, JWT_SECRET, and optionally ANTHROPIC_API_KEY for the AI Assistant
npm run dev          # starts on http://localhost:5000
node seed.js         # optional: creates an admin user (admin@ignoubca.local / Admin@123) + sample note
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env   # optional, defaults to http://localhost:5000/api via the Vite proxy
npm run dev          # starts on http://localhost:5173
```

Open http://localhost:5173 in your browser.

### Admin login (after running seed.js)
- Email: `admin@ignoubca.local`
- Password: `Admin@123`

**Change this password immediately if deploying anywhere public.**

### AI Study Assistant setup
The AI Assistant calls Anthropic's Claude API from the backend. Get an API key at
https://console.anthropic.com/ and add it to `backend/.env`:
```
ANTHROPIC_API_KEY=your_key_here
```

## Adding Content
Use the Admin Panel (`/admin`, requires an admin account) to add:
- Notes (title, semester, subject, file URL)
- Assignments (title, semester, subject, session, due date, file URL)
- Previous year paper links (semester, subject, year, term, official IGNOU link)

Quizzes can currently be added via the API directly:
```
POST /api/quizzes
{
  "title": "Unit 1 Quiz",
  "semester": 1,
  "subjectCode": "BCS-011",
  "subjectName": "Computer Basics and PC Software",
  "questions": [
    {
      "questionText": "What does CPU stand for?",
      "options": ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Central Processor Unity"],
      "correctOptionIndex": 0,
      "explanation": "CPU = Central Processing Unit, the brain of the computer."
    }
  ]
}
```

## Tech Stack
- Frontend: React 18, Vite, React Router, Axios
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- AI: Anthropic Claude API

## Deployment Notes
- File URLs for notes/assignments are expected to be hosted externally (e.g. Google Drive, your own cloud storage) — this keeps the app lightweight and avoids storing copyrighted/large binary files in the database.
- For production, set a strong `JWT_SECRET`, use a managed MongoDB (e.g. Atlas), and serve the frontend build (`npm run build` in `frontend/`) via a static host or behind the same domain as the API.

## Owner
**Pratham Dada** — BCA Student (IGNOU), Dhanbad, Jharkhand
