import { useState } from 'react'
import { X, Calendar, Clock, CheckCircle } from 'lucide-react'
import Button from './Button.jsx'
import { createBooking } from '../services/api.js'

export default function BookingModal({ worker, isOpen, onClose }) {
    const [formData, setFormData] = useState({ date: '', time: '', description: '' })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Combine date and time
            const datetime = new Date(`${formData.date}T${formData.time}`).toISOString()

            await createBooking({
                workerId: worker.id,
                date: datetime,
                description: formData.description,
                clientName: formData.clientName,
                clientPhone: formData.clientPhone
            })

            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setFormData({ date: '', time: '', description: '' })
            }, 2000)
        } catch (error) {
            alert('Failed to book. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out]">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-900">Book {worker.name}</h3>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100 text-slate-500">
                        <X size={20} />
                    </button>
                </div>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                            <CheckCircle size={40} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">Booking Confirmed!</h4>
                        <p className="mt-2 text-slate-600">Your request has been sent to {worker.name}.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                        {/* Worker Info Snippet */}
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                            <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold shadow-sm uppercase tracking-wide text-primary-700">
                                {worker.skill}
                            </span>
                            <p className="text-sm font-medium text-slate-700">Rate: ₹400/visit estimate</p>
                        </div>


                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-slate-500">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                    value={formData.clientName || ''}
                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-slate-500">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="9876543210"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                    value={formData.clientPhone || ''}
                                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-slate-500">Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-slate-500">Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase text-slate-500">Description</label>
                            <textarea
                                rows={3}
                                required
                                placeholder="What assistance do you need? (e.g. Fan repair, wiring check)"
                                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="pt-2">
                            <Button type="submit" className="w-full py-3" disabled={loading}>
                                {loading ? 'Confirming...' : 'Confirm Booking'}
                            </Button>
                        </div>

                        <p className="text-center text-xs text-slate-400">
                            You won't be charged yet. Payment is after service.
                        </p>
                    </form>
                )}
            </div>
        </div>
    )
}
