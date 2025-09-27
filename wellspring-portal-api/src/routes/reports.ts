import { Router } from 'express';
import Report from '../models/Report';

const router = Router();

// GET all reports
router.get('/', async (_, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

// POST submit report
router.post('/', async (req, res) => {
    try {
        const report = new Report(req.body);
        await report.save();
        res.json(report);
    } catch (err) {
        res.status(400).json({ error: 'Failed to submit report' });
    }
});

export default router;
