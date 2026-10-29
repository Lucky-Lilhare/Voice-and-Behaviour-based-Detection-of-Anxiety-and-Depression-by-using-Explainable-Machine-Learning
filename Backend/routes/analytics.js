import express from 'express';
import { Store } from '../services/store.js';

const router = express.Router();

// Record a new visitor hit
router.post('/visit', async (req, res) => {
  try {
    const { visitorId, isNewVisitor, visitCount, page, referrer, device, browser, os, durationSeconds } = req.body;

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || '';

    const visitRecord = await Store.recordVisit({
      visitorId: visitorId || `anon_${Date.now()}`,
      ip: typeof ip === 'string' ? ip.split(',')[0].trim() : '127.0.0.1',
      isNewVisitor: Boolean(isNewVisitor),
      visitCount: Number(visitCount) || 1,
      page: page || '/',
      referrer: referrer || 'Direct',
      device: device || 'Desktop',
      browser: browser || 'Unknown',
      os: os || 'Unknown',
      userAgent,
      durationSeconds: Number(durationSeconds) || 0,
      timestamp: new Date(),
    });

    res.status(201).json({ success: true, visit: visitRecord });
  } catch (err) {
    console.error('Error logging visit:', err);
    res.status(500).json({ error: 'Failed to record visitor telemetry' });
  }
});

// Get analytics overview (New vs Returning visitors, charts, device stats)
router.get('/overview', async (req, res) => {
  try {
    const summary = await Store.getAnalyticsSummary();
    res.json(summary);
  } catch (err) {
    console.error('Error getting analytics summary:', err);
    res.status(500).json({ error: 'Failed to get analytics summary' });
  }
});

// Get recent visitors list
router.get('/recent', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const visitors = await Store.getVisitors(limit);
    res.json({ visitors });
  } catch (err) {
    console.error('Error getting recent visitors:', err);
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

export default router;

