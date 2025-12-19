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

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://task-manager-hg0p.onrender.com"
    ],
    credentials: true
  }
});


app.set('io', io);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://task-manager-hg0p.onrender.com"
  ],
  credentials: true
}));


import taskRoutes from './routes/taskRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api', (req, res) => {
  res.send('API is running...');
});


app.get("/", (req, res) => {
  res.send("Backend running on Render ✅");
});



// Socket.io connection (placeholder)
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };
// Trigger restart


// export default app; 