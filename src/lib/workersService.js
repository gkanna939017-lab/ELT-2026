import { workers as mockWorkers } from '../data/mockData.js'

const API_BASE = import.meta.env.VITE_API_URL || ''

export async function fetchWorkers(query = '') {
  if (!API_BASE) {
    return mockWorkers
  }
  const url = `${API_BASE.replace(/\/$/, '')}/api/workers${query ? `?q=${encodeURIComponent(query)}` : ''}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch workers')
  return res.json()
}

export async function getWorker(id) {
  if (!API_BASE) {
    return mockWorkers.find((w) => w.id === Number(id))
  }
  const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/workers/${id}`)
  if (!res.ok) throw new Error('Failed to fetch worker')
  return res.json()
}
