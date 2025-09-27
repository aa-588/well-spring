import { Router } from 'express';
import Donor from '../models/Donor';

const router = Router();

// GET /donors
router.get('/', async (_req, res) => {
    try {
        const donors = await Donor.find().sort({ createdAt: -1 });
        res.json(donors);
    } catch {
        res.status(500).json({ error: 'Failed to fetch donors' });
    }
});

// GET /donors/:id
router.get('/:id', async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) return res.status(404).json({ error: 'Not found' });
        res.json(donor);
    } catch {
        res.status(400).json({ error: 'Invalid id' });
    }
});

// POST /donors
router.post('/', async (req, res) => {
    try {
        const created = await Donor.create(req.body);
        res.json(created);
    } catch {
        res.status(400).json({ error: 'Failed to create donor' });
    }
});

// PUT /donors/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch {
        res.status(400).json({ error: 'Failed to update donor' });
    }
});

// DELETE /donors/:id
router.delete('/:id', async (req, res) => {
    try {
        await Donor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Donor deleted' });
    } catch {
        res.status(400).json({ error: 'Failed to delete donor' });
    }
});

export default router;
