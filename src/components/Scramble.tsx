import { useEffect, useRef, type ElementType } from 'react'
import { reducedMotion } from '../lib/gsap'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>_[]{}'

type Props = {
    text: string
    as?: ElementType
    className?: string
    /** mount: on first render · view: first time it scrolls into view · hover: whenever its parent is hovered */
    trigger?: 'mount' | 'view' | 'hover'
    /** For `mount`: hold (invisible) until this turns true */
    play?: boolean
    duration?: number
    delay?: number
}

/**
 * Text that "decodes": every character cycles through random glyphs and locks
 * into place left to right, like a terminal resolving a transmission.
 */
export default function Scramble({ text, as: Tag = 'span', className, trigger = 'view', play = true, duration = 900, delay = 0 }: Props) {
    const ref = useRef<HTMLElement>(null)
    const raf = useRef(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        el.textContent = text
        if (reducedMotion()) {
            el.style.visibility = ''
            return
        }

        const run = () => {
            cancelAnimationFrame(raf.current)
            const chars = Array.from(text)
            const lockAt = chars.map((_, i) => (i / Math.max(chars.length, 1)) * 0.7 + Math.random() * 0.3)
            let start = 0
            const frame = (now: number) => {
                if (!start) start = now + delay
                const p = (now - start) / duration
                if (p < 0) {
                    raf.current = requestAnimationFrame(frame)
                    return
                }
                el.style.visibility = ''
                el.textContent = chars
                    .map((c, i) => (c === ' ' || p >= lockAt[i] ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
                    .join('')
                if (p < 1) raf.current = requestAnimationFrame(frame)
                else el.textContent = text
            }
            raf.current = requestAnimationFrame(frame)
        }

        if (trigger === 'mount') {
            if (!play) {
                el.style.visibility = 'hidden'
                return
            }
            run()
        } else if (trigger === 'view') {
            const io = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        run()
                        io.disconnect()
                    }
                },
                { rootMargin: '0px 0px -10% 0px' },
            )
            io.observe(el)
            return () => {
                io.disconnect()
                cancelAnimationFrame(raf.current)
            }
        } else {
            const target = el.parentElement
            target?.addEventListener('pointerenter', run)
            return () => {
                target?.removeEventListener('pointerenter', run)
                cancelAnimationFrame(raf.current)
            }
        }
        return () => cancelAnimationFrame(raf.current)
    }, [text, trigger, play, duration, delay])

    return (
        <Tag ref={ref} className={className} aria-label={text}>
            {text}
        </Tag>
    )
}
