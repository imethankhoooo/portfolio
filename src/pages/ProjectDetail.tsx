import { useLayoutEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import Cover from '../components/Cover'
import PillArrow from '../components/PillArrow'
import { TLink } from '../components/Transition'
import { coverOf, getNextProject, getProjectById, projects } from '../data/projects'
import { asset } from '../lib/asset'
import { gsap, reducedMotion } from '../lib/gsap'
import { useLang } from '../lib/lang'
import { useTitle } from '../lib/useTitle'
import './ProjectDetail.css'

export default function ProjectDetail() {
    const { id = '' } = useParams()
    const { t } = useTranslation()
    const lang = useLang()
    const root = useRef<HTMLElement>(null)
    const project = getProjectById(id)
    useTitle(project?.title[lang])

    useLayoutEffect(() => {
        const el = root.current
        if (!el || reducedMotion()) return
        const ctx = gsap.context(() => {
            // Cover opens from the bottom edge, then drifts slower than the page.
            gsap.fromTo('.pd-plate', { clipPath: 'inset(100% 0% 0% 0%)' }, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.4,
                ease: 'expo.inOut',
                delay: 0.5,
            })
            const floating = el.querySelector('.pd-plate:not(.is-fill) .pd-plate-shot')
            if (floating) gsap.fromTo(floating, { yPercent: 10 }, {
                yPercent: -4,
                ease: 'none',
                scrollTrigger: { trigger: '.pd-cover', start: 'top bottom', end: 'bottom top', scrub: true },
            })
            gsap.utils.toArray<HTMLElement>('.pd-shot').forEach((shot) => {
                gsap.fromTo(shot, { clipPath: 'inset(12% 6% 12% 6%)', opacity: 0.4 }, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: { trigger: shot, start: 'top 95%', end: 'top 45%', scrub: true },
                })
            })
            gsap.from('.pd-meta > div', { opacity: 0, y: 20, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.4 })
        }, el)
        return () => ctx.revert()
    }, [id])

    if (!project) return <Navigate to="/projects" replace />

    const next = getNextProject(project.id)
    const no = String(projects.indexOf(project) + 1).padStart(2, '0')
    const shots = project.gallery.slice(1)
    const domain = project.link ? new URL(project.link).hostname.replace(/^www\./, '') : null

    return (
        <main className="page pd" ref={root} key={project.id}>
            <header className="pd-hero" data-shape="ring">
                <div className="pd-top">
                    <TLink to="/projects" label={t('nav.projects')} className="pd-back">
                        ← {t('project.back')}
                    </TLink>
                    <span className="mono">
                        {no} / {String(projects.length).padStart(2, '0')}
                    </span>
                </div>

                <Reveal as="h1" className="pd-title" immediate delay={0.25} key={`${project.id}-${lang}`}>
                    {project.title[lang]}
                </Reveal>

                <div className="pd-meta">
                    <div>
                        <span className="pd-meta-k">{t('project.role')}</span>
                        <span>{project.role[lang]}</span>
                    </div>
                    <div>
                        <span className="pd-meta-k">{t('project.category')}</span>
                        <span>{t(`type.${project.type}`)}</span>
                    </div>
                    <div>
                        <span className="pd-meta-k">{t('project.stack')}</span>
                        <span>{project.stack.join(', ')}</span>
                    </div>
                    <div className="pd-meta-cta">
                        {project.link && (
                            <a className="pill" href={project.link} target="_blank" rel="noopener noreferrer">
                                {t('project.visit')} — {domain}
                                <PillArrow />
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <div className="pd-cover">
                <div className={`pd-plate${coverOf(project) ? '' : ' is-fill'}`} style={{ background: project.tone }}>
                    <div className="pd-plate-shot">
                        <Cover project={project} eager />
                    </div>
                </div>
            </div>

            <section className="section pd-overview grid-12" data-shape="wave">
                <span className="eyebrow">{t('project.overview')}</span>
                <p className="pd-desc">{project.description[lang]}</p>

                <span className="eyebrow pd-hl-label">{t('project.highlights')}</span>
                <ol className="pd-highlights">
                    {project.highlights[lang].map((h, i) => (
                        <li key={h}>
                            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                            {h}
                        </li>
                    ))}
                </ol>
            </section>

            {project.video && (
                <section className="section pd-demo">
                    <span className="eyebrow">{t('project.demo')}</span>
                    <video
                        className="pd-video"
                        src={asset(project.video.src)}
                        poster={asset(project.video.poster)}
                        controls
                        muted
                        playsInline
                        preload="none"
                        data-cursor={t('cursor.play')}
                    />
                </section>
            )}

            {shots.length > 0 && (
                <section className="section pd-gallery">
                    <span className="eyebrow">
                        {t('project.gallery')} ({String(project.gallery.length).padStart(2, '0')})
                    </span>
                    <div className="pd-shots">
                        {shots.map((name) => (
                            <figure className="pd-shot" key={name}>
                                <img
                                    src={asset(`media/${project.id}/${name}.webp`)}
                                    alt={`${project.title[lang]} — ${name}`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </figure>
                        ))}
                    </div>
                </section>
            )}

            {!coverOf(project) && !project.code && (
                <section className="section pd-pending">
                    <span className="mono">{t('project.pending')}</span>
                </section>
            )}

            <TLink to={`/projects/${next.id}`} label={next.title[lang]} className="pd-next" data-cursor={t('cursor.view')}>
                <span className="eyebrow">{t('project.next')}</span>
                <span className="pd-next-title">{next.title[lang]}</span>
                <span className="pd-next-media" style={{ background: next.tone }}>
                    <Cover project={next} size="sm" />
                </span>
            </TLink>
        </main>
    )
}
