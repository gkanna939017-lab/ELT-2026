
import { Link, NavLink } from 'react-router-dom'
import { Sparkles, Menu } from 'lucide-react'
import { useState } from 'react'
import Button from './Button.jsx'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse Talent' },
  { to: '/training', label: 'Training Hub' },
  { to: '/register', label: 'Register' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-white transition-colors hover:text-primary-400">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600/20 text-primary-400 ring-1 ring-primary-500/30">
            <Sparkles size={18} className="fill-current" />
          </div>
          <span className="text-xl tracking-tight">ELT</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary-400 ${isActive ? 'text-white' : 'text-slate-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button as="a" href="/browse" variant="primary">
            Find Workers
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800 bg-slate-900 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 px-4 py-3 pb-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-slate-800 hover:text-primary-400 ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <Button className="w-full" onClick={() => setOpen(false)} as="a" href="/browse">
                Find Workers
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
