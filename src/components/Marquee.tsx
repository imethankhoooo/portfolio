import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import './Marquee.css'

/** Endless ticker that speeds up with scroll velocity and reverses with scroll direction. */
export default function Marquee({ items }: { items: string[] }) {
    const track = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const el = track.current
        if (!el || reducedMotion()) return
        const loop = gsap.to(el, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
        const st = ScrollTrigger.create({
            onUpdate: (self) => {
                const v = self.getVelocity() / 300
                gsap.to(loop, {
                    timeScale: gsap.utils.clamp(-8, 8, (self.direction || 1) * (1 + Math.abs(v))),
                    duration: 0.2,
                    overwrite: true,
                    onComplete: () => {
                        gsap.to(loop, { timeScale: self.direction || 1, duration: 1.2, ease: 'power2.out' })
                    },
                })
            },
        })
        return () => {
            st.kill()
            loop.kill()
        }
    }, [])

    const row = (
        <div className="marquee-row">
            {items.map((item) => (
                <span key={item} className="marquee-item">
                    {item}
                    <i aria-hidden="true" />
                </span>
            ))}
        </div>
    )

    return (
        <div className="marquee" aria-label={items.join(', ')}>
            <div className="marquee-track" ref={track} aria-hidden="true">
                {row}
                {row}
            </div>
        </div>
    )
}
