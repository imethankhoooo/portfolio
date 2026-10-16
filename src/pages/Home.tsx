import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Scramble from '../components/Scramble'
import ProjectCard from '../components/ProjectCard'
import { Capabilities } from '../components/Capabilities'
import { TLink } from '../components/Transition'
import PillArrow from '../components/PillArrow'
import { getFeaturedProjects, projects } from '../data/projects'
import { profile } from '../data/profile'
import { asset } from '../lib/asset'
import { gsap, reducedMotion } from '../lib/gsap'
import { useIntroDone } from '../lib/intro'
import { useLang } from '../lib/lang'
import { useTitle } from '../lib/useTitle'
import { useLenis } from '../components/SmoothScroll'
import './Home.css'

type Callout = { k: string; v: string }

function SectionHead({ no, id, title, count, action }: { no: string; id: string; title: string; count?: number; action?: ReactNode }) {
    return (
        <div className="section-head">
            <div>
                <span className="section-index">
                    [{no}] // {id}
                </span>
                <h2 className="section-title">
                    <Scramble text={title} trigger="view" duration={900} />
                    {count !== undefined && <sup>({String(count).padStart(2, '0')})</sup>}
                </h2>
            </div>
            {action}
        </div>
    )
}

export default function Home() {
    const { t } = useTranslation()
    const lang = useLang()
    const ready = useIntroDone()
    const hero = useRef<HTMLElement>(null)
    const grid = useRef<HTMLDivElement>(null)
    const lenis = useLenis()
    const featured = getFeaturedProjects()
    // Archived coursework and projects still waiting for screenshots live on the Work page only.
    const more = projects.filter((p) => !p.featured && !p.archived && (p.gallery.length > 0 || p.code))
    const numberOf = (id: string) => String(projects.findIndex((p) => p.id === id) + 1).padStart(2, '0')
    useTitle()

    // Hero UI powers on after the boot screen; cards rise in as they enter the viewport.
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
            gsap.fromTo(parts, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, delay: 0.4 })
            gsap.fromTo('.hero-callout-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'expo.out', stagger: 0.12, delay: 0.9 })
        }, el)
        return () => ctx.revert()
    }, [ready, lang])

    useLayoutEffect(() => {
        const el = grid.current
        if (!el || reducedMotion()) return
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.pcard-body').forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 24,
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: card, start: 'top 92%', once: true },
                })
            })
        }, el)
        return () => ctx.revert()
    }, [])

    const callouts = t('hero.callouts', { returnObjects: true }) as Callout[]

    const toWork = () => {
        const target = document.getElementById('work')
        if (!target) return
        if (lenis) lenis.scrollTo(target, { offset: -40, duration: 1.4 })
        else target.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <main className="page home">
            <section className="hero" ref={hero} data-shape="sphere">
                <div className="hero-inner">
                    <div className="hero-copy">
                        <span className="hero-tag hero-in">
                            <i /> {t('hero.tag')}
                        </span>

                        <h1 className="hero-name" aria-label="Ethan Khoo">
                            <Scramble text="ETHAN" trigger="mount" play={ready} duration={1100} delay={250} className="hero-name-line" />
                            <Scramble text="KHOO" trigger="mount" play={ready} duration={1100} delay={450} className="hero-name-line is-accent" />
                        </h1>

                        <p className="hero-lead hero-in">{t('hero.lead')}</p>

                        <div className="hero-ctas hero-in">
                            <button type="button" onClick={toWork} className="pill pill-solid">
                                {t('hero.cta_work')} ↓
                            </button>
                            <TLink to="/contact" label={t('nav.contact')} className="pill">
                                {t('hero.cta_contact')}
                            </TLink>
                            {profile.cv && (
                                <a className="pill" href={asset(profile.cv)} target="_blank" rel="noopener noreferrer">
                                    {t('hero.cv')}
                                </a>
                            )}
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
                </div>
            </section>

            <div ref={grid}>
                <section className="section home-work" id="work" data-shape="lattice">
                    <SectionHead no="01" id="SELECTED_WORK" title={t('home.selected')} count={featured.length} />
                    <div className="work-featured">
                        {featured.map((p) => (
                            <ProjectCard key={p.id} project={p} no={numberOf(p.id)} eager />
                        ))}
                    </div>
                </section>

                <section className="section home-more-work" data-shape="lattice">
                    <SectionHead
                        no="02"
                        id="MORE"
                        title={t('home.more')}
                        count={more.length}
                        action={
                            <TLink to="/projects" label={t('nav.projects')} className="pill">
                                {t('home.all_work')}
                                <PillArrow />
                            </TLink>
                        }
                    />
                    <div className="work-more">
                        {more.map((p) => (
                            <ProjectCard key={p.id} project={p} size="sm" no={numberOf(p.id)} />
                        ))}
                    </div>
                </section>
            </div>

            <section className="section home-stack" data-shape="helix">
                <SectionHead no="03" id="STACK" title={t('home.capabilities')} />
                <Capabilities />
            </section>
        </main>
    )
}
