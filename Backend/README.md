# Nexora Node.js & Express + MongoDB Backend API

Production-ready backend API service for **Nexora AI**, built using **Node.js**, **Express.js**, and **MongoDB / Mongoose**.

---

## 🚀 Quick Start

### 1. Run from the project root:
```bash
npm run server
```

### 2. Or run directly from the `server/` folder:
```bash
cd server
npm start
```
The server starts at `http://localhost:5000`.

---

## 🗄️ MongoDB Configuration

In the project root `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/nexora
```

### To use MongoDB Atlas (Cloud Database):
Replace `MONGODB_URI` with your connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nexora?retryWrites=true&w=majority
```

> **Resilient Fallback Mode**: If MongoDB is not yet running locally, the server automatically operates in local JSON file persistence mode so your frontend, APIs, and Admin Portal work without crashing.

---

## 📡 REST API Endpoints

### 1. Analytics & New Visitor Tracking (`/api/analytics`)
- `POST /api/analytics/visit` - Record visitor telemetry (`visitorId`, `isNewVisitor`, `device`, `browser`, `os`, `page`).
- `GET /api/analytics/overview` - Aggregated stats (total visits, **new visitors count**, returning count, 7-day trend).
- `GET /api/analytics/recent` - Stream of recent visitor logs.

### 2. User Enquiries (`/api/enquiries`)
- `POST /api/enquiries` - Submit user enquiry (name, email, organization, type, subject, message).
- `GET /api/enquiries` - List all enquiries with status & priority.
- `PATCH /api/enquiries/:id` - Update status (`New` -> `In Review` -> `Resolved`).
- `DELETE /api/enquiries/:id` - Delete enquiry.

### 3. User Feedback (`/api/feedback`)
- `POST /api/feedback` - Submit 1-5 star rating and comment.
- `GET /api/feedback` - List all feedback with average rating calculation and star distribution.

### 4. Issues & Bug Reports (`/api/issues`)
- `POST /api/issues` - Report bug/glitch with severity (`Critical`, `High`, `Medium`, `Low`).
- `GET /api/issues` - List all issue tickets.
- `PATCH /api/issues/:id` - Update resolution status (`Open`, `Investigating`, `Resolved`).

### 5. Admin Intelligence (`/api/admin`)
- `GET /api/admin/stats` - Host dashboard statistics.
- `GET /api/admin/export` - Export all database records as a downloadable JSON file.
- `POST /api/admin/seed` - Populate initial sample records for testing.

