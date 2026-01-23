import express from 'express';
import db from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization'];
    if (!bearer) return res.status(403).json({ message: 'No token provided' });

    const token = bearer.split(" ")[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Get My Profile
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await db.user.findUnique({
            where: { id: req.userId },
            select: { id: true, name: true, email: true, role: true, workerProfile: true }
        });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Search Profiles (Public)
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        if (!query || query.trim() === '') {
            // Return all workers if query is empty
            const profiles = await db.workerProfile.findMany({
                include: {
                    user: {
                        select: { name: true, email: true }
                    }
                }
            });
            return res.json(profiles);
        }

        const profiles = await db.workerProfile.findMany({
            where: {
                OR: [
                    { category: { contains: query, mode: 'insensitive' } },
                    { location: { contains: query, mode: 'insensitive' } },
                    { experience: { contains: query, mode: 'insensitive' } }
                ]
            },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });

        res.json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update/Create Worker Profile
router.post('/update', verifyToken, async (req, res) => {
    const { category, location, experience, bio, avatar } = req.body;
    try {
        const profile = await db.workerProfile.upsert({
            where: { userId: req.userId },
            update: {
                category,
                location,
                experience,
                bio,
                avatar // Found error in original: avatar was missing
            },
            create: {
                userId: req.userId,
                category,
                location,
                experience,
                bio,
                avatar
            }
        }
        });

res.json(profile);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
}
});

export default router;
