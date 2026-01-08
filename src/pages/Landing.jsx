import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Users, ShieldCheck, Clock3, TrendingUp, MapPinned, Search } from 'lucide-react'
import Button from '../components/Button.jsx'
import MapPreview from '../components/MapPreview.jsx'
import { useEffect, useState } from 'react'
import { fetchWorkers } from '../lib/workersService.js'

const features = [
  {
    icon: Users,
    title: 'Verified Local Talent',
    description: 'Work with trusted, skilled professionals vetted by community feedback.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality & Safety',
    description: 'Clear profiles, ratings, and secure communication to keep projects on track.',
  },
  {
    icon: Clock3,
    title: 'Fast Matching',
    description: 'Filter by category and location to connect with the right worker quickly.',
  },
  {
    icon: TrendingUp,
    title: 'Upskilling Support',
    description: 'Access curated training to help local talent grow and certify their skills.',
  },
]

const heroShowcase = [
  {
    title: 'Electricians',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Plumbers',
    image:
      'https://images.unsplash.com/photo-1582719478161-12c1d1a21c75?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Carpenters',
    image:
      'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [workersData, setWorkersData] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchWorkers().then((data) => mounted && setWorkersData(data)).catch(() => mounted && setWorkersData([]))
    return () => (mounted = false)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const term = searchTerm.trim()
    navigate(term ? `/browse?search=${encodeURIComponent(term)}` : '/browse')
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#f7f9ff] to-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 md:px-6 md:py-20">
        <section className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700 shadow-soft">
              Empower Local Talent
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Connect with skilled workers and grow opportunities in your community.
            </h1>
            <p className="text-lg text-slate-600">
              ELT helps you find verified local professionals for every job — while giving workers a path to
              new training, certifications, and income.
            </p>
            <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-primary-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100 shadow-soft animate-[pulseGlow_2.4s_ease-in-out_infinite]"
                  placeholder="Search by skill, name, or location"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              <Button type="submit" className="sm:w-auto w-full shadow-glow">
                Find Workers
              </Button>
            </form>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary-700">2k+</span>
                <span>Workers onboarded</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary-700">4.8★</span>
                <span>Average rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -translate-x-6 -translate-y-4 rotate-2 rounded-3xl bg-gradient-to-br from-primary-50/60 to-white shadow-soft" />
            <div className="relative space-y-4 rounded-3xl border border-slate-100 bg-white/95 p-5 shadow-soft backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                <MapPinned size={18} /> Nearby workers (sample view)
              </div>
              <MapPreview workers={(workersData || []).slice(0, 5)} />
              <div className="grid gap-3 sm:grid-cols-2">
                {heroShowcase.map((card) => (
                  <div
                    key={card.title}
                    className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80 shadow-soft"
                  >
                    <img src={card.image} alt={card.title} className="h-28 w-full object-cover" loading="lazy" />
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-800">{card.title}</p>
                      <p className="text-xs text-slate-600">Trusted local professionals</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-primary-600 px-4 py-3 text-white shadow-soft">
                <p className="text-sm font-semibold">Training Highlight</p>
                <p className="text-xs text-primary-100">
                  Solar Installation Basics — enroll today and get certified in 6 weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Why ELT</p>
              <h2 className="text-2xl font-bold text-slate-900">A trusted platform for local work</h2>
            </div>
            <Link to="/browse" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              Browse Talent →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
