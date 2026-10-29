import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Issue title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Issue description is required'],
  },
  reportedBy: {
    type: String,
    default: 'Anonymous User',
    trim: true,
  },
  email: {
    type: String,
    default: '',
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
    enum: ['Microphone/Audio Glitch', 'Camera/Video Action Units', 'Inference Timeout', 'UI/Layout Glitch', 'Authentication', 'Export/Download Bug', 'Other'],
    default: 'UI/Layout Glitch',
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Open', 'Investigating', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
  },
  stepsToReproduce: {
    type: String,
    default: '',
  },
  deviceInfo: {
    type: String,
    default: '',
  },
  resolutionNotes: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

issueSchema.pre('save', function () {
  this.updatedAt = new Date();
});

export const Issue = mongoose.models.Issue || mongoose.model('Issue', issueSchema);

