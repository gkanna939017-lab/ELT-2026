import { useMemo } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

export default function MapPreview({ workers }) {
  // Load Google Maps using the Vite env variable VITE_GOOGLE_MAPS_KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  })

  // Default map center (Guntur region) and small spread for mock coords-to-latlng mapping
  const center = useMemo(() => ({ lat: 16.3067, lng: 80.4365 }), [])

  // Convert worker.coords (x/y as percentages) to lat/lng within a small box around center
  const markers = (workers || []).map((w) => {
    const x = w.coords?.x ?? 50
    const y = w.coords?.y ?? 50
    const lat = center.lat + (50 - y) * 0.0012 // tweak to taste
    const lng = center.lng + (x - 50) * 0.0015
    return { id: w.id, position: { lat, lng }, name: w.name, avatar: w.avatar }
  })

  if (loadError) {
    return (
      <div className="relative mt-4 h-64 rounded-2xl border border-primary-100 bg-slate-50 shadow-soft flex items-center justify-center">
        <div className="text-sm text-primary-700">Map failed to load. Check your Google Maps API key.</div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="relative mt-4 h-64 rounded-2xl border border-primary-100 bg-slate-50 shadow-soft flex items-center justify-center">
        <div className="text-sm text-primary-700">Loading map…</div>
      </div>
    )
  }

  return (
    <div className="relative mt-4 h-64 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-soft">
      <GoogleMap
        mapContainerClassName="absolute inset-0"
        center={center}
        zoom={12}
        options={{ streetViewControl: false, mapTypeControl: false }}
      >
        {markers.map((m) => (
          <Marker key={m.id} position={m.position} title={m.name} />
        ))}
      </GoogleMap>
      <div className="absolute bottom-3 right-3 rounded-full bg-primary-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
        Nearby view
      </div>
    </div>
  )
}
