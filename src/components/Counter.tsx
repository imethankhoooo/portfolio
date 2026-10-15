import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/gsap'

const fmt = (n: number, pad: number) => {
    const s = Math.round(n).toLocaleString('en-US')
    return pad ? s.padStart(pad, '0') : s
}

/** Counts up from zero the first time it scrolls into view. */
export default function Counter({ value, pad = 0, suffix = '' }: { value: number; pad?: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)

    useLayoutEffect(() => {
        const el = ref.current
        if (!el || reducedMotion()) return
        const state = { v: 0 }
        el.textContent = fmt(0, pad) + suffix
        const tween = gsap.to(state, {
            v: value,
            duration: 2,
            ease: 'expo.out',
            onUpdate: () => {
                el.textContent = fmt(state.v, pad) + suffix
            },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
        }
    }, [value, pad, suffix])

    return <span ref={ref}>{fmt(value, pad) + suffix}</span>
}
