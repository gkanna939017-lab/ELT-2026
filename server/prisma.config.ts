import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  database: {
    adapter: 'postgresql',
    url: process.env.DATABASE_URL,
  },
})