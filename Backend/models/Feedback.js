import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  category: {
    type: String,
    enum: ['UI/UX Experience', 'Model Accuracy', 'Assessment Speed', 'Speech & Prosody', 'Feature Request', 'Overall Satisfaction'],
    default: 'UI/UX Experience',
  },
  feedback: {
    type: String,
    required: [true, 'Feedback text is required'],
  },
  sentiment: {
    type: String,
    enum: ['Positive', 'Neutral', 'Negative'],
    default: 'Positive',
  },
  status: {
    type: String,
    enum: ['New', 'Reviewed', 'Archived'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

