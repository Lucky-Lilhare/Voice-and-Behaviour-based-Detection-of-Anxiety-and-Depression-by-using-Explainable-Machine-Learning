import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: '',
    trim: true,
  },
  organization: {
    type: String,
    default: '',
    trim: true,
  },
  type: {
    type: String,
    enum: ['General Enquiry', 'Sales & Enterprise', 'Research Demo', 'Clinical Trial', 'Partnership', 'Press & Media'],
    default: 'General Enquiry',
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
  },
  status: {
    type: String,
    enum: ['New', 'In Review', 'Contacted', 'Resolved'],
    default: 'New',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium',
  },
  notes: {
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

enquirySchema.pre('save', function () {
  this.updatedAt = new Date();
});

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

