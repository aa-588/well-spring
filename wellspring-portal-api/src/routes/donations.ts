import { Router } from 'express';
import Donation from '../models/Donation';

const router = Router();

// GET /donations?donorId=...
router.get('/', async (req, res) => {
    try {
        const q: any = {};
        if (req.query.donorId) q.donorId = String(req.query.donorId);
        const donations = await Donation.find(q).sort({ date: -1 });
        res.json(donations);
    } catch {
        res.status(500).json({ error: 'Failed to fetch donations' });
    }
});

// POST /donations
router.post('/', async (req, res) => {
    try {
        const created = await Donation.create(req.body);
        res.json(created);
    } catch {
        res.status(400).json({ error: 'Failed to create donation' });
    }
});

export default router;
