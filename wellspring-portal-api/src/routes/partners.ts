// src/routes/partners.ts
import { Router } from 'express';
import Partner from '../models/Partner';
import Collaboration from '../models/Collaboration';
import Case from '../models/Case';

const router = Router();

// GET /partners
router.get('/', async (_req, res) => {
    try {
        const items = await Partner.find().sort({ createdAt: -1 });
        res.json(items);
    } catch { res.status(500).json({ error: 'Failed to fetch partners' }); }
});

// GET /partners/:id
router.get('/:id', async (req, res) => {
    try {
        const item = await Partner.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch { res.status(400).json({ error: 'Invalid id' }); }
});

// POST /partners
router.post('/', async (req, res) => {
    try {
        const created = await Partner.create(req.body);
        res.json(created);
    } catch { res.status(400).json({ error: 'Failed to create partner' }); }
});

// PUT /partners/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch { res.status(400).json({ error: 'Failed to update partner' }); }
});

// DELETE /partners/:id
router.delete('/:id', async (req, res) => {
    try {
        await Partner.findByIdAndDelete(req.params.id);
        res.json({ message: 'Partner deleted' });
    } catch { res.status(400).json({ error: 'Failed to delete partner' }); }
});

// GET /partners/:id/collaborations
router.get('/:id/collaborations', async (req, res) => {
    try {
        const items = await Collaboration.find({ partnerId: req.params.id }).sort({ createdAt: -1 });
        res.json(items);
    } catch { res.status(500).json({ error: 'Failed to fetch collaborations' }); }
});

// POST /partners/:id/collaborations
router.post('/:id/collaborations', async (req, res) => {
    try {
        const created = await Collaboration.create({ ...req.body, partnerId: req.params.id });
        res.json(created);
    } catch { res.status(400).json({ error: 'Failed to create collaboration' }); }
});

// GET /partners/:id/available-cases
router.get('/:id/available-cases', async (req, res) => {
    try {
        const partnerId = req.params.id;
        // Filter cases that are “active” and not already fully partnered
        const cases = await Case.find({ status: 'active' }).sort({ createdAt: -1 });
        // You may want to filter out cases the partner is already collaborating on
        res.json(cases);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch available cases' });
    }
});

// POST /partners/:id/join-case
router.post('/:id/join-case', async (req, res) => {
    try {
        const partnerId = req.params.id;
        const { caseId, description } = req.body;
        if (!caseId) {
            return res.status(400).json({ error: 'caseId is required' });
        }
        // Create a collaboration proposal
        const collab = await Collaboration.create({
            partnerId,
            caseId,
            description: description || 'Partner requesting join',
            status: 'proposed'
        });
        res.json(collab);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: 'Failed to join case' });
    }
});

export default router;
