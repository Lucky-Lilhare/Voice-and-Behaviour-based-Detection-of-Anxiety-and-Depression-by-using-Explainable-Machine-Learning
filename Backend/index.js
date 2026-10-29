import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db.js';
import { Store } from './services/store.js';

import analyticsRoutes from './routes/analytics.js';
import enquiriesRoutes from './routes/enquiries.js';
import feedbackRoutes from './routes/feedback.js';
import issuesRoutes from './routes/issues.js';
import adminRoutes from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder or root folder
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/enquiries', enquiriesRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/issues', issuesRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Start server
async function startServer() {
  await connectDB();
  await Store.seedInitialDataIfEmpty();

  app.listen(PORT, () => {
    console.log(`🚀 Nexora API Backend running on http://localhost:${PORT}`);
    console.log(`📊 Analytics & Admin API ready at http://localhost:${PORT}/api/admin/stats`);
  });
}

startServer();

