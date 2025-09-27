import { Router } from 'express';
import Task from '../models/Task';

const router = Router();

// GET all tasks
router.get('/', async (_, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST create new task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create task' });
    }
});

// PATCH update status
router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update task' });
    }
});

// DELETE task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete task' });
    }
});

export default router;
