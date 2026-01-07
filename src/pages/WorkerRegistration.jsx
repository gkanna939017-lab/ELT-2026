import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import Button from '../components/Button.jsx'

export default function WorkerRegistration() {
  const [form, setForm] = useState({ name: '', skill: '', experience: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Join ELT</p>
            <h1 className="text-2xl font-bold text-slate-900">Worker Registration</h1>
            <p className="text-sm text-slate-600">Share your skills and start receiving opportunities.</p>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="skill">
              Primary Skill
            </label>
            <input
              id="skill"
              name="skill"
              value={form.skill}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="e.g., Electrician, Web Developer"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="experience">
              Years of Experience
            </label>
            <input
              id="experience"
              name="experience"
              type="number"
              min="0"
              value={form.experience}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="e.g., 3"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Registration
          </Button>

          {submitted && (
            <div className="flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-3 text-sm text-primary-700">
              <CheckCircle size={18} />
              Registration received! We will review your profile shortly.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
