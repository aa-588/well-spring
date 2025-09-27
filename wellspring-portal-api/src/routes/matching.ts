import { Router } from 'express';
import Case from '../models/Case';
import Donation from '../models/Donation';

// If you store donors in DB, import Donor model here.
// For now we’ll mock candidates for the API surface.

const router = Router();

// GET /matching/candidates?caseId=...
router.get('/candidates', async (req, res) => {
    try {
        const donorId = String(req.query.donorId || '');
        if (!donorId) return res.status(400).json({ error: 'donorId required' });

        // TODO: implement real matching logic
        const cases = await Case.find({ status: 'active' }).limit(5);

        const candidates = cases.map(c => ({
            caseId: c.id,
            familyName: c.familyName,
            hospital: c.hospital,
            needAmount: 50000, // mock, should come from case data
            suitabilityScore: Math.floor(Math.random() * 100)
        }));

        res.json(candidates);
    } catch {
        res.status(500).json({ error: 'Failed to fetch candidates' });
    }
});


// POST /matching/assign
router.post('/assign', async (req, res) => {
    try {
        const { caseId, donorId, reason } = req.body || {};
        if (!caseId || !donorId) return res.status(400).json({ error: 'caseId and donorId required' });

        // Minimal: stamp reason into case.nextStep as audit trail
        const updated = await Case.findByIdAndUpdate(
            caseId,
            { nextStep: `Donor ${donorId} assigned. ${reason || ''}`.trim() },
            { new: true }
        );

        // TODO: create a dedicated "assignments" collection/audit log if needed
        res.json({ ok: true, case: updated });
    } catch { res.status(400).json({ error: 'Failed to assign donor' }); }
});

router.post('/pledge', async (req, res) => {
    try {
        const { donorId, caseId, amount } = req.body;
        if (!donorId || !caseId || !amount) return res.status(400).json({ error: 'Missing fields' });

        const donation = await Donation.create({ donorId, caseId, amount });
        res.json(donation);
    } catch {
        res.status(400).json({ error: 'Failed to pledge support' });
    }
});

export default router;
