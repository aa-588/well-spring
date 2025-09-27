import { Router } from 'express';
import Audit from '../models/Audit';

const router = Router();

// GET all logs
router.get('/', async (req, res) => {
    try {
        const logs = await Audit.find().sort({ ts: -1 }).limit(100);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch audit logs' });
    }
});

// POST new audit log (e.g., called when an action occurs)
router.post('/', async (req, res) => {
    try {
        const log = new Audit(req.body);
        await log.save();
        res.json(log);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create audit log' });
    }
});

export default router;
