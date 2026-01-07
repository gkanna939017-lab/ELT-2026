import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary-700">Empower Local Talent</h3>
            <p className="mt-2 text-sm text-slate-600">
              Connecting communities with trusted local professionals.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <Link to="/browse" className="hover:text-primary-600">
              Browse Talent
            </Link>
            <Link to="/training" className="hover:text-primary-600">
              Training Hub
            </Link>
            <Link to="/register" className="hover:text-primary-600">
              Register
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <a href="mailto:gkanna939017@gmail.com" className="flex items-center gap-2 hover:text-primary-600">
              <Mail size={16} /> gkanna939017@gmail.com
            </a>
            <a href="tel:+919390178485" className="flex items-center gap-2 hover:text-primary-600">
              <Phone size={16} /> 9390178485
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} ELT. All rights reserved.</p>
      </div>
    </footer>
  )
}
