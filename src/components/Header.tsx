import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TLink } from './Transition'
import Clock from './Clock'
import Scramble from './Scramble'
import { useLang } from '../lib/lang'
import { useLenis } from './SmoothScroll'
import './Header.css'

const NAV = [
    { to: '/projects', key: 'nav.projects', no: '01' },
    { to: '/about', key: 'nav.about', no: '02' },
    { to: '/contact', key: 'nav.contact', no: '03' },
]

export default function Header() {
    const { t, i18n } = useTranslation()
    const lang = useLang()
    const { pathname } = useLocation()
    const lenis = useLenis()
    const [open, setOpen] = useState(false)

    // Close the mobile menu whenever the route changes.
    useEffect(() => setOpen(false), [pathname])

    useEffect(() => {
        if (open) lenis?.stop()
        else lenis?.start()
        document.documentElement.classList.toggle('menu-open', open)
    }, [open, lenis])

    const toggleLang = () => i18n.changeLanguage(lang === 'en' ? 'zh' : 'en')
    const active = (to: string) => pathname === to || pathname.startsWith(to + '/')

    return (
        <>
            <header className="header">
                <TLink to="/" label="Ethan Khoo" className="header-brand">
                    <i className="brand-mark" aria-hidden="true" />
                    <Scramble text="ETHAN.KHOO" trigger="hover" duration={500} />
                    <i className="brand-caret" aria-hidden="true" />
                </TLink>

                <div className="header-meta">
                    <span className="status">
                        <i className="status-dot" />
                        {t('header.status')}
                    </span>
                    <span className="header-clock">
                        <Clock /> MYT
                    </span>
                </div>

                <nav className="header-nav" aria-label="Primary">
                    {NAV.map((item) => (
                        <TLink
                            key={item.to}
                            to={item.to}
                            label={t(item.key)}
                            className={`header-link${active(item.to) ? ' is-active' : ''}`}
                        >
                            <span className="header-link-no">[{item.no}]</span>
                            <Scramble text={t(item.key)} trigger="hover" duration={450} />
                        </TLink>
                    ))}
                    <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
                        <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
                        <span className="slash">/</span>
                        <span className={lang === 'zh' ? 'is-on' : ''}>中</span>
                    </button>
                </nav>

                <button
                    className={`menu-toggle${open ? ' is-open' : ''}`}
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-label="Menu"
                >
                    <span>{open ? t('header.close') : t('header.menu')}</span>
                </button>
            </header>

            <div className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
                <nav>
                    {[{ to: '/', key: 'nav.home', no: '00' }, ...NAV].map((item, i) => (
                        <TLink
                            key={item.to}
                            to={item.to}
                            label={t(item.key)}
                            className="mobile-link"
                            style={{ transitionDelay: open ? `${0.1 + i * 0.05}s` : '0s' }}
                            tabIndex={open ? 0 : -1}
                        >
                            <sup>{item.no}</sup>
                            {t(item.key)}
                        </TLink>
                    ))}
                </nav>
                <div className="mobile-menu-foot">
                    <button className="lang-toggle" onClick={toggleLang} tabIndex={open ? 0 : -1}>
                        <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
                        <span className="slash">/</span>
                        <span className={lang === 'zh' ? 'is-on' : ''}>中</span>
                    </button>
                    <span>
                        <Clock seconds={false} /> MYT
                    </span>
                </div>
            </div>
        </>
    )
}
