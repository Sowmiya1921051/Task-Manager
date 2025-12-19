import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

/* ===================== CORS ===================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://task-manage-r.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

/* ===================== MIDDLEWARE ===================== */

app.use(express.json());
app.use(cookieParser());

/* ===================== SOCKET.IO ===================== */

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

app.set("io", io);

/* ===================== ROUTES ===================== */

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api", (req, res) => {
  res.send("API is running...");
});

app.get("/", (req, res) => {
  res.send("Backend running on Render ✅");
});

/* ===================== SOCKET EVENTS ===================== */

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* ===================== SERVER ===================== */

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };
