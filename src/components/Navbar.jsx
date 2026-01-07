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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary-700">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shadow-soft">
            <Sparkles size={20} />
          </div>
          <span className="text-lg">ELT (Empower Local Talent)</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-slate-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button as="a" href="/browse">
            Find Workers
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-primary-50 md:hidden"
          aria-label="Toggle navigation"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-primary-50 ${
                    isActive ? 'text-primary-600' : 'text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button className="mt-3 w-full" onClick={() => setOpen(false)} as="a" href="/browse">
              Find Workers
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
