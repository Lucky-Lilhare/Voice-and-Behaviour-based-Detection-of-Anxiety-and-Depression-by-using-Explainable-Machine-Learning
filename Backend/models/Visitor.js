import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
    index: true,
  },
  ip: {
    type: String,
    default: '127.0.0.1',
  },
  isNewVisitor: {
    type: Boolean,
    default: true,
  },
  visitCount: {
    type: Number,
    default: 1,
  },
  page: {
    type: String,
    default: '/',
  },
  referrer: {
    type: String,
    default: 'Direct',
  },
  device: {
    type: String,
    enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
    default: 'Desktop',
  },
  browser: {
    type: String,
    default: 'Chrome',
  },
  os: {
    type: String,
    default: 'Windows',
  },
  userAgent: {
    type: String,
    default: '',
  },
  durationSeconds: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);

