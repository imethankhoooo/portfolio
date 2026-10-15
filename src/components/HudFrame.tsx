import { useEffect, useRef } from 'react'
import './HudFrame.css'

/** Fixed heads-up overlay: viewport corner brackets and a scroll ruler on the left edge. */
export default function HudFrame() {
    const ruler = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let frame = 0
        const scroll = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                if (ruler.current) ruler.current.style.transform = `translateY(${-(window.scrollY * 0.25) % 40}px)`
            })
        }
        scroll()
        window.addEventListener('scroll', scroll, { passive: true })
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('scroll', scroll)
        }
    }, [])

    return (
        <div className="hud" aria-hidden="true">
            <i className="hud-corner tl" />
            <i className="hud-corner tr" />
            <i className="hud-corner bl" />
            <i className="hud-corner br" />

            <div className="hud-ruler">
                <div className="hud-ruler-track" ref={ruler} />
            </div>
        </div>
    )
}
