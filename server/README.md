# ELT07 Backend Server

This is the backend server for the ELT07 application, built with Express.js, Prisma, and PostgreSQL.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL database:**
   - **Option 1: Local PostgreSQL**
     - Install PostgreSQL locally
     - Create a database named `elt07_db`
   
   - **Option 2: Cloud PostgreSQL (Recommended for quick setup)**
     - Sign up for a free account at [Neon](https://neon.tech) or [Supabase](https://supabase.com)
     - Create a new project/database
     - Copy the connection string

   - Update the `DATABASE_URL` in `.env` with your connection string

3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

4. **Push database schema:**
   ```bash
   npx prisma db push
   ```

5. **Start the server:**
   ```bash
   npm run dev  # Development mode with nodemon
   # or
   npm start    # Production mode
   ```

## Environment Variables

Create a `.env` file in the server directory:

```
DATABASE_URL="postgresql://username:password@localhost:5432/elt07_db?schema=public"
PORT=5000
JWT_SECRET="your_super_secret_key_change_this_in_production"
```

For Neon/Supabase, the DATABASE_URL will look like:
```
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/profile/me` - Get current user profile
- `GET /api/profile/search` - Search worker profiles
- `POST /api/profile/update` - Update/create worker profile

## Database Schema

- **User**: id, email, password, name, role, createdAt
- **WorkerProfile**: id, userId, category, location, experience, bio, isVerified, createdAt