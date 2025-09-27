import { Router } from 'express';
import Verification from '../models/Verification';

const router = Router();

// GET /verifications?status=pending
router.get('/', async (req, res) => {
    try {
        const q: any = {};
        if (req.query.status) q.status = String(req.query.status);
        if (req.query.caseId) q.caseId = String(req.query.caseId);
        const items = await Verification.find(q).sort({ createdAt: -1 });
        res.json(items);
    } catch { res.status(500).json({ error: 'Failed to fetch verifications' }); }
});

// POST /verifications (create a verification record)
router.post('/', async (req, res) => {
    try {
        const created = await Verification.create(req.body);
        res.json(created);
    } catch { res.status(400).json({ error: 'Failed to create verification' }); }
});

// POST /verifications/:id/approve
router.post('/:id/approve', async (req, res) => {
    try {
        const updated = await Verification.findByIdAndUpdate(
            req.params.id,
            { status: 'approved', notes: req.body?.notes },
            { new: true }
        );
        res.json(updated);
    } catch { res.status(400).json({ error: 'Failed to approve' }); }
});

// POST /verifications/:id/reject
router.post('/:id/reject', async (req, res) => {
    try {
        const updated = await Verification.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected', notes: req.body?.notes },
            { new: true }
        );
        res.json(updated);
    } catch { res.status(400).json({ error: 'Failed to reject' }); }
});

export default router;
