import express from 'express';
import { Store } from '../services/store.js';

const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, rating, category, feedback } = req.body;

    if (!rating || !feedback) {
      return res.status(400).json({ error: 'Rating and feedback text are required.' });
    }

    const item = await Store.createFeedback({
      name: name || 'Anonymous User',
      email: email || '',
      rating: Number(rating),
      category: category || 'UI/UX Experience',
      feedback,
    });

    res.status(201).json({ success: true, message: 'Thank you for your feedback!', feedback: item });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ error: 'Failed to record feedback' });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Store.getFeedback();
    
    // Calculate stats
    const total = feedbacks.length;
    let sumRating = 0;
    const ratingDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    feedbacks.forEach(f => {
      sumRating += (f.rating || 5);
      if (ratingDist[f.rating] !== undefined) ratingDist[f.rating]++;
    });

    const averageRating = total > 0 ? (sumRating / total).toFixed(1) : '5.0';

    res.json({
      feedbacks,
      total,
      averageRating: Number(averageRating),
      ratingDistribution: ratingDist,
    });
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

export default router;

