import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import './MobileNav.css'

export default function MobileNav() {
    const { t } = useTranslation()
    const location = useLocation()

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }

    const navItems = [
        { path: '/', label: t('nav.home'), icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
        { path: '/projects', label: t('nav.projects'), icon: 'M2 3h20v14H2z M8 21h8 M12 17v4' },
        { path: '/about', label: t('nav.about'), icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
        { path: '/contact', label: t('nav.contact'), icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
    ]

    return (
        <nav className="mobile-bottom-nav">
            <div className="nav-container">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                    >
                        <span className="icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d={item.icon} />
                            </svg>
                        </span>
                        <span className="label">{item.label}</span>
                    </Link>
                ))}
                <div className="nav-indicator" />
            </div>
        </nav>
    )
}
