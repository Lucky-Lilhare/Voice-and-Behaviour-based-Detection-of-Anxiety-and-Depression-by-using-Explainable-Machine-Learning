import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { dbState } from '../db.js';
import { Visitor } from '../models/Visitor.js';
import { Enquiry } from '../models/Enquiry.js';
import { Feedback } from '../models/Feedback.js';
import { Issue } from '../models/Issue.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readLocalCollection(collection) {
  try {
    const file = getFilePath(collection);
    if (!fs.existsSync(file)) return [];
    const content = fs.readFileSync(file, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${collection}:`, err);
    return [];
  }
}

function writeLocalCollection(collection, data) {
  try {
    const file = getFilePath(collection);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${collection}:`, err);
  }
}

// Unified Store methods for each entity
export const Store = {
  // ===================== VISITORS & ANALYTICS =====================
  async recordVisit(data) {
    if (dbState.connected) {
      try {
        const doc = await Visitor.create(data);
        return doc.toObject();
      } catch (err) {
        console.warn('DB recordVisit failed, saving to fallback:', err.message);
      }
    }
    const list = readLocalCollection('visitors');
    const record = {
      _id: crypto.randomUUID(),
      ...data,
      timestamp: new Date().toISOString(),
    };
    list.unshift(record);
    // Keep max 5000 records locally
    if (list.length > 5000) list.length = 5000;
    writeLocalCollection('visitors', list);
    return record;
  },

  async getVisitors(limit = 100) {
    if (dbState.connected) {
      try {
        return await Visitor.find().sort({ timestamp: -1 }).limit(limit).lean();
      } catch (err) {
        console.warn('DB getVisitors failed:', err.message);
      }
    }
    return readLocalCollection('visitors').slice(0, limit);
  },

  async getAnalyticsSummary() {
    let visitors = [];
    if (dbState.connected) {
      try {
        visitors = await Visitor.find().lean();
      } catch (err) {
        console.warn('DB getAnalyticsSummary fallback:', err.message);
        visitors = readLocalCollection('visitors');
      }
    } else {
      visitors = readLocalCollection('visitors');
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    const totalVisits = visitors.length;
    const uniqueVisitorIds = new Set();
    let newVisitorsCount = 0;
    let returningVisitsCount = 0;
    let todayVisits = 0;
    let todayNewVisitors = 0;

    // Track devices & browsers
    const devices = { Desktop: 0, Mobile: 0, Tablet: 0 };
    const browsers = {};
    const pageViews = {};

    visitors.forEach(v => {
      const vTime = new Date(v.timestamp).getTime();
      const isToday = vTime >= todayStart;

      if (v.isNewVisitor) {
        newVisitorsCount++;
        if (isToday) todayNewVisitors++;
      } else {
        returningVisitsCount++;
      }

      if (isToday) todayVisits++;
      if (v.visitorId) uniqueVisitorIds.add(v.visitorId);

      // Device
      const dev = v.device || 'Desktop';
      devices[dev] = (devices[dev] || 0) + 1;

      // Browser
      const br = v.browser || 'Other';
      browsers[br] = (browsers[br] || 0) + 1;

      // Page
      const pg = v.page || '/';
      pageViews[pg] = (pageViews[pg] || 0) + 1;
    });

    // 7-Day Trend
    const dailyMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dailyMap[key] = { date: key, total: 0, newVisitors: 0, returning: 0 };
    }

    visitors.forEach(v => {
      const vTime = new Date(v.timestamp).getTime();
      if (vTime >= sevenDaysAgo) {
        const d = new Date(v.timestamp);
        const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (dailyMap[key]) {
          dailyMap[key].total++;
          if (v.isNewVisitor) {
            dailyMap[key].newVisitors++;
          } else {
            dailyMap[key].returning++;
          }
        }
      }
    });

    const dailyTrend = Object.values(dailyMap);

    return {
      totalVisits,
      uniqueVisitors: uniqueVisitorIds.size || totalVisits,
      newVisitors: newVisitorsCount,
      returningVisitors: returningVisitsCount,
      todayVisits,
      todayNewVisitors,
      newRatio: totalVisits > 0 ? Math.round((newVisitorsCount / totalVisits) * 100) : 0,
      devices,
      browsers,
      topPages: Object.entries(pageViews).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([page, count]) => ({ page, count })),
      dailyTrend,
    };
  },

  // ===================== ENQUIRIES =====================
  async createEnquiry(data) {
    if (dbState.connected) {
      try {
        const doc = await Enquiry.create(data);
        return doc.toObject();
      } catch (err) {
        console.warn('DB createEnquiry fallback:', err.message);
      }
    }
    const list = readLocalCollection('enquiries');
    const record = {
      _id: crypto.randomUUID(),
      ...data,
      status: data.status || 'New',
      priority: data.priority || 'Medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(record);
    writeLocalCollection('enquiries', list);
    return record;
  },

  async getEnquiries() {
    if (dbState.connected) {
      try {
        return await Enquiry.find().sort({ createdAt: -1 }).lean();
      } catch (err) {
        console.warn('DB getEnquiries fallback:', err.message);
      }
    }
    return readLocalCollection('enquiries');
  },

  async updateEnquiryStatus(id, status, notes) {
    if (dbState.connected) {
      try {
        const updateData = { status, updatedAt: new Date() };
        if (notes !== undefined) updateData.notes = notes;
        return await Enquiry.findByIdAndUpdate(id, updateData, { new: true }).lean();
      } catch (err) {
        console.warn('DB updateEnquiryStatus fallback:', err.message);
      }
    }
    const list = readLocalCollection('enquiries');
    const item = list.find(e => e._id === id || e.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      item.updatedAt = new Date().toISOString();
      writeLocalCollection('enquiries', list);
      return item;
    }
    return null;
  },

  async deleteEnquiry(id) {
    if (dbState.connected) {
      try {
        return await Enquiry.findByIdAndDelete(id);
      } catch (err) {
        console.warn('DB deleteEnquiry fallback:', err.message);
      }
    }
    let list = readLocalCollection('enquiries');
    list = list.filter(e => e._id !== id && e.id !== id);
    writeLocalCollection('enquiries', list);
    return true;
  },

  // ===================== FEEDBACK =====================
  async createFeedback(data) {
    const rating = Number(data.rating) || 5;
    let sentiment = 'Positive';
    if (rating <= 2) sentiment = 'Negative';
    else if (rating === 3) sentiment = 'Neutral';

    const payload = {
      ...data,
      rating,
      sentiment,
      status: data.status || 'New',
    };

    if (dbState.connected) {
      try {
        const doc = await Feedback.create(payload);
        return doc.toObject();
      } catch (err) {
        console.warn('DB createFeedback fallback:', err.message);
      }
    }
    const list = readLocalCollection('feedback');
    const record = {
      _id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    list.unshift(record);
    writeLocalCollection('feedback', list);
    return record;
  },

  async getFeedback() {
    if (dbState.connected) {
      try {
        return await Feedback.find().sort({ createdAt: -1 }).lean();
      } catch (err) {
        console.warn('DB getFeedback fallback:', err.message);
      }
    }
    return readLocalCollection('feedback');
  },

  // ===================== ISSUES / BUGS =====================
  async createIssue(data) {
    if (dbState.connected) {
      try {
        const doc = await Issue.create(data);
        return doc.toObject();
      } catch (err) {
        console.warn('DB createIssue fallback:', err.message);
      }
    }
    const list = readLocalCollection('issues');
    const record = {
      _id: crypto.randomUUID(),
      ...data,
      status: data.status || 'Open',
      severity: data.severity || 'Medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(record);
    writeLocalCollection('issues', list);
    return record;
  },

  async getIssues() {
    if (dbState.connected) {
      try {
        return await Issue.find().sort({ createdAt: -1 }).lean();
      } catch (err) {
        console.warn('DB getIssues fallback:', err.message);
      }
    }
    return readLocalCollection('issues');
  },

  async updateIssueStatus(id, status, resolutionNotes) {
    if (dbState.connected) {
      try {
        const updateData = { status, updatedAt: new Date() };
        if (resolutionNotes !== undefined) updateData.resolutionNotes = resolutionNotes;
        return await Issue.findByIdAndUpdate(id, updateData, { new: true }).lean();
      } catch (err) {
        console.warn('DB updateIssueStatus fallback:', err.message);
      }
    }
    const list = readLocalCollection('issues');
    const item = list.find(i => i._id === id || i.id === id);
    if (item) {
      item.status = status;
      if (resolutionNotes !== undefined) item.resolutionNotes = resolutionNotes;
      item.updatedAt = new Date().toISOString();
      writeLocalCollection('issues', list);
      return item;
    }
    return null;
  },

  async deleteIssue(id) {
    if (dbState.connected) {
      try {
        return await Issue.findByIdAndDelete(id);
      } catch (err) {
        console.warn('DB deleteIssue fallback:', err.message);
      }
    }
    let list = readLocalCollection('issues');
    list = list.filter(i => i._id !== id && i.id !== id);
    writeLocalCollection('issues', list);
    return true;
  },

  // ===================== SEED SAMPLE DATA =====================
  async seedInitialDataIfEmpty() {
    const enquiries = await this.getEnquiries();
    if (enquiries.length === 0) {
      console.log('🌱 Seeding sample enquiries...');
      const sampleEnquiries = [
        {
          name: 'Dr. Sarah Jenkins',
          email: 's.jenkins@stanford.edu',
          organization: 'Stanford Neuroscience Institute',
          type: 'Research Demo',
          subject: 'Acoustic biomarker validation for clinical study',
          message: 'We are conducting an IRB-approved depression screening cohort study and would like to integrate Nexora’s acoustic prosodic variance pipeline into our lab workflow.',
          status: 'New',
          priority: 'High',
          createdAt: new Date(Date.now() - 3 * 3600 * 1000),
        },
        {
          name: 'Marcus Vance',
          email: 'm.vance@neurotech-capital.io',
          organization: 'Vance NeuroTech Ventures',
          type: 'Sales & Enterprise',
          subject: 'Enterprise API integration and SLA tiers',
          message: 'Looking to license the multimodal inference pipeline for an enterprise employee wellness app reaching 50,000 corporate seats. Can we schedule a technical walkthrough?',
          status: 'In Review',
          priority: 'Urgent',
          createdAt: new Date(Date.now() - 14 * 3600 * 1000),
        },
        {
          name: 'Ananya Sharma',
          email: 'ananya.s@aiims.res.in',
          organization: 'AIIMS Dept of Psychiatry',
          type: 'Clinical Trial',
          subject: 'Facial Action Unit 4 & 15 telemetry documentation',
          message: 'Could you share the calibration bounds used for micro-expression eyebrow furrow detection? Our research team is validating correlation with PHQ-9 sub-scores.',
          status: 'Contacted',
          priority: 'Medium',
          createdAt: new Date(Date.now() - 28 * 3600 * 1000),
        },
      ];
      for (const e of sampleEnquiries) {
        await this.createEnquiry(e);
      }
    }

    const feedbacks = await this.getFeedback();
    if (feedbacks.length === 0) {
      console.log('🌱 Seeding sample feedback...');
      const sampleFeedbacks = [
        {
          name: 'Elena Rostova',
          email: 'elena.rostova@techlabs.de',
          rating: 5,
          category: 'UI/UX Experience',
          feedback: 'The new ethereal glass UI and live audio visualizer are mesmerizing. The assessment is soothing and completely non-intrusive.',
          sentiment: 'Positive',
          createdAt: new Date(Date.now() - 5 * 3600 * 1000),
        },
        {
          name: 'Dr. Kevin Patel',
          email: 'kevin.p@mindwell.org',
          rating: 5,
          category: 'Model Accuracy',
          feedback: 'SHAP attribution breakdown in the explainability dashboard matches empirical psychiatric findings remarkably well.',
          sentiment: 'Positive',
          createdAt: new Date(Date.now() - 18 * 3600 * 1000),
        },
        {
          name: 'Jessica Wu',
          email: 'jess.wu@student.cmu.edu',
          rating: 4,
          category: 'Assessment Speed',
          feedback: 'Extremely fast client-side inference! Would love an option to re-record individual voice prompts if background noise occurs.',
          sentiment: 'Positive',
          createdAt: new Date(Date.now() - 36 * 3600 * 1000),
        },
      ];
      for (const f of sampleFeedbacks) {
        await this.createFeedback(f);
      }
    }

    const issues = await this.getIssues();
    if (issues.length === 0) {
      console.log('🌱 Seeding sample issues...');
      const sampleIssues = [
        {
          title: 'Bluetooth headset sampling rate warning on Firefox',
          description: 'A warning toast appeared stating audio sample rate was clamped to 44.1kHz instead of 48kHz when connected via AirPods on Firefox.',
          reportedBy: 'Dev Tester',
          email: 'qa@nexora.health',
          category: 'Microphone/Audio Glitch',
          severity: 'Low',
          status: 'Open',
          stepsToReproduce: '1. Connect AirPods Pro via Bluetooth\n2. Open Firefox on macOS\n3. Click Start Voice Assessment',
          deviceInfo: 'Firefox 128 / macOS Sonoma',
          createdAt: new Date(Date.now() - 8 * 3600 * 1000),
        },
        {
          title: 'Webcam permission re-prompt after tab backgrounding',
          description: 'If user switches to another browser tab during video recording and returns, camera feed flickers once before resuming.',
          reportedBy: 'Alex Chen',
          email: 'alex.chen@gmail.com',
          category: 'Camera/Video Action Units',
          severity: 'Medium',
          status: 'Investigating',
          stepsToReproduce: 'Switch tabs while AU tracking is running and switch back after 10 seconds.',
          deviceInfo: 'Chrome 127 / Windows 11',
          createdAt: new Date(Date.now() - 22 * 3600 * 1000),
        },
      ];
      for (const i of sampleIssues) {
        await this.createIssue(i);
      }
    }

    const visitors = await this.getVisitors(10);
    if (visitors.length === 0) {
      console.log('🌱 Seeding initial visitor telemetry...');
      const pages = ['/', '/product', '/technology', '/pricing', '/assessment', '/use-cases'];
      const browsers = ['Chrome', 'Edge', 'Safari', 'Firefox'];
      const devices = ['Desktop', 'Desktop', 'Desktop', 'Mobile', 'Tablet'];
      const osList = ['Windows', 'macOS', 'iOS', 'Android', 'Linux'];

      const now = Date.now();
      for (let i = 0; i < 48; i++) {
        const hoursAgo = Math.floor(Math.random() * 140);
        const isNew = Math.random() > 0.42;
        await this.recordVisit({
          visitorId: `vis_${Math.floor(100000 + Math.random() * 900000)}`,
          ip: `192.168.1.${Math.floor(10 + Math.random() * 200)}`,
          isNewVisitor: isNew,
          visitCount: isNew ? 1 : Math.floor(2 + Math.random() * 6),
          page: pages[Math.floor(Math.random() * pages.length)],
          device: devices[Math.floor(Math.random() * devices.length)],
          browser: browsers[Math.floor(Math.random() * browsers.length)],
          os: osList[Math.floor(Math.random() * osList.length)],
          referrer: Math.random() > 0.5 ? 'Google Search' : Math.random() > 0.5 ? 'Direct' : 'LinkedIn',
          timestamp: new Date(now - hoursAgo * 3600 * 1000),
        });
      }
    }
  },
};

