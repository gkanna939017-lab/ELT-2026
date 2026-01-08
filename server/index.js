import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// GET /api/workers
app.get('/api/workers', async (req, res) => {
  const q = (req.query.q || '').toLowerCase()
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { skill: { contains: q, mode: 'insensitive' } },
          { location: { contains: q, mode: 'insensitive' } },
        ],
      }
    : {}
  const workers = await prisma.worker.findMany({ where, orderBy: { id: 'asc' } })
  res.json(workers)
})

// GET /api/workers/:id
app.get('/api/workers/:id', async (req, res) => {
  const id = Number(req.params.id)
  const worker = await prisma.worker.findUnique({ where: { id } })
  if (!worker) return res.status(404).json({ error: 'Not found' })
  res.json(worker)
})

// POST /api/workers
app.post('/api/workers', async (req, res) => {
  const data = req.body
  try {
    const worker = await prisma.worker.create({ data })
    res.status(201).json(worker)
  } catch (err) {
    res.status(400).json({ error: String(err) })
  }
})

// PUT /api/workers/:id
app.put('/api/workers/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const worker = await prisma.worker.update({ where: { id }, data: req.body })
    res.json(worker)
  } catch (err) {
    res.status(400).json({ error: String(err) })
  }
})

// DELETE /api/workers/:id
app.delete('/api/workers/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.worker.delete({ where: { id } })
    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: String(err) })
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
