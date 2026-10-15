import { useTranslation } from 'react-i18next'
import Scramble from '../components/Scramble'
import { Capabilities } from '../components/Capabilities'
import { timeline } from '../data/profile'
import { useLang } from '../lib/lang'
import { useTitle } from '../lib/useTitle'
import './About.css'

export default function About() {
    const { t } = useTranslation()
    const lang = useLang()
    useTitle(t('about.title'))

    const now = t('about.now_items', { returnObjects: true }) as string[]

    return (
        <main className="page about">
            <header className="page-hero" data-shape="helix">
                <Scramble as="h1" className="page-title" text={t('about.title')} trigger="mount" duration={1000} delay={250} />
                <div className="page-intro grid-12">
                    <span className="eyebrow">{t('about.label')}</span>
                    <p>{t('about.intro')}</p>
                </div>
            </header>

            <section className="section about-story grid-12" data-shape="helix">
                <div className="about-now">
                    <span className="eyebrow">{t('about.now')}</span>
                    <ul>
                        {now.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="section" data-shape="wave">
                <div className="section-head">
                    <h2 className="section-title">{t('about.timeline')}</h2>
                </div>
                <ol className="timeline">
                    {timeline.map((row) => (
                        <li key={row.what.en} className="timeline-row">
                            <span className="mono timeline-when">{row.when[lang]}</span>
                            <span className="timeline-what">{row.what[lang]}</span>
                            <span className="timeline-where">{row.where[lang]}</span>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="section" data-shape="helix">
                <div className="section-head">
                    <h2 className="section-title">{t('about.capabilities')}</h2>
                </div>
                <Capabilities compact />
            </section>

        </main>
    )
}
