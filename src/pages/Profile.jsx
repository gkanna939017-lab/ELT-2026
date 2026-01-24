import { useState, useEffect } from 'react'
import { User, Mail, MapPin, Briefcase, Camera, Save, Loader2 } from 'lucide-react'
import Button from '../components/Button.jsx'
import { getMyProfile, updateProfile } from '../services/api.js'

export default function Profile() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        bio: '',
        experience: '',
        location: '',
        category: '',
        avatar: ''
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const { data } = await getMyProfile()
            setProfile(data)
            if (data.workerProfile) {
                setFormData({
                    bio: data.workerProfile.bio || '',
                    experience: data.workerProfile.experience || '',
                    location: data.workerProfile.location || '',
                    category: data.workerProfile.category || '',
                    avatar: data.workerProfile.avatar || ''
                })
            }
        } catch (error) {
            //   alert('Failed to load profile')
            // If 404/others, handled by not showing data
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            await updateProfile(formData)
            alert('Profile updated successfully!')
            fetchProfile() // Refresh
        } catch (error) {
            alert('Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="animate-spin text-primary-500" size={40} /></div>

    if (!profile) return <div className="p-10 text-center">Please log in to view your profile.</div>

    return (
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
            <h1 className="mb-8 text-3xl font-bold text-slate-900">My Profile</h1>

            <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">

                {/* Left Column: User Info Card */}
                <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 shadow-soft text-center h-fit">
                    <div className="relative mb-4">
                        {formData.avatar ? (
                            <img src={formData.avatar} alt="Profile" className="h-32 w-32 rounded-full object-cover ring-4 ring-primary-50" />
                        ) : (
                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <User size={48} />
                            </div>
                        )}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                    <p className="text-sm text-slate-500">{profile.email}</p>
                    <div className="mt-4 inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-700">
                        {profile.role} Account
                    </div>
                </div>

                {/* Right Column: Edit Form */}
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
                    <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                        <Briefcase className="text-primary-600" size={20} />
                        <h3 className="text-lg font-bold text-slate-900">Worker Details</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-slate-700">Role / Category</label>
                            <input
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g. Electrician, Plumber"
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">Location</label>
                                <input
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="City or Area"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">Experience</label>
                                <input
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    placeholder="e.g. 5 years"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-slate-700">Profile Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    value={formData.avatar}
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                    placeholder="https://example.com/my-photo.jpg"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                />
                                {/* Future: Add Upload Button here */}
                            </div>
                            <p className="mt-1 text-xs text-slate-500">Paste a direct image link from Imgur or Unsplash.</p>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-slate-700">Bio / Summary</label>
                            <textarea
                                rows={4}
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Describe your skills and services..."
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            />
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
