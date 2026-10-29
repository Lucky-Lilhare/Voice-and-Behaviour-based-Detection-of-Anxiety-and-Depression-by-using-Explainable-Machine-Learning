import express from 'express';
import { Store } from '../services/store.js';

const router = express.Router();

// Report an issue
router.post('/', async (req, res) => {
  try {
    const { title, description, reportedBy, email, category, severity, stepsToReproduce, deviceInfo } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Issue title and description are required.' });
    }

    const issue = await Store.createIssue({
      title,
      description,
      reportedBy: reportedBy || 'Anonymous User',
      email: email || '',
      category: category || 'UI/Layout Glitch',
      severity: severity || 'Medium',
      stepsToReproduce: stepsToReproduce || '',
      deviceInfo: deviceInfo || '',
      status: 'Open',
    });

    res.status(201).json({ success: true, message: 'Issue reported successfully! Our engineering team will review it.', issue });
  } catch (err) {
    console.error('Error reporting issue:', err);
    res.status(500).json({ error: 'Failed to report issue' });
  }
});

// Get all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Store.getIssues();
    res.json({ issues });
  } catch (err) {
    console.error('Error fetching issues:', err);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Update issue status / notes
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolutionNotes } = req.body;
    const updated = await Store.updateIssueStatus(id, status, resolutionNotes);
    if (!updated) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.json({ success: true, issue: updated });
  } catch (err) {
    console.error('Error updating issue:', err);
    res.status(500).json({ error: 'Failed to update issue' });
  }
});

// Delete issue
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Store.deleteIssue(id);
    res.json({ success: true, message: 'Issue removed' });
  } catch (err) {
    console.error('Error deleting issue:', err);
    res.status(500).json({ error: 'Failed to delete issue' });
  }
});

export default router;

