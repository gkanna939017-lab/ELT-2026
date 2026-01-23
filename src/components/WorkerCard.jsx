import { useState } from 'react'
import { MapPin, Briefcase, Star, Phone } from 'lucide-react'
import BookingModal from './BookingModal.jsx'

export default function WorkerCard({ worker }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        {worker.avatar ? (
          <img
            src={worker.avatar}
            alt={worker.name}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-100"
            loading="lazy"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 font-semibold">
            {worker.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-semibold text-slate-900">{worker.name}</h3>
            {/* Verified Badge */}
            <span className="inline-flex items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 ring-1 ring-blue-500/20" title="Background Checked">
              ✓ Verified
            </span>
          </div>
          <p className="text-sm text-primary-600 font-medium">{worker.skill}</p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-600">{worker.summary}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
        <span className="flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-primary-700">
          <Briefcase size={16} /> {worker.experience} yrs
        </span>
        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
          <MapPin size={16} /> {worker.location}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
          <Star size={16} /> {worker.rating.toFixed(1)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {worker.categories.map((cat) => (
          <span key={cat} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {cat}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        {worker.phone && (
          <a
            href={`tel:${worker.phone}`}
            className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            <Phone size={16} /> Call
          </a>
        )}
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-[2] inline-flex justify-center items-center gap-2 rounded-xl bg-primary-600 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-primary-900/20 transition hover:bg-primary-700 hover:-translate-y-0.5"
        >
          Book Now
        </button>
      </div>

      <BookingModal
        worker={worker}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  )
}
