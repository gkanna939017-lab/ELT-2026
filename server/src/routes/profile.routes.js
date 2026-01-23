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
        const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const workerProfile = db.prepare('SELECT * FROM worker_profiles WHERE user_id = ?').get(req.userId);

        res.json({ ...user, workerProfile });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Search Profiles (Public)
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        if (!query) return res.json([]);

        const sql = `
            SELECT wp.*, u.name, u.email 
            FROM worker_profiles wp
            JOIN users u ON wp.user_id = u.id
            WHERE wp.category LIKE ? OR wp.location LIKE ? OR wp.experience LIKE ?
        `;
        const searchTerm = `%${query}%`;
        const profiles = db.prepare(sql).all(searchTerm, searchTerm, searchTerm);

        res.json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update/Create Worker Profile
router.post('/update', verifyToken, async (req, res) => {
    const { category, location, experience, bio } = req.body;
    try {
        const existing = db.prepare('SELECT id FROM worker_profiles WHERE user_id = ?').get(req.userId);

        if (existing) {
            db.prepare(`
                UPDATE worker_profiles 
                SET category = ?, location = ?, experience = ?, bio = ?
                WHERE user_id = ?
            `).run(category, location, experience, bio, req.userId);
        } else {
            db.prepare(`
                INSERT INTO worker_profiles (user_id, category, location, experience, bio)
                VALUES (?, ?, ?, ?, ?)
            `).run(req.userId, category, location, experience, bio);
        }

        const profile = db.prepare('SELECT * FROM worker_profiles WHERE user_id = ?').get(req.userId);
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
