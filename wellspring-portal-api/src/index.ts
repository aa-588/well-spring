import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import usersRouter from './routes/users';
import rolesRouter from './routes/roles';
import auditRouter from './routes/audit';
import configRouter from './routes/config';
import tasksRouter from './routes/tasks';
import reportsRouter from './routes/reports';

import casesRoutes from './routes/cases';
import verificationsRoutes from './routes/verifications';
import matchingRoutes from './routes/matching';
import volunteerRoutes from './routes/volunteers';

import donorsRoutes from './routes/donors';
import donationsRoutes from './routes/donations';
import seekersRoutes from './routes/seekers';

import partnerRoutes from './routes/partners';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/admin/users', usersRouter);
app.use('/api/admin/roles', rolesRouter);
app.use('/api/admin/audit', auditRouter);
app.use('/api/admin/config', configRouter);

app.use('/api/tasks', tasksRouter);
app.use('/api/reports', reportsRouter);

app.use('/api/cases', casesRoutes);
app.use('/api/verifications', verificationsRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/volunteers', volunteerRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/donors', donorsRoutes);
app.use('/api/donations', donationsRoutes);

app.use('/api/seekers', seekersRoutes);

app.use('/api/partners', partnerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
