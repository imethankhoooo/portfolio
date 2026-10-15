import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, isTouch, reducedMotion } from '../lib/gsap'
import './KineticName.css'

const REST = { wght: 820, wdth: 74 }
const NEAR = { wght: 120, wdth: 62 }
const RADIUS = 0.22 // fraction of viewport width over which a letter reacts

/**
 * Viewport-wide name set in a variable font. Letters near the pointer thin out
 * and condense; the line is justified so its outer edges never move.
 */
export default function KineticName({ text, play }: { text: string; play: boolean }) {
    const root = useRef<HTMLHeadingElement>(null)
    const [stacked, setStacked] = useState(false)

    // One line on wide screens, one word per line on narrow ones.
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 700px)')
        const update = () => setStacked(mq.matches)
        update()
        mq.addEventListener('change', update)
        return () => mq.removeEventListener('change', update)
    }, [])

    const lines = stacked ? text.split(' ') : [text]

    // Size each line so it spans the container exactly.
    useLayoutEffect(() => {
        const el = root.current
        if (!el) return
        const fit = () => {
            el.querySelectorAll<HTMLElement>('.kn-line').forEach((line) => {
                line.style.fontSize = '100px'
                line.style.width = 'max-content'
                const natural = line.getBoundingClientRect().width
                line.style.fontSize = `${(el.clientWidth / natural) * 100 * 0.995}px`
                line.style.width = ''
            })
        }
        fit()
        // Re-fit once the display face has actually loaded (fonts.ready can resolve before it starts).
        document.fonts?.load('820 100px Archivo').then(fit, () => {})
        document.fonts?.addEventListener('loadingdone', fit)
        const ro = new ResizeObserver(fit)
        ro.observe(el)
        return () => {
            ro.disconnect()
            document.fonts?.removeEventListener('loadingdone', fit)
        }
    }, [stacked])

    // Pointer-driven variable axes.
    useEffect(() => {
        const el = root.current
        if (!el || reducedMotion()) return
        const letters = Array.from(el.querySelectorAll<HTMLElement>('.kn-letter'))
        const state = letters.map(() => ({ t: 0 }))
        const pointer = { x: -9999, y: -9999 }

        const apply = (i: number) => {
            const t = state[i].t
            const wght = REST.wght + (NEAR.wght - REST.wght) * t
            const wdth = REST.wdth + (NEAR.wdth - REST.wdth) * t
            letters[i].style.fontVariationSettings = `"wght" ${wght.toFixed(0)}, "wdth" ${wdth.toFixed(1)}`
        }

        const update = () => {
            const radius = window.innerWidth * RADIUS
            letters.forEach((letter, i) => {
                const r = letter.getBoundingClientRect()
                const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2))
                const target = Math.max(0, 1 - d / radius) ** 1.6
                gsap.to(state[i], { t: target, duration: 0.6, ease: 'power3.out', overwrite: true, onUpdate: () => apply(i) })
            })
        }

        if (isTouch()) {
            // No pointer: let a slow wave travel through the letters instead.
            const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: 2.4 })
            state.forEach((s, i) => {
                tl.to(s, { t: 1, duration: 1.1, ease: 'sine.inOut', onUpdate: () => apply(i) }, i * 0.12)
                tl.to(s, { t: 0, duration: 1.1, ease: 'sine.inOut', onUpdate: () => apply(i) }, i * 0.12 + 1.1)
            })
            return () => {
                tl.kill()
            }
        }

        let frame = 0
        const move = (e: PointerEvent) => {
            pointer.x = e.clientX
            pointer.y = e.clientY
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(update)
        }
        const leave = () => {
            pointer.x = pointer.y = -9999
            update()
        }
        window.addEventListener('pointermove', move)
        document.addEventListener('pointerleave', leave)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('pointermove', move)
            document.removeEventListener('pointerleave', leave)
        }
    }, [stacked])

    // Entrance.
    useLayoutEffect(() => {
        const el = root.current
        if (!el) return
        const letters = el.querySelectorAll('.kn-letter')
        if (!play) {
            gsap.set(letters, { yPercent: 105 })
            return
        }
        const tween = gsap.fromTo(
            letters,
            { yPercent: 105 },
            { yPercent: 0, duration: reducedMotion() ? 0 : 1.3, ease: 'expo.out', stagger: 0.045 },
        )
        return () => {
            tween.kill()
        }
    }, [play, stacked])

    return (
        <h1 className="kinetic-name" ref={root} aria-label={text}>
            {lines.map((line) => (
                <span className="kn-line" key={line} aria-hidden="true">
                    {line.split('').map((ch, i) =>
                        ch === ' ' ? (
                            <span className="kn-space" key={i} />
                        ) : (
                            <span className="kn-mask" key={i}>
                                <span className="kn-letter">{ch}</span>
                            </span>
                        ),
                    )}
                </span>
            ))}
        </h1>
    )
}
