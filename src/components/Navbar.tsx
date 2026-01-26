import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import LanguageToggle from './LanguageToggle'
import './Navbar.css'

export default function Navbar() {
    const { t } = useTranslation()
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Ethan.K</Link>
            <ul className="nav-links">
                <li><Link to="/" className={isActive('/') ? 'active' : ''}>{t('nav.home')}</Link></li>
                <li><Link to="/projects" className={isActive('/projects') ? 'active' : ''}>{t('nav.projects')}</Link></li>
                <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>{t('nav.about')}</Link></li>
                <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>{t('nav.contact')}</Link></li>
            </ul>
            <LanguageToggle />
        </nav>
    )
}
