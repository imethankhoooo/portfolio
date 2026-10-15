import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Scramble from '../components/Scramble'
import ProjectIndex from '../components/ProjectIndex'
import Cover from '../components/Cover'
import { TLink } from '../components/Transition'
import { projects, type ProjectType } from '../data/projects'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { useLang } from '../lib/lang'
import { useTitle } from '../lib/useTitle'
import './Work.css'

type Filter = 'all' | ProjectType
type View = 'list' | 'grid'

const FILTERS: Filter[] = ['all', 'live', 'internal', 'academic']

export default function Work() {
    const { t } = useTranslation()
    const lang = useLang()
    const [filter, setFilter] = useState<Filter>('all')
    const [view, setView] = useState<View>('list')
    const results = useRef<HTMLDivElement>(null)
    useTitle(t('work.title'))

    const items = filter === 'all' ? projects : projects.filter((p) => p.type === filter)
    const count = (f: Filter) => (f === 'all' ? projects.length : projects.filter((p) => p.type === f).length)
    // Keep each project's global number so filtering doesn't renumber the archive.
    const numberOf = (id: string) => String(projects.findIndex((p) => p.id === id) + 1).padStart(2, '0')

    useLayoutEffect(() => {
        const el = results.current
        if (!el) return
        ScrollTrigger.refresh()
        if (reducedMotion()) return
        const tween = gsap.fromTo(
            el.querySelectorAll('.pindex-row, .wgrid-card'),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.04 },
        )
        return () => {
            tween.kill()
        }
    }, [filter, view])

    return (
        <main className="page work">
            <header className="page-hero" data-shape="lattice">
                <Scramble as="h1" className="page-title" text={t('work.title')} trigger="mount" duration={1000} delay={250} />
                <div className="page-intro grid-12">
                    <span className="eyebrow">{t('work.label')} ({String(projects.length).padStart(2, '0')})</span>
                    <p>{t('work.intro')}</p>
                </div>
            </header>

            <section className="section work-body">
                <div className="work-controls">
                    <div className="work-filters" role="tablist">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                role="tab"
                                aria-selected={filter === f}
                                className={`chip${filter === f ? ' is-active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f === 'all' ? t('work.all') : t(`type.${f}`)}
                                <sup>{String(count(f)).padStart(2, '0')}</sup>
                            </button>
                        ))}
                    </div>
                    <div className="work-view">
                        {(['list', 'grid'] as View[]).map((v) => (
                            <button key={v} className={view === v ? 'is-active' : ''} onClick={() => setView(v)}>
                                {t(`work.${v}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={results}>
                    {view === 'list' ? (
                        <ProjectIndex items={items} numbering={(p) => numberOf(p.id)} />
                    ) : (
                        <div className="wgrid">
                            {items.map((p) => (
                                <TLink
                                    key={p.id}
                                    to={`/projects/${p.id}`}
                                    label={p.title[lang]}
                                    className="wgrid-card"
                                    data-cursor={t('cursor.view')}
                                >
                                    <div className="wgrid-media" style={{ background: p.tone }}>
                                        <Cover project={p} size="sm" />
                                    </div>
                                    <div className="wgrid-meta">
                                        <span className="mono">{numberOf(p.id)}</span>
                                        <h3>{p.title[lang]}</h3>
                                        <span className="mono wgrid-type">{t(`type.${p.type}`)}</span>
                                    </div>
                                    <p className="wgrid-summary">{p.summary[lang]}</p>
                                </TLink>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
