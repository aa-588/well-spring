import { Router } from 'express';
import Case from '../models/Case';

const router = Router();

// GET /cases
router.get('/', async (req, res) => {
    try {
        const q: any = {};
        if (req.query.assignedVolunteerId) q.assignedVolunteerId = String(req.query.assignedVolunteerId);
        if (req.query.status) q.status = String(req.query.status);
        const items = await Case.find(q).sort({ createdAt: -1 });
        res.json(items);
    } catch (e) { res.status(500).json({ error: 'Failed to fetch cases' }); }
});

// GET /cases/:id
router.get('/:id', async (req, res) => {
    try {
        const item = await Case.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (e) { res.status(400).json({ error: 'Invalid id' }); }
});

// POST /cases
router.post('/', async (req, res) => {
    try {
        const created = await Case.create(req.body);
        res.json(created);
    } catch (e) { res.status(400).json({ error: 'Failed to create case' }); }
});

// PUT /cases/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (e) { res.status(400).json({ error: 'Failed to update case' }); }
});

export default router;
