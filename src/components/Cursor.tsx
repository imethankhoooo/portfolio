import { useEffect, useRef } from 'react'
import { gsap, isTouch } from '../lib/gsap'
import './Cursor.css'

/**
 * A small dot that follows the pointer. Over anything with `data-cursor="Label"`
 * it grows into a pill carrying that label; over plain links it just swells.
 */
export default function Cursor() {
    const root = useRef<HTMLDivElement>(null)
    const text = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (isTouch() || !root.current) return
        const el = root.current
        document.documentElement.classList.add('has-cursor')

        const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })

        const move = (e: PointerEvent) => {
            xTo(e.clientX)
            yTo(e.clientY)
            el.classList.add('is-visible')
        }

        const over = (e: PointerEvent) => {
            const target = e.target as HTMLElement
            const labelled = target.closest<HTMLElement>('[data-cursor]')
            const link = target.closest('a, button, [role="button"], input, label')
            if (labelled) {
                if (text.current) text.current.textContent = labelled.dataset.cursor ?? ''
                el.dataset.state = 'label'
            } else if (link) {
                el.dataset.state = 'link'
            } else {
                el.dataset.state = ''
            }
        }

        const leave = () => el.classList.remove('is-visible')
        const down = () => el.classList.add('is-down')
        const up = () => el.classList.remove('is-down')

        window.addEventListener('pointermove', move)
        document.addEventListener('pointerover', over)
        document.addEventListener('pointerleave', leave)
        window.addEventListener('pointerdown', down)
        window.addEventListener('pointerup', up)

        return () => {
            document.documentElement.classList.remove('has-cursor')
            window.removeEventListener('pointermove', move)
            document.removeEventListener('pointerover', over)
            document.removeEventListener('pointerleave', leave)
            window.removeEventListener('pointerdown', down)
            window.removeEventListener('pointerup', up)
        }
    }, [])

    return (
        <div className="cursor" ref={root} aria-hidden="true">
            <div className="cursor-body">
                <span className="cursor-text" ref={text} />
            </div>
        </div>
    )
}
