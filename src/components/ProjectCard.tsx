import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import { asset } from '../lib/asset'
import { useLang } from '../lib/lang'
import { isTouch } from '../lib/gsap'
import { TLink } from './Transition'
import Cover from './Cover'
import './ProjectCard.css'

/**
 * A project at a glance: screenshot first, then name, one line, stack.
 * Projects with a demo recording play it (muted) while hovered.
 */
export default function ProjectCard({ project: p, size = 'lg', no, eager = false }: { project: Project; size?: 'lg' | 'sm'; no?: string; eager?: boolean }) {
    const { t } = useTranslation()
    const lang = useLang()
    const video = useRef<HTMLVideoElement>(null)
    const [playing, setPlaying] = useState(false)
    const domain = p.link ? new URL(p.link).hostname.replace(/^www\./, '') : null

    const play = () => {
        const v = video.current
        if (!v || isTouch()) return
        v.play().catch(() => {})
    }
    const stop = () => {
        const v = video.current
        if (!v) return
        v.pause()
        setPlaying(false)
    }

    return (
        <article className={`pcard pcard-${size}`} onPointerEnter={play} onPointerLeave={stop}>
            <TLink to={`/projects/${p.id}`} label={p.title[lang]} className="pcard-link" data-cursor={t('cursor.view')}>
                <div className="pcard-media" style={{ background: p.tone }}>
                    <Cover project={p} size={size === 'lg' ? 'lg' : 'sm'} eager={eager} card />
                    {p.video && (
                        <video
                            ref={video}
                            className={`pcard-video${playing ? ' is-playing' : ''}`}
                            src={asset(p.video.src)}
                            poster={asset(p.video.poster)}
                            onPlaying={() => setPlaying(true)}
                            muted
                            loop
                            playsInline
                            preload="none"
                            aria-hidden="true"
                        />
                    )}
                    {p.video && (
                        <span className="pcard-demo">
                            ▶ <span className="on-hover">{t('project.demo_hover')}</span>
                            <span className="on-touch">{t('project.demo_touch')}</span>
                        </span>
                    )}
                </div>

                <div className="pcard-body">
                    <div className="pcard-meta">
                        <span className={`pcard-status is-${p.type}`}>
                            <i /> {t(`type.${p.type}`)}
                        </span>
                        <span className="pcard-context">{p.context[lang]}</span>
                    </div>
                    <div className="pcard-head">
                        {no && <span className="pcard-no">{no}</span>}
                        <h3 className="pcard-title">{p.title[lang]}</h3>
                        <span className="pcard-arrow" aria-hidden="true">→</span>
                    </div>
                    <p className="pcard-summary">{p.summary[lang]}</p>
                    <ul className="pcard-tags">
                        {p.stack.slice(0, size === 'lg' ? 5 : 3).map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
            </TLink>

            {domain && size === 'lg' && (
                <a className="pcard-live" href={p.link} target="_blank" rel="noopener noreferrer">
                    {t('project.visit')} ↗ <span>{domain}</span>
                </a>
            )}
        </article>
    )
}
