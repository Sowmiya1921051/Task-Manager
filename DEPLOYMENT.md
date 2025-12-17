# 🚀 Deployment Guide

This guide outlines the steps to deploy the **Collaborative Task Manager** to a live environment. We use **Render** for the Backend (Node.js/Socket.io) and **Vercel** for the Frontend (React/Vite).

---

## 📋 Prerequisites

- GitHub Account (with this repository pushed).
- [Render Account](https://render.com/) (Free tier is sufficient).
- [Vercel Account](https://vercel.com/) (Free tier is sufficient).
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) Cluster (Free tier).

---

## 🛠️ Part 1: Database (MongoDB Atlas)

1.  Log in to MongoDB Atlas and create a free cluster.
2.  **Network Access**: Whitelist your IP, or for simplicity during development, allow access from anywhere (`0.0.0.0/0`). *Note: For production, restricting IPs is better, but Render IPs vary.*
3.  **Database Access**: Create a database user (username/password).
4.  **Get Connection String**:
    - Go to "Connect" -> "Drivers".
    - Copy the string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
    - Replace `<password>` with your actual password.

> [!IMPORTANT]
> **Compass vs. Atlas**: If you are currently using **MongoDB Compass** locally (e.g., `mongodb://localhost:27017`), **you cannot use this for the live website**. Your computer is not accessible from the internet. You **MUST** use MongoDB Atlas for the live deployment. You can, however, use Compass to *view* your live Atlas data by pasting the Atlas connection string into Compass.

---

## ⚙️ Part 2: Backend Deployment (Render)

We use Render because it supports persistent **WebSockets** (required for real-time collaboration), unlike Vercel serverless functions.

1.  **New Web Service**:
    - Go to the [Render Dashboard](https://dashboard.render.com/).
    - Click **New +** -> **Web Service**.
    - Select **Build and deploy from a Git repository**.
    - Connect your `Task-Manager` repository.

2.  **Configuration**:
    - **Name**: `task-manager-backend` (or similar).
    - **Root Directory**: `backend` (Important!).
    - **Runtime**: `Node`.
    - **Build Command**: `npm install && npm run build`.
    - **Start Command**: `npm start`.

3.  **Environment Variables** (Scroll down to "Environment Variables"):
    Add the following keys and values:
    
    | Key | Value |
    | :--- | :--- |
    | `MONGO_URI` | Your MongoDB Connection String (from Part 1) |
    | `JWT_SECRET` | A long random string (e.g., `mysecretkey123`) |
    | `NODE_ENV` | `production` |
    | `PORT` | `10000` (Render creates this automatically, but good to check) |

4.  **Deploy**:
    - Click **Create Web Service**.
    - Wait for the build to finish. Once "Live", copy the **Backend URL** (e.g., `https://task-manager-backend.onrender.com`).

---

## 🎨 Part 3: Frontend Deployment (Vercel)

1.  **Import Project**:
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **Add New...** -> **Project**.
    - Import your `Task-Manager` repository.

2.  **Project Settings**:
    - **Framework Preset**: Vite (should be auto-detected).
    - **Root Directory**: Click "Edit" and select `frontend`.

3.  **Environment Variables**:
    - Expand the **Environment Variables** section.
    - Add the following:

    | Key | Value |
    | :--- | :--- |
    | `VITE_API_URL` | Your **Backend URL** from Part 2 (e.g., `https://task-manager-backend.onrender.com`). **Do not add /api at the end, just the base URL.** |

4.  **Deploy**:
    - Click **Deploy**.
    - Vercel will build and deploy your frontend.
    - Once done, you will get a **Frontend URL** (e.g., `https://task-manager-frontend.vercel.app`).

---

## ✅ Verification

1.  Open your **Frontend URL**.
2.  Try to **Sign Up** a new user.
3.  Create a Task.
4.  Open the same URL in an Incognito window (or share with a team member) and login.
5.  Verify that changes appear in real-time (WebSockets).

---

## ℹ️ Troubleshooting

- **CORS Errors**: If the frontend says "Network Error" or CORS issues:
    - Check the Backend logs in Render.
    - Ensure the Backend code allows the Vercel domain in CORS (Currently configured to allow localhost and potentially needs wildcard or specific domain update if strict). 
    - *Tip*: If strict CORS is on, you may need to add your Vercel domain to the `origin` array in `backend/src/index.ts` and redeploy Backend.
- **WebSocket Connection Failed**: Check that `VITE_API_URL` is correct (no trailing slash, https protocol).
