import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Users, ShieldCheck, Clock3, TrendingUp, MapPinned, Search } from 'lucide-react'
import Button from '../components/Button.jsx'
import MapPreview from '../components/MapPreview.jsx'
import { workers } from '../data/mockData.js'

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
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Plumbers',
    image:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Carpenters',
    image:
      'https://images.unsplash.com/photo-1622675363311-ac22f5a94860?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const term = searchTerm.trim()
    navigate(term ? `/browse?search=${encodeURIComponent(term)}` : '/browse')
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* CINEMATIC HERO */}
      <div className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-slate-900 pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80"
            alt="Hero Background"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="animate-[fadeInUp_0.8s_ease-out]">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-300 backdrop-blur-sm ring-1 ring-white/20">
              ✨ The #1 Platform for verified local talent
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              Hire the best.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
                Without the stress.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
              Connect with background-checked electricians, plumbers, and carpenters in your area.
              Safe, secure, and ready to work.
            </p>

            {/* Glassmorphism Search Bar */}
            <form onSubmit={handleSearch} className="relative z-50 mx-auto mt-10 max-w-2xl">
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-xl transition-all hover:bg-white/10 sm:flex-row sm:p-2.5">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    value={searchTerm}
                    onChange={(e) => {
                      const val = e.target.value
                      setSearchTerm(val)
                      if (val.length > 0) {
                        const all = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mechanic', 'Tailor', 'Pottery', 'Farming', 'AC Repair']
                        setSuggestions(all.filter(s => s.toLowerCase().includes(val.toLowerCase())).slice(0, 5))
                        setShowSuggestions(true)
                      } else {
                        setShowSuggestions(false)
                      }
                    }}
                    onFocus={() => searchTerm && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
                    placeholder="What service do you need today?"
                    className="w-full rounded-2xl bg-transparent px-12 py-4 text-white placeholder-slate-400 outline-none ring-0 placeholder:text-slate-400"
                  />
                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-800/95 p-1 shadow-xl backdrop-blur-md">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault() // Prevent focus loss
                            setSearchTerm(s)
                            setShowSuggestions(false)
                            navigate(`/browse?search=${encodeURIComponent(s)}`)
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-200 hover:bg-white/10"
                        >
                          <Search size={14} className="text-slate-500" />
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button type="submit" size="xl" className="w-full rounded-2xl bg-primary-600 py-4 text-lg font-bold shadow-lg shadow-primary-900/20 hover:bg-primary-500 sm:w-auto sm:px-10">
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Categories */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium text-slate-400">
              <span>Popular:</span>
              {['Electrician', 'Plumber', 'Carpenter', 'Painter'].map(cat => (
                <button
                  key={cat}
                  onClick={() => navigate(`/browse?search=${cat}`)}
                  className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 md:px-6 md:py-20"> 
         ...removed old hero grid...
      </div> 
      I will close the Hero div and start a NEW container for the rest of the sections, 
      because the Hero is now full-width (w-full), while the rest should be centered (max-w-6xl).
*/}
      <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-24 py-16">

        {/* TRUSTED BY PARTNERS */}
        <section className="border-y border-slate-100 bg-slate-50/50 py-10">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 md:gap-16">
              {/* Placeholder Logos - using text/icons for now as I don't have SVGs */}
              {['GreenEnergy Co.', 'UrbanBuild', 'City Council', 'SafeHomes', 'TechStart'].map((partner) => (
                <span key={partner} className="text-lg font-bold text-slate-500 flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-slate-400"></div> {partner}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION & IMPACT */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 py-16 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-300 ring-1 ring-primary-500/50">
                Our Mission
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Empowering the backbone of our economy.</h2>
              <p className="mt-4 text-slate-300">
                We believe in dignified work for every skilled professional. ELT isn't just a job board; it's a movement to formalize the local workforce, ensure fair pay, and build safer communities.
              </p>
              <div className="mt-8 flex gap-4">
                <Button variant="primary">Read Our Story</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Jobs Completed', value: '15,000+' },
                { label: 'Active Workers', value: '2,400+' },
                { label: 'Community Income', value: '₹4.5Cr+' },
                { label: 'Cities Covered', value: '12' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-primary-400">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Success Stories</h2>
            <p className="text-slate-600">Hear from the people transforming their lives with ELT.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "ELT helped me fill my schedule completely. The payments are secure, and clients trust my verified profile.",
                author: "Raju Kumar",
                role: "Certified Electrician",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              },
              {
                quote: "I found a reliable plumber for my renovation in minutes. The tracking feature gave me total peace of mind.",
                author: "Priya Sharma",
                role: "Homeowner, Hyderabad",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
              },
              {
                quote: "The solar installation course changed my career. I went from odd jobs to a full-time specialist.",
                author: "Anita Rao",
                role: "Solar Technician",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
              }
            ].map((story, i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition hover:shadow-lg">
                <p className="flex-1 text-slate-600 italic">"{story.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={story.image} alt={story.author} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{story.author}</p>
                    <p className="text-xs text-primary-600">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
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
