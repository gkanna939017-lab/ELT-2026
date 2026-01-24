import { MapPin, Briefcase, Star, Phone, ShieldCheck } from 'lucide-react'
import Button from './Button.jsx'

export default function WorkerCard({ worker, onBook }) {
  return (
    <div className="group relative flex flex-col md:flex-row gap-6 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary-500 overflow-hidden">

      {/* Avatar Section */}
      <div className="flex flex-col items-center md:items-start gap-3 min-w-[120px]">
        <div className="relative">
          {worker.avatar ? (
            <img
              src={worker.avatar}
              alt={worker.name}
              className="h-24 w-24 rounded-2xl object-cover ring-4 ring-slate-50 shadow-md group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-3xl font-bold text-slate-400 ring-4 ring-slate-50 shadow-md">
              {worker.name.charAt(0)}
            </div>
          )}
          {worker.verified && (
            <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-1.5 shadow-md ring-1 ring-slate-50">
              <ShieldCheck size={20} className="fill-blue-50 text-blue-600" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm shadow-amber-200">
          <Star size={12} className="fill-white text-white" /> <span>{worker.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
              {worker.name}
            </h3>
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide opacity-90">{worker.skill}</p>
          </div>
          <div className="hidden md:block">
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">ID: ELT-{worker.id}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {worker.summary || "Experienced local professional committed to quality service and timely completion of projects. Available for immediate booking."}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Briefcase size={14} className="text-slate-400" />
            <span>{worker.experience} exp</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <MapPin size={14} className="text-slate-400" />
            <span>{worker.location}</span>
          </div>
          {/* Mobile only ID */}
          <div className="md:hidden flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
            <span>ID: {worker.id}</span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex flex-col gap-3 min-w-[160px] border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 justify-center">
        <div className="text-center mb-1 hidden md:block">
          <p className="text-xs text-slate-400 font-medium">Starting from</p>
          <p className="text-lg font-bold text-slate-900">₹399<span className="text-xs font-normal text-slate-400">/visit</span></p>
        </div>

        <Button
          onClick={onBook}
          className="w-full rounded-xl py-3 shadow-md shadow-primary-900/10 hover:shadow-primary-900/20 font-bold"
        >
          Book Now
        </Button>

        {worker.phone && (
          <a
            href={`tel:${worker.phone}`}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <Phone size={16} /> Call Now
          </a>
        )}
      </div>

    </div>
  )
}
