import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const httpServer = createServer(app);

// ✅ Set allowed origins for frontend (local + Netlify)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://grand-cheesecake-3052a8.netlify.app" // <-- replace with your Netlify URL
];

// ✅ Apply CORS for Express
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Apply middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Apply CORS for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

// Make io accessible in routes if needed
app.set('io', io);

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health route
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend running on Render ✅");
});

// ✅ Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };
