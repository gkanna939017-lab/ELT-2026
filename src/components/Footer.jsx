import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3 md:items-start md:justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Empower Local Talent</h3>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Connecting communities with verified local professionals for a safer, smarter way to work.
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-sm font-medium">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Platform</p>
            <Link to="/browse" className="transition hover:text-white hover:underline hover:decoration-primary-500 hover:underline-offset-4">
              Browse Talent
            </Link>
            <Link to="/training" className="transition hover:text-white hover:underline hover:decoration-primary-500 hover:underline-offset-4">
              Training Hub
            </Link>
            <Link to="/register" className="transition hover:text-white hover:underline hover:decoration-primary-500 hover:underline-offset-4">
              Register as Worker
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</p>
            <a href="mailto:gkanna939017@gmail.com" className="flex items-center gap-2 transition hover:text-white">
              <Mail size={16} className="text-primary-500" /> gkanna939017@gmail.com
            </a>
            <a href="tel:+919390178485" className="flex items-center gap-2 transition hover:text-white">
              <Phone size={16} className="text-primary-500" /> 9390178485
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center border-t border-slate-800 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} ELT. All rights reserved.</p>
          <div className="mt-4 flex gap-4 text-xs text-slate-500 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
