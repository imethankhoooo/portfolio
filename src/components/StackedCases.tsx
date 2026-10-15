import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import { gsap, reducedMotion } from '../lib/gsap'
import { useLang } from '../lib/lang'
import { TLink } from './Transition'
import Cover from './Cover'
import './StackedCases.css'

/**
 * Full-screen case cards that pin and stack: as the next card slides over,
 * the one beneath it recedes (scales down and dims).
 */
export default function StackedCases({ items }: { items: Project[] }) {
    const { t } = useTranslation()
    const lang = useLang()
    const root = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const el = root.current
        if (!el || reducedMotion()) return
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.case')
            cards.forEach((card, i) => {
                const inner = card.querySelector('.case-inner')
                const media = card.querySelector('.case-media-inner')

                gsap.fromTo(media, { yPercent: -6 }, {
                    yPercent: 6,
                    ease: 'none',
                    scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
                })

                const next = cards[i + 1]
                if (!next) return
                gsap.to(inner, {
                    scale: 0.9,
                    filter: 'brightness(0.35)',
                    borderRadius: 18,
                    ease: 'none',
                    scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
                })
            })
        }, el)
        return () => ctx.revert()
    }, [items])

    return (
        <div className="cases" ref={root}>
            {items.map((p, i) => (
                <article className="case" key={p.id}>
                    <TLink
                        to={`/projects/${p.id}`}
                        label={p.title[lang]}
                        className="case-inner frame"
                        style={{ background: `linear-gradient(135deg, ${p.tone}e6, rgba(4, 7, 11, 0.92) 70%)` }}
                        data-cursor={t('cursor.open')}
                    >
                        <header className="case-top">
                            <span className="case-file">
                                FILE_{String(i + 1).padStart(2, '0')}
                                <em>/{String(items.length).padStart(2, '0')}</em>
                            </span>
                            <span className={`case-status is-${p.type}`}>
                                <i /> {t(`type.${p.type}`)}
                            </span>
                            <span className="case-role">{p.role[lang]}</span>
                        </header>

                        <h3 className="case-title">{p.title[lang]}</h3>

                        <div className="case-body">
                            <div className="case-copy">
                                <p className="case-summary">{p.summary[lang]}</p>
                                <ul className="case-stack">
                                    {p.stack.map((s) => (
                                        <li key={s}>{s}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="case-media">
                                <div className="case-chrome" aria-hidden="true">
                                    <i /><i /><i />
                                    <span>{p.link ? new URL(p.link).hostname.replace(/^www\./, '') : `${p.id}.internal`}</span>
                                </div>
                                <div className="case-media-frame">
                                    <div className="case-media-inner">
                                        <Cover project={p} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TLink>
                </article>
            ))}
        </div>
    )
}
