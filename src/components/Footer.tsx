import { useTranslation } from 'react-i18next'
import { profile } from '../data/profile'
import { useLenis } from './SmoothScroll'
import Clock from './Clock'
import Magnetic from './Magnetic'
import Scramble from './Scramble'
import './Footer.css'

export default function Footer() {
    const { t } = useTranslation()
    const lenis = useLenis()

    const toTop = () => {
        if (lenis) lenis.scrollTo(0, { duration: 1.6 })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="footer" data-shape="ring">
            <div className="footer-inner">
                <div className="footer-label">
                    <span className="footer-label-k">[06] // {t('footer.label')}</span>
                    <span>{t('footer.reply')}</span>
                </div>

                <Scramble as="h2" className="footer-title" text={t('footer.title')} trigger="view" duration={1200} />

                <a className="footer-mail" href={`mailto:${profile.email}`} data-cursor={t('cursor.write')}>
                    <span className="footer-mail-prompt" aria-hidden="true">&gt; mailto:</span>
                    <span className="footer-mail-text">{profile.email}</span>
                    <i className="footer-mail-caret" aria-hidden="true" />
                    <span className="footer-mail-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                            <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                    </span>
                </a>

                <div className="footer-grid">
                    <div className="footer-col">
                        <span className="footer-col-title">{t('footer.elsewhere')}</span>
                        {profile.links.map((l) => (
                            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                                <span>{l.label}</span>
                                <span className="footer-link-value">{l.value}</span>
                            </a>
                        ))}
                    </div>
                    <div className="footer-col">
                        <span className="footer-col-title">{t('footer.local')}</span>
                        <span className="footer-time">
                            <Clock /> <small>GMT+8</small>
                        </span>
                        <span className="footer-muted">{t('footer.location')}</span>
                    </div>
                    <div className="footer-col footer-col-end">
                        <Magnetic>
                            <button className="round-btn" onClick={toTop} aria-label={t('footer.top')}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                            </button>
                        </Magnetic>
                    </div>
                </div>

                <div className="footer-base">
                    <span>© {new Date().getFullYear()} Ethan Khoo</span>
                    <span>{t('footer.built')}</span>
                </div>
            </div>
        </footer>
    )
}
