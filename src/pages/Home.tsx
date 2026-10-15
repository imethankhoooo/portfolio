import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import KineticName from '../components/KineticName'
import ScrubText, { type Part } from '../components/ScrubText'
import StackedCases from '../components/StackedCases'
import ProjectIndex from '../components/ProjectIndex'
import Marquee from '../components/Marquee'
import Reveal from '../components/Reveal'
import { Capabilities, Numbers } from '../components/Capabilities'
import { TLink } from '../components/Transition'
import PillArrow from '../components/PillArrow'
import { getFeaturedProjects, projects } from '../data/projects'
import { gsap, reducedMotion } from '../lib/gsap'
import { useIntroDone } from '../lib/intro'
import { useLang } from '../lib/lang'
import { useTitle } from '../lib/useTitle'
import './Home.css'

const MARQUEE = ['Laravel', 'React', 'Node.js', 'Python', 'MySQL', 'Redis', 'AWS', 'RAG', 'LLM agents', 'MCP', 'Flutter', 'x86']

export default function Home() {
    const { t } = useTranslation()
    const lang = useLang()
    const ready = useIntroDone()
    const hero = useRef<HTMLElement>(null)
    const featured = getFeaturedProjects()
    useTitle()

    // Meta lines rise in once the preloader lifts; the hero drifts and fades as you leave it.
    useLayoutEffect(() => {
        const el = hero.current
        if (!el) return
        const ctx = gsap.context(() => {
            const meta = el.querySelectorAll('.hero-rise')
            if (!ready) {
                gsap.set(meta, { yPercent: 120 })
                return
            }
            gsap.fromTo(meta, { yPercent: 120 }, {
                yPercent: 0,
                duration: reducedMotion() ? 0 : 1.2,
                ease: 'expo.out',
                stagger: 0.05,
                delay: 0.35,
            })
            if (reducedMotion()) return
            gsap.to('.hero-inner', {
                yPercent: 18,
                opacity: 0.2,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
            })
        }, el)
        return () => ctx.revert()
    }, [ready, lang])

    const lines = (key: string) =>
        t(key).split('\n').map((line) => (
            <span className="hero-mask" key={line}>
                <span className="hero-rise">{line}</span>
            </span>
        ))

    return (
        <main className="page home">
            <section className="hero" ref={hero}>
                <div className="hero-grid" aria-hidden="true">
                    {Array.from({ length: 13 }, (_, i) => <i key={i} />)}
                </div>

                <div className="hero-inner">
                    <div className="hero-meta grid-12">
                        <p className="hero-meta-col">{lines('hero.role')}</p>
                        <p className="hero-meta-col">{lines('hero.based')}</p>
                        <p className="hero-meta-col">{lines('hero.focus')}</p>
                    </div>

                    <div className="hero-mid grid-12">
                        <p className="hero-lead">
                            <span className="hero-mask"><span className="hero-rise">{t('hero.lead')}</span></span>
                        </p>
                        <span className="hero-scroll">
                            <span className="hero-mask"><span className="hero-rise">↓ {t('hero.scroll')}</span></span>
                        </span>
                    </div>

                    <KineticName text="Ethan Khoo" play={ready} />
                </div>
            </section>

            <section className="section manifesto grid-12">
                <span className="eyebrow manifesto-label">{t('home.manifesto_label')}</span>
                <ScrubText
                    className="manifesto-text"
                    parts={t('home.manifesto', { returnObjects: true }) as Part[]}
                />
            </section>

            <Marquee items={MARQUEE} />

            <section className="selected">
                <div className="section section-head-wrap">
                    <div className="section-head">
                        <Reveal as="h2" className="section-title" key={`s-${lang}`}>
                            {t('home.selected')}
                        </Reveal>
                        <p className="section-note">{t('home.selected_note')}</p>
                    </div>
                </div>
                <StackedCases items={featured} />
            </section>

            <section className="section">
                <div className="section-head">
                    <h2 className="section-title">
                        {t('home.index')}
                        <sup>({String(projects.length).padStart(2, '0')})</sup>
                    </h2>
                    <p className="section-note">{t('home.index_note')}</p>
                </div>
                <ProjectIndex items={projects} />
                <div className="home-more">
                    <TLink to="/projects" label={t('nav.projects')} className="pill">
                        {t('home.all_work')}
                        <PillArrow />
                    </TLink>
                </div>
            </section>

            <section className="section">
                <div className="section-head">
                    <h2 className="section-title">{t('home.capabilities')}</h2>
                </div>
                <Capabilities />
            </section>

            <section className="section home-numbers">
                <span className="eyebrow">{t('home.numbers')}</span>
                <Numbers />
            </section>
        </main>
    )
}
