import express from 'express';
import db from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization'];
    if (!bearer) return res.status(403).json({ message: 'No token provided' });
    const token = bearer.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Create Booking
router.post('/create', verifyToken, async (req, res) => {
    try {
        const { workerId, description, date } = req.body;

        if (!workerId || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const booking = await db.booking.create({
            data: {
                userId: req.userId,
                workerId: parseInt(workerId),
                description,
                date
            }
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
});

// Get My Bookings
router.get('/my-bookings', verifyToken, async (req, res) => {
    try {
        const bookings = await db.booking.findMany({
            where: { userId: req.userId },
            include: { worker: true }
        });
        res.json(bookings);
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
});

export default router;
