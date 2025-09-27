import { Router } from 'express';
import Config from '../models/Config';

const router = Router();

// GET config (only one document)
router.get('/', async (_, res) => {
    try {
        let config = await Config.findOne();
        if (!config) {
            config = new Config(); // default
            await config.save();
        }
        res.json(config);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch config' });
    }
});

// PUT update config
router.put('/', async (req, res) => {
    try {
        let config = await Config.findOne();
        if (!config) {
            config = new Config(req.body);
        } else {
            Object.assign(config, req.body);
        }
        await config.save();
        res.json(config);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update config' });
    }
});

export default router;
