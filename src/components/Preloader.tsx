import { useEffect, useRef, useState } from 'react'
import { gsap, EASE_INOUT, reducedMotion } from '../lib/gsap'
import './Preloader.css'

const SEEN_KEY = 'ek-preloaded'

function seenThisSession() {
    try {
        return sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
        return false
    }
}

/** First-visit intro: a mono counter runs to 100, then the panel lifts away. */
export default function Preloader({ onDone }: { onDone: () => void }) {
    const [skip] = useState(() => reducedMotion() || seenThisSession())
    const root = useRef<HTMLDivElement>(null)
    const count = useRef<HTMLSpanElement>(null)
    const done = useRef(onDone)
    done.current = onDone

    useEffect(() => {
        if (skip) {
            done.current()
            return
        }
        try {
            sessionStorage.setItem(SEEN_KEY, '1')
        } catch {
            /* storage unavailable: the intro will simply play again */
        }

        const counter = { v: 0 }
        const ctx = gsap.context(() => {
            gsap.timeline()
                .to(counter, {
                    v: 100,
                    duration: 1.6,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
                    },
                })
                .to('.preloader-bar i', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
                .to('.preloader-row', { yPercent: -110, duration: 0.6, ease: 'expo.in', stagger: 0.04 }, '+=0.15')
                .add(() => done.current(), '-=0.1')
                .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: EASE_INOUT }, '-=0.1')
                .set(root.current, { display: 'none' })
        }, root)

        return () => ctx.revert()
    }, [skip])

    if (skip) return null

    return (
        <div className="preloader" ref={root} aria-hidden="true">
            <div className="preloader-top">
                <span className="preloader-mask"><span className="preloader-row">Ethan Khoo</span></span>
                <span className="preloader-mask"><span className="preloader-row">Portfolio ©2026</span></span>
            </div>
            <div className="preloader-bottom">
                <span className="preloader-mask">
                    <span className="preloader-row preloader-count" ref={count}>000</span>
                </span>
                <span className="preloader-bar"><i /></span>
            </div>
        </div>
    )
}
