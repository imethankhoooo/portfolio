import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/gsap'
import { projects } from '../data/projects'
import './Preloader.css'

const SEEN_KEY = 'ek-booted'

function seenThisSession() {
    try {
        return sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
        return false
    }
}

const LINES = [
    ['EK-OS 2.6 // boot sequence', ''],
    ['mount /projects', `${String(projects.length).padStart(2, '0')} FOUND`],
    ['load modules  laravel · react · python · rag', 'OK'],
    ['init particle field', 'OK'],
    ['open channel  MYT / GMT+8', 'OK'],
]

/** First-visit boot sequence: log lines type out, a counter runs to 100, then the screen powers on. */
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
            /* storage unavailable: the boot plays again next time */
        }

        const counter = { v: 0 }
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(counter, {
                v: 100,
                duration: 2,
                ease: 'power1.inOut',
                onUpdate: () => {
                    if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
                },
            })
            tl.to('.boot-bar i', { scaleX: 1, duration: 2, ease: 'power1.inOut' }, 0)
            gsap.utils.toArray<HTMLElement>('.boot-line').forEach((line, i) => {
                tl.fromTo(line, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }, 0.15 + i * 0.32)
                tl.fromTo(line.querySelector('.boot-ok'), { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.4 + i * 0.32)
            })
            tl.to('.boot-granted', { opacity: 1, duration: 0.1, repeat: 3, yoyo: true }, '-=0.1')
            tl.add(() => done.current(), '+=0.05')
            // CRT power-on: the panel collapses to a bright line and vanishes
            tl.to(root.current, { clipPath: 'inset(49.8% 0% 49.8% 0%)', duration: 0.45, ease: 'expo.in' })
            tl.to(root.current, { clipPath: 'inset(49.8% 50% 49.8% 50%)', duration: 0.25, ease: 'expo.in' })
            tl.set(root.current, { display: 'none' })
        }, root)

        return () => ctx.revert()
    }, [skip])

    if (skip) return null

    return (
        <div className="boot" ref={root} aria-hidden="true">
            <div className="boot-log">
                {LINES.map(([cmd, ok]) => (
                    <div className="boot-line" key={cmd}>
                        <span className="boot-prompt">&gt;</span>
                        <span>{cmd}</span>
                        <span className="boot-dots" />
                        <span className="boot-ok">{ok}</span>
                    </div>
                ))}
                <div className="boot-granted">ACCESS GRANTED</div>
            </div>
            <div className="boot-foot">
                <span className="boot-count" ref={count}>000</span>
                <span className="boot-bar"><i /></span>
                <span className="boot-label">LOADING PORTFOLIO</span>
            </div>
        </div>
    )
}
