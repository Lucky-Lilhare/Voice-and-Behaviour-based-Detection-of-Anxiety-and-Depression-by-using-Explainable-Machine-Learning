import express from 'express';
import { Store } from '../services/store.js';

const router = express.Router();

// Submit an enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, organization, type, subject, message, priority } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please provide name, email, subject, and message.' });
    }

    const enquiry = await Store.createEnquiry({
      name,
      email,
      phone: phone || '',
      organization: organization || '',
      type: type || 'General Enquiry',
      subject,
      message,
      priority: priority || 'Medium',
      status: 'New',
    });

    res.status(201).json({ success: true, message: 'Enquiry submitted successfully!', enquiry });
  } catch (err) {
    console.error('Error creating enquiry:', err);
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

// Get all enquiries
router.get('/', async (req, res) => {
  try {
    const enquiries = await Store.getEnquiries();
    res.json({ enquiries });
  } catch (err) {
    console.error('Error fetching enquiries:', err);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// Update enquiry status / notes
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const updated = await Store.updateEnquiryStatus(id, status, notes);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json({ success: true, enquiry: updated });
  } catch (err) {
    console.error('Error updating enquiry:', err);
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
});

// Delete enquiry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Store.deleteEnquiry(id);
    res.json({ success: true, message: 'Enquiry removed' });
  } catch (err) {
    console.error('Error deleting enquiry:', err);
    res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

export default router;

