import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Scramble from '../components/Scramble'
import ProjectIndex from '../components/ProjectIndex'
import ProjectCard from '../components/ProjectCard'
import { projects, type ProjectType } from '../data/projects'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { useTitle } from '../lib/useTitle'
import './Work.css'

type Filter = 'all' | ProjectType
type View = 'list' | 'grid'

const FILTERS: Filter[] = ['all', 'live', 'internal', 'personal', 'academic']

export default function Work() {
    const { t } = useTranslation()
    const [filter, setFilter] = useState<Filter>('all')
    const [view, setView] = useState<View>('grid')
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
            el.querySelectorAll('.pindex-row, .pcard'),
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
                <h1 className="page-title">
                    <Scramble text={t('work.title')} trigger="mount" duration={1000} delay={250} />
                    <sup>({String(projects.length).padStart(2, '0')})</sup>
                </h1>
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
                        {(['grid', 'list'] as View[]).map((v) => (
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
                                <ProjectCard key={p.id} project={p} no={numberOf(p.id)} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
