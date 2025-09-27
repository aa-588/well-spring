import { Router } from 'express';
import Volunteer from '../models/Volunteer';

const router = Router();

// GET /volunteer
router.get('/', async (_req, res) => {
    try {
        const list = await Volunteer.find().sort({ createdAt: -1 });
        res.json(list);
    } catch { res.status(500).json({ error: 'Failed to fetch volunteers' }); }
});

// GET /volunteer/:id
router.get('/:id', async (req, res) => {
    try {
        const v = await Volunteer.findById(req.params.id);
        if (!v) return res.status(404).json({ error: 'Not found' });
        res.json(v);
    } catch { res.status(400).json({ error: 'Invalid id' }); }
});

// POST /volunteer
router.post('/', async (req, res) => {
    try {
        const created = await Volunteer.create(req.body);
        res.json(created);
    } catch { res.status(400).json({ error: 'Failed to create volunteer' }); }
});

// PUT /volunteer/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch { res.status(400).json({ error: 'Failed to update volunteer' }); }
});

// DELETE /volunteer/:id
router.delete('/:id', async (req, res) => {
    try {
        await Volunteer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Volunteer deleted' });
    } catch { res.status(400).json({ error: 'Failed to delete volunteer' }); }
});

export default router;
