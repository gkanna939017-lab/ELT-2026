export default function MapPreview({ workers }) {
  // Mock map background using a subtle pattern or gradient to simulate a map view
  return (
    <div className="relative mt-4 h-64 overflow-hidden rounded-2xl border border-slate-200 bg-[#e5e7eb] shadow-inner">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Decorative Map Elements (Streets) */}
      <div className="absolute top-1/2 left-0 h-4 w-full -rotate-6 bg-white/60"></div>
      <div className="absolute top-0 left-1/3 h-full w-4 rotate-12 bg-white/60"></div>

      {/* Worker Markers */}
      {(workers || []).map((w, i) => (
        <div
          key={w.id}
          className="absolute flex flex-col items-center group cursor-pointer"
          style={{
            top: `${w.coords?.y ?? 50}%`,
            left: `${w.coords?.x ?? 50}%`,
            transition: 'all 0.3s ease'
          }}
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-primary-500 transition-transform group-hover:-translate-y-2 group-hover:scale-110">
            {w.avatar ? (
              <img src={w.avatar} alt={w.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="h-full w-full rounded-full bg-primary-100"></div>
            )}
            <div className="absolute -bottom-1 h-3 w-3 rotate-45 bg-white"></div>
          </div>
          {/* Tooltip */}
          <div className="absolute -top-8 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
            {w.skill}
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 right-3 rounded-full bg-primary-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
        Nearby view
      </div>
    </div>
  )
}
