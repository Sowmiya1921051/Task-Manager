# 🚀 Collaborative Task Manager

A premium, full-stack collaborative task management application (Trello/Jira clone) featuring real-time updates, glassmorphism UI, and robust authentication.

![Task Manager Preview](https://via.placeholder.com/800x400?text=Task+Manager+Dashboard+Preview)

## ✨ Features

-   **🔐 Secure Authentication**: JWT-based authentication with HttpOnly cookies for enhanced security.
-   **📋 Kanban Board**: Dynamic board with "To Do", "In Progress", and "Completed" columns.
-   **🔄 Real-time Collaboration**: Instant task updates across all connected clients using Socket.io.
-   **🎨 Premium UI/UX**: Modern dashboard design with glassmorphism effects, smooth animations, and responsive layouts using Tailwind CSS.
-   **📊 Task Analytics**: Quick overview of total, completed, and pending tasks.
-   **🔍 Search & Filter**: Easily find tasks by title or filter by status.

## 🛠 Tech Stack

### Frontend
-   **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
-   **Icons**: [Lucide React](https://lucide.dev/)

### Backend
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express 5](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Real-time**: [Socket.io](https://socket.io/)
-   **Security**: [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) & [JSON Web Token](https://jwt.io/)

---

## 📂 Project Structure

```text
Task-Manager/
├── backend/                # Node.js + Express + TS
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Auth & error middlewares
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoint definitions
│   │   └── index.ts        # Server entry point
│   └── tests/              # Backend unit tests
├── frontend/               # React + Vite + TS
│   ├── src/
│   │   ├── api/            # Axios instance & API calls
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth context provider
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Dashboard, Login, Register
│   │   └── App.tsx         # Main app component
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   MongoDB (Local or Atlas)

### 1. Clone the project
```bash
git clone https://github.com/Sowmiya1921051/Task-Manager.git
cd Task-Manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```
Run the client:
```bash
npm run dev
```

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login & get session cookie
- `POST /api/auth/logout` - Clear session

### Tasks
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update task status/details
- `DELETE /api/tasks/:id` - Remove a task

---

## 🧪 Testing

Run backend unit tests using Jest:
```bash
cd backend
npm test
```

## 📄 License
This project is licensed under the ISC License.
