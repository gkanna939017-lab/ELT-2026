import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, MapPin, Briefcase, Search, MapPinned, PackageCheck, Loader2 } from 'lucide-react'
import WorkerCard from '../components/WorkerCard.jsx'
import MapPreview from '../components/MapPreview.jsx'
import BookingModal from '../components/BookingModal.jsx'
import { searchProfiles } from '../services/api.js'
import { workers as mockWorkers } from '../data/mockData.js'

const categories = ['All', 'Home Services', 'Electrical', 'Technology', 'Freelance', 'Fashion', 'Artisan', 'Construction']
const locations = ['All', 'Narasaraopet', 'Guntur', 'Chilakaluripet', 'Sattenapalle', 'Macherla', 'Piduguralla']

export default function BrowseTalent() {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(false)

  // Booking Modal State (Fixed: Single instance at parent level)
  const [bookingWorker, setBookingWorker] = useState(null)

  // Fetch workers from backend when searchTerm changes
  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true)
      try {
        const query = searchTerm || ''
        const { data } = await searchProfiles(query)
        // Transform backend data to match WorkerCard props if different
        // Backend returns { id, category, location, experience, bio, user: { name, email }, is_verified }
        const mapped = data.map(p => ({
          id: p.id,
          name: p.user?.name || 'Unknown',
          role: p.category,
          location: p.location,
          rating: p.rating || 4.8,
          verified: !!p.is_verified,
          skill: p.category, // using category as skill
          experience: p.experience || 'N/A',
          categories: [p.category],
          avatar: p.avatar,
          phone: p.user?.phoneNumber
        }))
        setWorkers(mapped)
      } catch (error) {
        console.error("Failed to fetch workers", error)
        // Fallback to mock data for demo/when backend is offline
        const fallback = mockWorkers.map(w => ({
          ...w,
          role: w.skill,
          verified: true
        }))
        setWorkers(fallback)
      } finally {
        setLoading(false)
      }
    }
    fetchWorkers()
  }, [searchTerm])

  // Client-side filtering for category/location (since backend search is basic text match)
  const filteredWorkers = workers.filter((worker) => {
    const matchCategory =
      selectedCategory === 'All' || worker.categories.includes(selectedCategory) || worker.skill === selectedCategory
    const matchLocation =
      selectedLocation === 'All' ||
      worker.location === selectedLocation ||
      (selectedLocation === 'Nearby' && ['Narasaraopet', 'Guntur'].includes(worker.location)) // Mock nearby logic
    return matchCategory && matchLocation
  })

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

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-24 z-10 space-y-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
          <div className="relative">
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
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="Search name, skill, or location"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />

            {/* Sidebar Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full z-10 mt-1 w-full overflow-hidden rounded-xl border border-slate-100 bg-white p-1 shadow-lg">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      setSearchTerm(s)
                      setShowSuggestions(false)
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Search size={14} className="text-slate-400" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setSelectedLocation('Nearby')}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${selectedLocation === 'Nearby'
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
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${selectedCategory === cat
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
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${selectedLocation === loc
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

        <section className="grid gap-4 grid-cols-1">
          {loading ? (
            <div className="col-span-full flex justify-center py-20"><Loader2 className="animate-spin text-primary-500" size={32} /></div>
          ) : (
            <>
              {filteredWorkers.map((worker) => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  onBook={() => setBookingWorker(worker)}
                />
              ))}
              {filteredWorkers.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
                  No workers found matching "{searchTerm}". Try a broader term.
                </div>
              )}
            </>
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

      {/* Global Booking Modal */}
      {bookingWorker && (
        <BookingModal
          worker={bookingWorker}
          isOpen={!!bookingWorker}
          onClose={() => setBookingWorker(null)}
        />
      )}
    </div>
  )
}
