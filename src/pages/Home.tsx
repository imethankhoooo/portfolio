import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Scramble from '../components/Scramble'
import ScrubText, { type Part } from '../components/ScrubText'
import StackedCases from '../components/StackedCases'
import ProjectIndex from '../components/ProjectIndex'
import Marquee from '../components/Marquee'
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

type Callout = { k: string; v: string }

function SectionHead({ no, id, title, note, count }: { no: string; id: string; title: string; note?: string; count?: number }) {
    return (
        <div className="section-head">
            <div>
                <span className="section-index">
                    [{no}] // {id}
                </span>
                <h2 className="section-title">
                    <Scramble text={title} trigger="view" duration={1100} />
                    {count !== undefined && <sup>({String(count).padStart(2, '0')})</sup>}
                </h2>
            </div>
            {note && <p className="section-note">{note}</p>}
        </div>
    )
}

export default function Home() {
    const { t } = useTranslation()
    const lang = useLang()
    const ready = useIntroDone()
    const hero = useRef<HTMLElement>(null)
    const featured = getFeaturedProjects()
    useTitle()

    // Hero UI powers on after the boot screen; it then drifts and fades as you scroll away.
    useLayoutEffect(() => {
        const el = hero.current
        if (!el) return
        const ctx = gsap.context(() => {
            const parts = el.querySelectorAll('.hero-in')
            if (!ready) {
                gsap.set(parts, { opacity: 0 })
                return
            }
            if (reducedMotion()) {
                gsap.set(parts, { opacity: 1 })
                return
            }
            gsap.fromTo(parts, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, delay: 0.5 })
            gsap.fromTo('.hero-callout-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'expo.out', stagger: 0.12, delay: 1 })
            gsap.to('.hero-inner', {
                yPercent: 14,
                opacity: 0,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
            })
        }, el)
        return () => ctx.revert()
    }, [ready, lang])

    const callouts = t('hero.callouts', { returnObjects: true }) as Callout[]

    return (
        <main className="page home">
            <section className="hero" ref={hero} data-shape="sphere">
                <div className="hero-inner">
                    <div className="hero-copy">
                        <span className="hero-tag hero-in">
                            <i /> [ SYS.ID 0x01 ] // {t('hero.tag')}
                        </span>

                        <h1 className="hero-name" aria-label="Ethan Khoo">
                            <Scramble text="ETHAN" trigger="mount" play={ready} duration={1200} delay={300} className="hero-name-line" />
                            <Scramble text="KHOO" trigger="mount" play={ready} duration={1200} delay={550} className="hero-name-line is-outline" />
                        </h1>

                        <p className="hero-lead hero-in">{t('hero.lead')}</p>

                        <div className="hero-ctas hero-in">
                            <TLink to="/projects" label={t('nav.projects')} className="pill pill-solid">
                                {t('hero.cta_work')}
                                <PillArrow />
                            </TLink>
                            <TLink to="/contact" label={t('nav.contact')} className="pill">
                                {t('hero.cta_contact')}
                            </TLink>
                        </div>
                    </div>

                    <ul className="hero-callouts" aria-label={t('hero.callouts_label')}>
                        {callouts.map((c, i) => (
                            <li className={`hero-callout hero-in c${i}`} key={c.k}>
                                <i className="hero-callout-line" />
                                <span className="hero-callout-k">{c.k}</span>
                                <span className="hero-callout-v">{c.v}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="hero-bottom hero-in">
                        <span>{t('hero.based')}</span>
                        <span className="hero-scroll">
                            <i /> {t('hero.scroll')}
                        </span>
                        <span>{t('hero.role')}</span>
                    </div>
                </div>
            </section>

            <section className="section manifesto grid-12" data-shape="wave">
                <span className="section-index manifesto-label">[01] // {t('home.manifesto_label')}</span>
                <ScrubText className="manifesto-text" parts={t('home.manifesto', { returnObjects: true }) as Part[]} />
            </section>

            <Marquee items={MARQUEE} />

            <section className="selected" data-shape="lattice">
                <div className="section section-head-wrap">
                    <SectionHead no="02" id="SELECTED_WORK" title={t('home.selected')} note={t('home.selected_note')} />
                </div>
                <StackedCases items={featured} />
            </section>

            <section className="section" data-shape="lattice">
                <SectionHead no="03" id="ARCHIVE" title={t('home.index')} note={t('home.index_note')} count={projects.length} />
                <ProjectIndex items={projects} />
                <div className="home-more">
                    <TLink to="/projects" label={t('nav.projects')} className="pill">
                        {t('home.all_work')}
                        <PillArrow />
                    </TLink>
                </div>
            </section>

            <section className="section" data-shape="helix">
                <SectionHead no="04" id="MODULES" title={t('home.capabilities')} />
                <Capabilities />
            </section>

            <section className="section home-numbers" data-shape="helix">
                <span className="section-index">[05] // {t('home.numbers')}</span>
                <Numbers />
            </section>
        </main>
    )
}
