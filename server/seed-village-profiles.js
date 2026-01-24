
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'data.json');
const LOCATIONS = ['Narasaraopet', 'Guntur', 'Chilakaluripet', 'Sattenapalle', 'Macherla', 'Piduguralla', 'Vinukonda', 'Tenali', 'Bapatla', 'Amaravati'];
const SKILLS = [
    'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mechanic', 'Tailor',
    'Pottery', 'Farming', 'AC Repair', 'Weaver', 'Basket Maker',
    'Blacksmith', 'Cattle Management', 'Mason', 'Welder'
];

const NAMES = {
    first: ['Raju', 'Siva', 'Mohan', 'Krishna', 'Venu', 'Gopi', 'Srinu', 'Lakshmi', 'Sita', 'Padma', 'Ravi', 'Anil', 'Sunil', 'Kavita', 'Rani', 'Babu', 'Chanti', 'Nani'],
    last: ['Reddy', 'Rao', 'Yadav', 'Naidu', 'Chowdary', 'Goud', 'Setty', 'Mala', 'Madiga', 'Shaik', 'Khan', 'Singh', 'Patil']
};

const BIOS = {
    'Electrician': 'Expert in house wiring, tube lights, fan repair, and motor winding.',
    'Plumber': 'Leakage fixing, tap replacement, pipe fitting, and water tank cleaning.',
    'Carpenter': 'Wood work, door repair, window frames, and furniture making.',
    'Painter': 'Wall painting, whitewash, and texture design for homes.',
    'Mechanic': 'Two-wheeler and auto repair specialist. Engine work and oil change.',
    'Tailor': 'Ladies dress stitching, blouse design, and alterations.',
    'Pottery': 'Traditional clay pots for cooking and decoration. Hand-made.',
    'Farming': 'Organic vegetable cultivation and paddy field management assistance.',
    'AC Repair': 'AC installation, gas filling, and servicing expert.',
    'Weaver': 'Handloom saree weaving and cotton fabric production.',
    'Basket Maker': 'Bamboo basket weaving for storage and decoration.',
    'Blacksmith': 'Iron tools manufacturing, sharpening, and metal repair.',
    'Cattle Management': 'Buffalo milking, feeding, and shed cleaning services.',
    'Mason': 'Brick work, plastering, and construction labour.',
    'Welder': 'Gate welding, grill work, and metal fabrication.'
};

const AVATARS = [
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww', // Indian Man Beard
    'https://images.unsplash.com/photo-1583341612074-cce5ec64f1c7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D', // Young Indian Man
    'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D', // Smiling Man
    'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D', // Elder Man
    'https://images.unsplash.com/photo-1489779162738-f81aed9b0b33?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D', // Scarf Man
    'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww', // Smiling Young
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwd29tYW58ZW58MHx8MHx8fDA%3D', // Indian Woman
    'https://images.unsplash.com/photo-1616241982928-119a07121087?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMHdvbWFufGVufDB8fDB8fHww', // Woman Saree
    'https://images.unsplash.com/photo-1596392927818-23b420045642?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMHdvbWFufGVufDB8fDB8fHww', // Woman Portrait
    'https://images.unsplash.com/photo-1627063077717-3bf75d86bda1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwZmFybWVyfGVufDB8fDB8fHww', // Farmer
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D', // Portrait
    'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMHdvbWFufGVufDB8fDB8fHww' // Woman Smiling
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateProfile(id) {
    const firstName = getRandom(NAMES.first);
    const lastName = getRandom(NAMES.last);
    const fullName = `${firstName} ${lastName}`;
    const skill = getRandom(SKILLS);
    const location = getRandom(LOCATIONS);

    return {
        user: {
            id: id,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`,
            password: "hashed_secret", // Dummy hash
            name: fullName,
            role: "worker",
            location: location,
            phoneNumber: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
            createdAt: new Date().toISOString()
        },
        profile: {
            id: id,
            userId: id,
            category: skill,
            location: location,
            experience: `${Math.floor(Math.random() * 20) + 1} years`,
            bio: BIOS[skill] || 'Hardworking professional available for local work.',
            avatar: getRandom(AVATARS),
            rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)), // Rating 3.5 to 5.0
            isVerified: Math.random() > 0.3, // 70% verified
            createdAt: new Date().toISOString()
        }
    };
}

// Always reset data for fresh seed
let data = { User: [], WorkerProfile: [], Booking: [] };

// Determine starting ID
const startId = 1;
const COUNT = 1000;

console.log(`Generating ${COUNT} profiles starting from ID ${startId}...`);

for (let i = 0; i < COUNT; i++) {
    const newId = startId + i;
    const { user, profile } = generateProfile(newId);
    data.User.push(user);
    data.WorkerProfile.push(profile);
}

// Write back to file
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
console.log('Done! Data file updated.');
