# Deployment Guide

## Backend (Render)

1.  Create a new Web Service on [Render](https://render.com/).
2.  Connect your GitHub repository.
3.  Set **Root Directory** to `backend`.
4.  Set **Build Command** to `npm install && npm run build`.
5.  Set **Start Command** to `npm start`.
6.  Add Environment Variables:
    - `MONGO_URI`: Your MongoDB Atlas connection string.
    - `JWT_SECRET`: A strong secret key.
    - `NODE_ENV`: `production`.
    - `PORT`: `10000` (or whatever Render assigns).

## Frontend (Vercel)

1.  Import project to [Vercel](https://vercel.com/).
2.  Set **Root Directory** to `frontend`.
3.  The Build Command and Output Directory should be auto-detected (`npm run build`, `dist`).
4.  **Important**: You need to update the API URL in `frontend/src/api/client.ts` and `frontend/src/hooks/useSocket.ts` to point to your deployed Backend URL instead of `localhost`.
    - Use Environment Variables like `VITE_API_URL`.

## MongoDB (Atlas)

1.  Create a Cluster on MongoDB Atlas.
2.  Create a Database User.
3.  Get the Connection String and use it in Backend env vars.
