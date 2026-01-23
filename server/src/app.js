import express from 'express';
import cors from 'cors';
const app = express();
// export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Load Routes (we will import these after creating the files)
import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);
import profileRoutes from './routes/profile.routes.js';
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;
