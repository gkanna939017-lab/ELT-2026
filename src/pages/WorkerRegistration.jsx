import { useState, useEffect } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import Button from '../components/Button.jsx'
import { updateProfile, getMyProfile } from '../services/api.js'
import { useNavigate } from 'react-router-dom'

export default function WorkerRegistration() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ category: '', location: '', experience: '', bio: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    // Try to load existing profile
    const fetchProfile = async () => {
      try {
        const { data } = await getMyProfile()
        if (data.workerProfile) {
          setForm({
            category: data.workerProfile.category,
            location: data.workerProfile.location,
            experience: data.workerProfile.experience,
            bio: data.workerProfile.bio
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await updateProfile(form)
      setSubmitted(true)
      setMessage('Profile updated successfully!')
      setTimeout(() => navigate('/browse'), 2000)
    } catch (err) {
      setMessage('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
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
            <h1 className="text-2xl font-bold text-slate-900">Worker Profile</h1>
            <p className="text-sm text-slate-600">Share your skills and start receiving opportunities.</p>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {message && <div className={`p-3 rounded-lg text-sm ${submitted ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{message}</div>}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="category">
              Primary Skill / Category
            </label>
            <input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="e.g., Electrician, Web Developer"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="location">
              Location / City
            </label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="e.g., Narasaraopet"
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
              type="text"
              value={form.experience}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="e.g., 3 years"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="bio">
              Short Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="Describe your services..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Save Profile'}
          </Button>
        </form>
      </div>
    </div>
  )
}
