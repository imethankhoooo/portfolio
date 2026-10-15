import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './HudFrame.css'

const pad = (n: number, len = 4) => String(Math.max(0, Math.round(n))).padStart(len, '0')

/**
 * Fixed heads-up overlay: viewport corner brackets, a scroll ruler on the left
 * edge and live telemetry (pointer position, scroll depth, current route).
 */
export default function HudFrame() {
    const xy = useRef<HTMLSpanElement>(null)
    const depth = useRef<HTMLSpanElement>(null)
    const ruler = useRef<HTMLDivElement>(null)
    const { pathname } = useLocation()

    useEffect(() => {
        const move = (e: PointerEvent) => {
            if (xy.current) xy.current.textContent = `X ${pad(e.clientX)} · Y ${pad(e.clientY)}`
        }
        let frame = 0
        const scroll = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                const max = document.documentElement.scrollHeight - window.innerHeight
                const p = max > 0 ? window.scrollY / max : 0
                if (depth.current) depth.current.textContent = `${pad(p * 100, 3)}%`
                if (ruler.current) ruler.current.style.transform = `translateY(${-(window.scrollY * 0.25) % 40}px)`
            })
        }
        scroll()
        window.addEventListener('pointermove', move)
        window.addEventListener('scroll', scroll, { passive: true })
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('pointermove', move)
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

            <div className="hud-telemetry hud-bl">
                <span>SYS.ONLINE</span>
                <span ref={xy}>X 0000 · Y 0000</span>
            </div>
            <div className="hud-telemetry hud-br">
                <span>{`ROUTE ${pathname === '/' ? '/HOME' : pathname.toUpperCase()}`}</span>
                <span>
                    DEPTH <b ref={depth}>000%</b>
                </span>
            </div>
        </div>
    )
}
