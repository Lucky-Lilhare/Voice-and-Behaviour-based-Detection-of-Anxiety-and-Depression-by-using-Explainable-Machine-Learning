import express from 'express';
import crypto from 'crypto';
import { Store } from '../services/store.js';
import { dbState } from '../db.js';

const router = express.Router();

// Active host sessions
const validHostTokens = new Set();

function generateToken() {
  const token = crypto.randomBytes(32).toString('hex');
  validHostTokens.add(token);
  return token;
}

// Authentication Middleware for Host-Only Endpoints
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : req.query.token;

  if (!token || !validHostTokens.has(token)) {
    return res.status(401).json({ 
      error: 'Unauthorized: Host authentication required to view admin telemetry and user data.' 
    });
  }
  next();
}

// Host Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (!username || !password) {
      return res.status(400).json({ error: 'Please enter both username and password.' });
    }

    if (username.trim() === expectedUser && password === expectedPass) {
      const token = generateToken();
      return res.json({
        success: true,
        token,
        host: {
          username: expectedUser,
          role: 'Platform Host Administrator',
          authenticatedAt: new Date().toISOString(),
        },
      });
    }

    return res.status(401).json({ error: 'Invalid host username or password.' });
  } catch (err) {
    console.error('Host login error:', err);
    res.status(500).json({ error: 'Internal server authentication error' });
  }
});

// Verify Host Session
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : req.query.token;

  if (token && validHostTokens.has(token)) {
    return res.json({ valid: true });
  }
  return res.status(401).json({ valid: false });
});

// Host Logout / Invalidate Session
router.post('/logout', (req, res) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : req.body.token;

  if (token) {
    validHostTokens.delete(token);
  }
  res.json({ success: true, message: 'Host logged out successfully' });
});

// Get complete admin dashboard host stats (Protected)
router.get('/stats', requireAdminAuth, async (req, res) => {
  try {
    const analytics = await Store.getAnalyticsSummary();
    const enquiries = await Store.getEnquiries();
    const feedbacks = await Store.getFeedback();
    const issues = await Store.getIssues();

    const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
    const openIssuesCount = issues.filter(i => i.status === 'Open' || i.status === 'Investigating').length;
    const criticalIssuesCount = issues.filter(i => i.severity === 'Critical' && i.status !== 'Resolved').length;

    let totalRating = 0;
    feedbacks.forEach(f => totalRating += (f.rating || 5));
    const avgRating = feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(1) : '5.0';

    res.json({
      database: {
        connected: dbState.connected,
        isUsingFallback: dbState.isUsingFallback,
        uri: dbState.connected ? dbState.uri : 'Resilient In-Memory / File Storage',
        type: dbState.connected ? 'MongoDB (Live Cluster)' : 'Local File Persistence',
      },
      counts: {
        totalVisitors: analytics.totalVisits,
        newVisitors: analytics.newVisitors,
        returningVisitors: analytics.returningVisitors,
        todayVisits: analytics.todayVisits,
        todayNewVisitors: analytics.todayNewVisitors,
        newRatio: analytics.newRatio,
        totalEnquiries: enquiries.length,
        newEnquiries: newEnquiriesCount,
        totalFeedback: feedbacks.length,
        averageRating: Number(avgRating),
        totalIssues: issues.length,
        openIssues: openIssuesCount,
        criticalIssues: criticalIssuesCount,
      },
      analytics,
      recentEnquiries: enquiries.slice(0, 5),
      recentFeedback: feedbacks.slice(0, 5),
      recentIssues: issues.slice(0, 5),
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// Exact MongoDB Database Live View (Protected)
router.get('/database-view', requireAdminAuth, async (req, res) => {
  try {
    const enquiries = await Store.getEnquiries();
    const feedback = await Store.getFeedback();
    const issues = await Store.getIssues();
    const visitors = await Store.getVisitors(100);

    const collections = [
      {
        name: 'enquiries',
        fullName: 'nexora.enquiries',
        label: 'User Inquiries & Leads',
        count: enquiries.length,
        description: 'Customer contact forms, demo requests & business inquiries stored with timestamps',
        documents: enquiries,
      },
      {
        name: 'feedback',
        fullName: 'nexora.feedback',
        label: 'Customer Feedback & Ratings',
        count: feedback.length,
        description: 'User satisfaction scores (1-5 stars), tags & comments stored in MongoDB',
        documents: feedback,
      },
      {
        name: 'issues',
        fullName: 'nexora.issues',
        label: 'Issues & Bug Reports',
        count: issues.length,
        description: 'User-reported platform issues, device info, priority and resolution status',
        documents: issues,
      },
      {
        name: 'visitors',
        fullName: 'nexora.visitors',
        label: 'Visitor Footprints & Telemetry',
        count: visitors.length,
        description: 'Real-time visitor logs, first-time vs returning flags, device telemetry',
        documents: visitors,
      },
    ];

    // Build unified live stream of all user activities sorted newest first
    const unifiedStream = [
      ...enquiries.map(d => ({ ...d, _collection: 'enquiries', _entityType: 'Enquiry Submission', _timestamp: d.createdAt || d.updatedAt })),
      ...feedback.map(d => ({ ...d, _collection: 'feedback', _entityType: 'Feedback Given', _timestamp: d.createdAt || d.updatedAt })),
      ...issues.map(d => ({ ...d, _collection: 'issues', _entityType: 'Bug / Issue Reported', _timestamp: d.createdAt || d.updatedAt })),
      ...visitors.map(d => ({ ...d, _collection: 'visitors', _entityType: d.isNewVisitor ? 'New Visitor Arrival' : 'Returning Visitor', _timestamp: d.timestamp })),
    ].sort((a, b) => new Date(b._timestamp || 0) - new Date(a._timestamp || 0));

    res.json({
      success: true,
      database: {
        name: 'nexora',
        connected: dbState.connected,
        cluster: 'cluster0.qeqxjuq.mongodb.net',
        type: dbState.connected ? 'MongoDB Atlas Live Cluster' : 'Local Fallback Persistence',
        uri: dbState.connected ? dbState.uri : 'Local Mock',
        syncedAt: new Date().toISOString(),
        totalCollections: collections.length,
        totalDocuments: enquiries.length + feedback.length + issues.length + visitors.length,
      },
      collections,
      unifiedStream: unifiedStream.slice(0, 100),
    });
  } catch (err) {
    console.error('Error fetching database view:', err);
    res.status(500).json({ error: 'Failed to retrieve database view' });
  }
});

// Seed data route (Protected)
router.post('/seed', requireAdminAuth, async (req, res) => {
  try {
    await Store.seedInitialDataIfEmpty();
    res.json({ success: true, message: 'Database sample records refreshed!' });
  } catch (err) {
    console.error('Error seeding data:', err);
    res.status(500).json({ error: 'Failed to seed sample records' });
  }
});

// Export all data (Protected)
router.get('/export', requireAdminAuth, async (req, res) => {
  try {
    const enquiries = await Store.getEnquiries();
    const feedback = await Store.getFeedback();
    const issues = await Store.getIssues();
    const visitors = await Store.getVisitors(1000);

    const exportData = {
      exportedAt: new Date().toISOString(),
      counts: {
        visitors: visitors.length,
        enquiries: enquiries.length,
        feedback: feedback.length,
        issues: issues.length,
      },
      enquiries,
      feedback,
      issues,
      visitors,
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="nexora-userdata-export.json"');
    res.send(JSON.stringify(exportData, null, 2));
  } catch (err) {
    console.error('Error exporting data:', err);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

export default router;
