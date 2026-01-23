
import { Link, NavLink } from 'react-router-dom'
import { Sparkles, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import Button from './Button.jsx'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse Talent' },
  { to: '/training', label: 'Training Hub' },
  { to: '/enterprise', label: 'For Business' },
  { to: '/register', label: 'Register' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) setUser(JSON.parse(storedUser))
      else setUser(null)
    }
    window.addEventListener('storage', handleStorage)
    handleStorage() // Initial check
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.dispatchEvent(new Event('storage'))
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
        ? 'border-slate-800 bg-slate-900/95 shadow-lg backdrop-blur-md'
        : 'border-transparent bg-transparent py-2'
        }`}
    >
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
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Hi, {user.name}</span>
              <Button onClick={handleLogout} variant="outline" className="border-white/20 text-white hover:bg-white/10">Logout</Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Log in</Link>
              <Button as={Link} to="/register-user" variant="primary">
                Sign Up
              </Button>
            </>
          )}
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
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-3">
              {user ? (
                <Button className="w-full" onClick={() => { handleLogout(); setOpen(false); }}>Logout</Button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="block text-center text-slate-300 hover:text-white">Log in</Link>
                  <Button className="w-full" onClick={() => setOpen(false)} as={Link} to="/register-user">
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
