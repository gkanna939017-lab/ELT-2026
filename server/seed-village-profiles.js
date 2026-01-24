
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
    'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=200&q=80', // Man smiling
    'https://images.unsplash.com/photo-1583341612074-cce5ec64f1c7?auto=format&fit=crop&w=200&q=80', // Indian man
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80', // Beard man
    'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=200&q=80', // Face map
    'https://images.unsplash.com/photo-1489779162738-f81aed9b0b33?auto=format&fit=crop&w=200&q=80', // Scarf man
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80', // Glasses man
    'https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&w=200&q=80', // Woman saree
    'https://images.unsplash.com/photo-1627063077717-3bf75d86bda1?auto=format&fit=crop&w=200&q=80', // Farmer man
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80', // Woman
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', // Stylized
    'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&w=200&q=80', // Man
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', // Portrait
    'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?auto=format&fit=crop&w=200&q=80', // Developer style
    'https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?auto=format&fit=crop&w=200&q=80', // Worker
    'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=200&q=80', // Tool holding
    'https://images.unsplash.com/photo-1642250260424-6bd684a0d912?auto=format&fit=crop&w=200&q=80', // Rural man
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
            isVerified: Math.random() > 0.3, // 70% verified
            createdAt: new Date().toISOString()
        }
    };
}

// Read existing data
let data = { User: [], WorkerProfile: [], Booking: [] };
if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// Determine starting ID
const startId = (data.User.length > 0 ? Math.max(...data.User.map(u => u.id)) : 0) + 1;
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
