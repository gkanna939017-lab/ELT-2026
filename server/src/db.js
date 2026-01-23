import fs from 'fs';
import path from 'path';
// import { PrismaClient } from '@prisma/client';

// ----------------------------------------------------------------------
// MODE 1: CLOUD DATABASE (PostgreSQL using Prisma)
// ----------------------------------------------------------------------
// Usage: Active when DATABASE_URL is present in environment variables.
// ----------------------------------------------------------------------
let db;

if (process.env.DATABASE_URL) {
    console.log("🔌 Connected to Cloud Database (PostgreSQL)");
    // db = new PrismaClient();
}

// ----------------------------------------------------------------------
// MODE 2: LOCAL FILESYSTEM (data.json)
// ----------------------------------------------------------------------
// Usage: Active when running locally without a cloud DB.
// ----------------------------------------------------------------------
else {
    console.log("📂 Using Local File Database (data.json)");

    const DATA_FILE = path.join(process.cwd(), 'data.json');
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ User: [], WorkerProfile: [], Booking: [] }, null, 2));
    }

    class JsonClient {
        constructor() {
            this.data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        }

        _save() {
            fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2));
        }

        get user() {
            return {
                findUnique: async ({ where, select }) => {
                    const user = this.data.User.find(u => u.id === where.id || u.email === where.email);
                    if (!user) return null;
                    if (select) {
                        const selected = {};
                        for (const key in select) {
                            if (key === 'workerProfile' && select[key]) {
                                selected[key] = this.data.WorkerProfile.find(p => p.userId === user.id) || null;
                            } else if (select[key]) {
                                selected[key] = user[key];
                            }
                        }
                        return selected;
                    }
                    return user;
                },
                create: async ({ data }) => {
                    const newUser = {
                        id: this.data.User.length + 1,
                        ...data,
                        createdAt: new Date().toISOString()
                    };
                    this.data.User.push(newUser);
                    this._save();
                    return newUser;
                },
                findFirst: async ({ where }) => {
                    return this.data.User.find(u => u.email === where.email);
                }
            };
        }

        get workerProfile() {
            return {
                findMany: async ({ where, include }) => {
                    let profiles = this.data.WorkerProfile;
                    if (where && where.OR) {
                        profiles = profiles.filter(p =>
                            where.OR.some(condition => {
                                const key = Object.keys(condition)[0];
                                const val = p[key];
                                if (!val) return false;
                                return val.toLowerCase().includes(condition[key].contains.toLowerCase());
                            })
                        );
                    }
                    if (include && include.user) {
                        profiles = profiles.map(p => ({
                            ...p,
                            user: this.data.User.find(u => u.id === p.userId) || null
                        }));
                    }
                    return profiles;
                },
                upsert: async ({ where, update, create }) => {
                    const idx = this.data.WorkerProfile.findIndex(p => p.userId === where.userId);
                    if (idx > -1) {
                        const updated = { ...this.data.WorkerProfile[idx], ...update };
                        this.data.WorkerProfile[idx] = updated;
                        this._save();
                        return updated;
                    } else {
                        const newProfile = {
                            id: this.data.WorkerProfile.length + 1,
                            ...create,
                            createdAt: new Date().toISOString()
                        };
                        this.data.WorkerProfile.push(newProfile);
                        this._save();
                        return newProfile;
                    }
                },
                findUnique: async ({ where }) => {
                    return this.data.WorkerProfile.find(p => p.userId === where.userId);
                }
            };
        }

        get booking() {
            return {
                create: async ({ data }) => {
                    if (!this.data.Booking) this.data.Booking = [];
                    const newBooking = {
                        id: this.data.Booking.length + 1,
                        ...data,
                        status: 'PENDING',
                        createdAt: new Date().toISOString()
                    };
                    this.data.Booking.push(newBooking);
                    this._save();
                    return newBooking;
                },
                findMany: async ({ where, include }) => {
                    if (!this.data.Booking) return [];
                    let bookings = this.data.Booking;
                    if (where) {
                        if (where.userId) bookings = bookings.filter(b => b.userId === where.userId);
                    }
                    return bookings.map(b => {
                        let result = { ...b };
                        if (include && include.worker) {
                            const worker = this.data.WorkerProfile.find(w => w.id === b.workerId);
                            result.worker = worker ? { ...worker, user: this.data.User.find(u => u.id === worker.userId) } : null;
                        }
                        return result;
                    });
                }
            };
        }
    }
    db = new JsonClient();
}

export default db;