import { Router } from 'express';
import Seeker from '../models/Seeker';
import Case from '../models/Case';

const router = Router();

// GET /seekers
router.get('/', async (_req, res) => {
    try {
        const list = await Seeker.find().sort({ createdAt: -1 });
        res.json(list);
    } catch { res.status(500).json({ error: 'Failed to fetch seekers' }); }
});

// GET /seekers/:id
router.get('/:id', async (req, res) => {
    try {
        const s = await Seeker.findById(req.params.id);
        if (!s) return res.status(404).json({ error: 'Not found' });
        res.json(s);
    } catch { res.status(400).json({ error: 'Invalid id' }); }
});

// POST /seekers
router.post('/', async (req, res) => {
    try {
        const created = await Seeker.create(req.body);
        res.json(created);
    } catch { res.status(400).json({ error: 'Failed to create seeker' }); }
});

// PUT /seekers/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await Seeker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch { res.status(400).json({ error: 'Failed to update seeker' }); }
});

// DELETE /seekers/:id
router.delete('/:id', async (req, res) => {
    try {
        await Seeker.findByIdAndDelete(req.params.id);
        res.json({ message: 'Seeker deleted' });
    } catch { res.status(400).json({ error: 'Failed to delete seeker' }); }
});

// GET /seekers/:id/cases
router.get('/:id/cases', async (req, res) => {
    try {
        const items = await Case.find({ seekerId: req.params.id }).sort({ createdAt: -1 });
        res.json(items);
    } catch { res.status(500).json({ error: 'Failed to fetch cases' }); }
});

// POST /seekers/:id/cases  (quick-create a case for seeker)
router.post('/:id/cases', async (req, res) => {
    try {
        const payload = { ...req.body, seekerId: req.params.id, familyName: req.body.familyName ?? 'Seeker Family' };
        const created = await Case.create(payload);
        res.json(created);
    } catch { res.status(400).json({ error: 'Failed to create case' }); }
});

export default router;