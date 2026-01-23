import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import bookingRoutes from './routes/booking.routes.js'; // Import
import db from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/booking', bookingRoutes); // Register

// Health Check
app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;
