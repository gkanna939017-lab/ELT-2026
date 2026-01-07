import { MapPin, Briefcase, Star, Phone } from 'lucide-react'

export default function WorkerCard({ worker }) {
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
          <h3 className="text-base font-semibold text-slate-900">{worker.name}</h3>
          <p className="text-sm text-primary-600">{worker.skill}</p>
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

      {worker.phone && (
        <a
          href={`tel:${worker.phone}`}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-2 text-xs font-semibold text-primary-700 transition hover:bg-primary-100"
        >
          <Phone size={14} /> {worker.phone}
        </a>
      )}
    </div>
  )
}
