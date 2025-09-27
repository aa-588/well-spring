import { Router } from 'express';
import User from '../models/User';

const router = Router();

// GET all users (with optional search)
router.get('/', async (req, res) => {
    try {
        const q = req.query.q as string | undefined;
        const filter = q
            ? { $or: [{ name: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }] }
            : {};
        const users = await User.find(filter);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// POST create user
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});

// PATCH toggle user status
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update user status' });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete user' });
    }
});

export default router;
