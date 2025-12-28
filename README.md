# CipherSQLStudio

CipherSQLStudio is a full-stack SQL learning and execution platform that allows users to write SQL queries, execute them against a real PostgreSQL database, and receive intelligent hints powered by an LLM — without revealing the final solution.

This project was developed as part of a **Full-Stack Developer Recruitment Assignment (Project-Based Evaluation)**.

---

## 🚀 Features

- Execute SQL queries directly in the browser
- Real PostgreSQL-backed query execution
- Intelligent hint generation using LLMs (without revealing answers)
- Assignment-based learning workflow
- Clean and minimal UI for better focus
- Robust error handling for invalid SQL queries
- Clear separation between frontend and backend

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6)
- Vanilla CSS
- Fetch API

### Backend
- Node.js
- Express.js
- PostgreSQL
- OpenAI API (used for contextual hint generation)


---
## 🔄 Architecture & Data Flow

1. User selects an assignment and writes a SQL query in the frontend
2. React frontend sends the query to the Express backend via REST API
3. Backend validates and executes the query on PostgreSQL
4. Query results or errors are returned to the frontend
5. For hints, the backend sends contextual prompts to the OpenAI API
6. LLM returns guidance without revealing the final solution

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm

### Backend
```bash
cd backend
npm install
node server.js



