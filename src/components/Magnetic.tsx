import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, isTouch } from '../lib/gsap'

/** Pulls its child toward the pointer while hovered, then springs back. */
export default function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el || isTouch()) return

        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })

        const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect()
            xTo((e.clientX - (r.left + r.width / 2)) * strength)
            yTo((e.clientY - (r.top + r.height / 2)) * strength)
        }
        const leave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
        }

        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
            el.removeEventListener('pointermove', move)
            el.removeEventListener('pointerleave', leave)
        }
    }, [strength])

    return (
        <span ref={ref} className="magnetic">
            {children}
        </span>
    )
}
