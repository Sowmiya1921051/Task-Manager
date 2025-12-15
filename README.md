# Collaborative Task Manager

A full-stack collaborative task management application (Trello/Jira clone) with real-time updates using Socket.io.

## Features

- **Authentication**: JWT-based auth with HttpOnly cookies.
- **Task Management**: Create, Read, Update, Delete tasks.
- **Kanban Board**: Real-time status updates (To Do, In Progress, Completed).
- **Real-time Collaboration**: Instant updates across clients via Socket.io.
- **Responsive UI**: Built with Tailwind CSS.

## Tech Stack

- **Frontend**: Vite + React, TypeScript, Tailwind CSS, React Query, React Hook Form, Zod.
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose, Socket.io.

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the repository**

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env file with PORT and MONGO_URI
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access App**
    Open `http://localhost:5173` in your browser.

## Testing

Backend unit tests:
```bash
cd backend
npm test
```
