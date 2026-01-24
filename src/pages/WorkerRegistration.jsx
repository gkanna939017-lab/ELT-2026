import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import Button from '../components/Button.jsx'
import { registerUser, updateProfile } from '../services/api.js'
import { useNavigate } from 'react-router-dom'

export default function WorkerRegistration() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', password: '', phoneNumber: '', // User fields
    category: '', location: '', experience: '', bio: '' // Profile fields
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      // 1. Register User
      const { data } = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
        location: form.location,
        role: 'worker'
      })

      // Store token (auto-login)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      window.dispatchEvent(new Event('storage'))

      // 2. Create/Update Profile with extra details
      await updateProfile({
        category: form.category,
        location: form.location,
        experience: form.experience,
        bio: form.bio
      })

      setMessage('Registration successful! Redirecting...')
      setTimeout(() => navigate('/browse'), 1500)
    } catch (err) {
      console.error(err)
      setMessage(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Join as a Professional</h1>
            <p className="text-slate-600">Create your account and profile in one step.</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {message && <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{message}</div>}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Account Details</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500" placeholder="9876543210" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Professional Profile</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Primary Profession</label>
                <input name="category" value={form.category} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500" placeholder="e.g. Electrician, Plumber" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Location</label>
                <input name="location" value={form.location} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500" placeholder="e.g. Guntur" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Years of Experience</label>
                <input name="experience" value={form.experience} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500" placeholder="e.g. 5 years" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500" placeholder="Briefly describe your services..." />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-primary-900/20" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Register & Create Profile'}
          </Button>
        </form>
      </div>
    </div>
  )
}
