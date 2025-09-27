import { Router } from 'express';
import Role from '../models/Role';

const router = Router();

// GET all roles
router.get('/', async (_, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
});

// POST create role
router.post('/', async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.json(role);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create role' });
    }
});

// PUT update role
router.put('/:id', async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(role);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update role' });
    }
});

// DELETE role
router.delete('/:id', async (req, res) => {
    try {
        await Role.findByIdAndDelete(req.params.id);
        res.json({ message: 'Role deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete role' });
    }
});

export default router;
