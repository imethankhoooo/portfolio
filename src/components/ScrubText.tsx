import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/gsap'
import { useLang } from '../lib/lang'
import './ScrubText.css'

export type Part = { text: string; accent?: boolean }

/** A statement whose words light up one by one as it scrolls through the viewport. */
export default function ScrubText({ parts, className = '' }: { parts: Part[]; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null)
    const lang = useLang()

    useLayoutEffect(() => {
        const el = ref.current
        if (!el || reducedMotion()) return
        const ctx = gsap.context(() => {
            gsap.fromTo(
                el.querySelectorAll('.scrub-token'),
                { opacity: 0.14 },
                {
                    opacity: 1,
                    ease: 'none',
                    stagger: 0.1,
                    scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
                },
            )
        }, el)
        return () => ctx.revert()
    }, [parts, lang])

    // English splits on spaces; Chinese on characters.
    const tokenize = (text: string) => (lang === 'zh' ? Array.from(text) : text.split(/(\s+)/))

    return (
        <p className={`scrub-text ${className}`} ref={ref}>
            {parts.map((part, pi) => (
                <span key={pi} className={part.accent ? 'scrub-accent' : undefined}>
                    {tokenize(part.text).map((tok, ti) =>
                        /^\s+$/.test(tok) ? tok : <span key={ti} className="scrub-token">{tok}</span>,
                    )}
                </span>
            ))}
        </p>
    )
}
