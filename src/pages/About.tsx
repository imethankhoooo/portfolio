import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import { Capabilities, Numbers } from '../components/Capabilities'
import { timeline } from '../data/profile'
import { useLang } from '../lib/lang'
import { useTitle } from '../lib/useTitle'
import './About.css'

export default function About() {
    const { t } = useTranslation()
    const lang = useLang()
    useTitle(t('about.title'))

    const story = t('about.story', { returnObjects: true }) as string[]
    const now = t('about.now_items', { returnObjects: true }) as string[]

    return (
        <main className="page about">
            <header className="page-hero">
                <Reveal as="h1" className="page-title" immediate delay={0.2} key={lang}>
                    {t('about.title')}
                </Reveal>
                <div className="page-intro grid-12">
                    <span className="eyebrow">{t('about.label')}</span>
                    <p>{t('about.intro')}</p>
                </div>
            </header>

            <section className="section about-story grid-12">
                <div className="about-now">
                    <span className="eyebrow">{t('about.now')}</span>
                    <ul>
                        {now.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="about-copy">
                    {story.map((para, i) => (
                        <Reveal as="p" key={`${lang}-${i}`}>
                            {para}
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="section">
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

            <section className="section">
                <div className="section-head">
                    <h2 className="section-title">{t('about.capabilities')}</h2>
                </div>
                <Capabilities />
            </section>

            <section className="section about-numbers">
                <Numbers />
            </section>
        </main>
    )
}
