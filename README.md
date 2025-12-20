# 🚀 Collaborative Task Manager

A full-stack task management application with real-time collaboration, secure authentication, and a modern dashboard UI.

## ✨ Features
- 🔐 JWT Authentication with HttpOnly cookies  
- 📋 Kanban-style task board (To Do, In Progress, Completed)  
- 🔄 Real-time updates using Socket.io  
- 🎨 Responsive UI built with Tailwind CSS  
- 🔍 Search and filter tasks  

## 🛠 Tech Stack
**Frontend:** React (Vite) · TypeScript · Tailwind CSS · React Query  
**Backend:** Node.js · Express · MongoDB · Mongoose · Socket.io  

## 📂 Project Structure
Task-Manager/
├── backend/ # Express + MongoDB
└── frontend/ # React + Vite


## 🚀 Getting Started

### Backend
```bash
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🔌 API Endpoints

POST /api/auth/login

POST /api/auth/register

GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id
