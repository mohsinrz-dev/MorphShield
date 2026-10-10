import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/detection', label: 'Detection' },
  { to: '/results', label: 'Results' },
  { to: '/robustness', label: 'Robustness' },
  { to: '/settings', label: 'Settings' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  return (
    <nav style={{ background: '#040810', borderBottom: '1px solid #111827' }} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-4 h-14">
        <NavLink to="/" className="flex items-center gap-2 shrink-0 mr-2">
          <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center text-white font-bold text-xs">
            MS
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">MorphShield</span>
        </NavLink>
        <div className="flex items-center gap-0.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-sky-950 text-sky-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
