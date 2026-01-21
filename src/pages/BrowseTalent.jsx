import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, MapPin, Briefcase, Search, MapPinned, PackageCheck } from 'lucide-react'
import WorkerCard from '../components/WorkerCard.jsx'
import { workers } from '../data/mockData.js'
import MapPreview from '../components/MapPreview.jsx'

const categories = ['All', 'Home Services', 'Electrical', 'Technology', 'Freelance', 'Fashion', 'Artisan', 'Construction']
const locations = ['All', 'Narasaraopet', 'Guntur', 'Chilakaluripet', 'Sattenapalle', 'Macherla', 'Piduguralla']
const nearbyLocations = ['Narasaraopet', 'Guntur', 'Chilakaluripet', 'Sattenapalle', 'Macherla', 'Piduguralla']

export default function BrowseTalent() {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '')

  useEffect(() => {
    const term = searchParams.get('search') || ''
    setSearchTerm(term)
  }, [searchParams])

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const matchesSearch =
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCategory =
        selectedCategory === 'All' || worker.categories.includes(selectedCategory) || worker.skill === selectedCategory
      const matchLocation =
        selectedLocation === 'All' ||
        worker.location === selectedLocation ||
        (selectedLocation === 'Nearby' && nearbyLocations.includes(worker.location))
      return matchCategory && matchLocation && matchesSearch
    })
  }, [selectedCategory, selectedLocation, searchTerm])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Browse Talent</p>
          <h1 className="text-3xl font-bold text-slate-900">Find the right worker for your project</h1>
          <p className="mt-2 text-sm text-slate-600">
            Filter by category and location to connect with verified local professionals.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-primary-700">
          <Filter size={16} />
          <span className="text-sm font-semibold">Smart filters</span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
          <div className="relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="Search name, skill, or location"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            onClick={() => setSelectedLocation('Nearby')}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              selectedLocation === 'Nearby'
                ? 'bg-primary-600 text-white shadow-soft'
                : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
            }`}
          >
            Near me (Narasaraopet area)
          </button>

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Briefcase size={16} /> Category
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <MapPin size={16} /> Location
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    selectedLocation === loc
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
          {filteredWorkers.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
              No workers found. Try another filter.
            </div>
          )}
        </section>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <MapPinned size={18} /> Nearby labour map
          </div>
          <p className="mt-1 text-xs text-slate-600">Quick view of available workers near you.</p>
          <MapPreview workers={filteredWorkers.slice(0, 5)} />
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <PackageCheck size={18} /> Booking tracking
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Example status timeline to keep clients and workers aligned.
          </p>
          <div className="mt-4 space-y-3">
            {['Request received', 'Worker confirmed', 'En route', 'In progress', 'Completed'].map((step, idx) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 animate-[fadeInUp_0.4s_ease] [animation-fill-mode:both]"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{step}</p>
                  <p className="text-xs text-slate-600">
                    {idx === 2 ? 'Live ETA updates' : idx === 4 ? 'Rating & receipt shared' : 'Status auto-updates'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
