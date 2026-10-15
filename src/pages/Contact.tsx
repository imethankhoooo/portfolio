import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Scramble from '../components/Scramble'
import Clock from '../components/Clock'
import { profile } from '../data/profile'
import { useTitle } from '../lib/useTitle'
import './Contact.css'

export default function Contact() {
    const { t } = useTranslation()
    const [copied, setCopied] = useState(false)
    useTitle(t('contact.title'))

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(profile.email)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1800)
        } catch {
            window.location.href = `mailto:${profile.email}`
        }
    }

    return (
        <main className="page contact">
            <header className="page-hero" data-shape="ring">
                <Scramble as="h1" className="page-title" text={t('contact.title')} trigger="mount" duration={1000} delay={250} />
                <div className="page-intro grid-12">
                    <span className="eyebrow">{t('contact.label')}</span>
                    <p>{t('contact.intro')}</p>
                </div>
            </header>

            <section className="section contact-body">
                <div className="contact-mail">
                    <span className="mono contact-k">{t('contact.email')}</span>
                    <a href={`mailto:${profile.email}`} className="contact-mail-link" data-cursor={t('cursor.write')}>
                        {profile.email}
                    </a>
                    <button className="pill contact-copy" onClick={copy}>
                        {copied ? t('contact.copied') : t('contact.copy')}
                    </button>
                </div>

                <div className="contact-links">
                    <span className="mono contact-k">{t('contact.elsewhere')}</span>
                    {profile.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="contact-row">
                            <span className="contact-row-label">{l.label}</span>
                            <span className="contact-row-value">{l.value}</span>
                            <span className="contact-row-arrow" aria-hidden="true">↗</span>
                        </a>
                    ))}
                </div>

                <div className="contact-base">
                    <span>
                        <Clock /> MYT
                    </span>
                    <span>© {new Date().getFullYear()} Ethan Khoo</span>
                </div>
            </section>
        </main>
    )
}
