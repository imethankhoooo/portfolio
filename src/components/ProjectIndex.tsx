import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import { gsap, isTouch } from '../lib/gsap'
import { useLang } from '../lib/lang'
import { TLink } from './Transition'
import Cover from './Cover'
import './ProjectIndex.css'

/**
 * Archive-style list of projects. On pointer devices a preview of the hovered
 * project floats beside the cursor and tilts with its horizontal velocity.
 */
export default function ProjectIndex({ items, numbering }: { items: Project[]; numbering?: (p: Project) => string }) {
    const { t } = useTranslation()
    const lang = useLang()
    const preview = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState<string | null>(null)

    useEffect(() => {
        const el = preview.current
        if (!el || isTouch()) return
        const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' })
        const rTo = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3' })
        let lastX = 0

        const move = (e: PointerEvent) => {
            const flip = e.clientX > window.innerWidth * 0.55
            xTo(flip ? e.clientX - el.offsetWidth - 24 : e.clientX + 24)
            yTo(e.clientY)
            rTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4))
            lastX = e.clientX
        }
        window.addEventListener('pointermove', move)
        return () => window.removeEventListener('pointermove', move)
    }, [])

    return (
        <div className="pindex" onPointerLeave={() => setActive(null)}>
            <div className="pindex-head" aria-hidden="true">
                <span>No.</span>
                <span>{t('index.project')}</span>
                <span>{t('index.category')}</span>
                <span>{t('index.stack')}</span>
                <span />
            </div>

            <ul className="pindex-list">
                {items.map((p, i) => (
                    <li key={p.id}>
                        <TLink
                            to={`/projects/${p.id}`}
                            label={p.title[lang]}
                            className="pindex-row"
                            data-cursor={t('cursor.view')}
                            onPointerEnter={() => setActive(p.id)}
                        >
                            <span className="pindex-no">{numbering ? numbering(p) : String(i + 1).padStart(2, '0')}</span>
                            <span className="pindex-title">{p.title[lang]}</span>
                            <span className="pindex-cat">{t(`type.${p.type}`)}</span>
                            <span className="pindex-stack">{p.stack.slice(0, 3).join(', ')}</span>
                            <span className="pindex-arrow" aria-hidden="true">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M7 17 17 7M8 7h9v9" />
                                </svg>
                            </span>
                        </TLink>
                    </li>
                ))}
            </ul>

            <div className={`pindex-preview${active ? ' is-on' : ''}`} ref={preview} aria-hidden="true">
                <div className="pindex-preview-inner">
                    {items.map((p) => (
                        <div key={p.id} className={`pindex-slide${active === p.id ? ' is-active' : ''}`}>
                            <Cover project={p} size="sm" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
