import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/',          label: 'Home',      icon: '⚽' },
  { to: '/matches',   label: 'Matches',   icon: '📅' },
  { to: '/favorites', label: 'My Teams',  icon: '★'  },
  { to: '/standings', label: 'Standings', icon: '≡'  },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
          }
        >
          <span className="bottom-nav__icon">{item.icon}</span>
          <span className="bottom-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
