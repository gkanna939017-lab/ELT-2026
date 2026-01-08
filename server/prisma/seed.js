import { PrismaClient } from '@prisma/client'
import { workers } from '../../src/data/mockData.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding workers...')
  for (const w of workers) {
    await prisma.worker.upsert({
      where: { id: w.id },
      update: {
        name: w.name,
        skill: w.skill,
        experience: w.experience || null,
        location: w.location,
        rating: w.rating || null,
        categories: JSON.stringify(w.categories),
        summary: w.summary || null,
        avatar: w.avatar || null,
        phone: w.phone || null,
        lat: w.lat || null,
        lng: w.lng || null,
      },
      create: {
        id: w.id,
        name: w.name,
        skill: w.skill,
        experience: w.experience || null,
        location: w.location,
        rating: w.rating || null,
        categories: JSON.stringify(w.categories),
        summary: w.summary || null,
        avatar: w.avatar || null,
        phone: w.phone || null,
        lat: w.lat || null,
        lng: w.lng || null,
      },
    })
  }
  console.log('Done')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
