import { createContext, useCallback, useContext, useRef, type MouseEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, type LinkProps } from 'react-router-dom'
import { gsap, ScrollTrigger, EASE_INOUT, reducedMotion } from '../lib/gsap'
import { useLenis } from './SmoothScroll'
import './Transition.css'

type Go = (to: string, label?: string) => void

const TransitionContext = createContext<Go>(() => {})

export const useTransitionNavigate = () => useContext(TransitionContext)

/**
 * Page transition: a curtain rises over the page carrying the destination's name,
 * the route swaps underneath, then the curtain continues up and off-screen.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const location = useLocation()
    const lenis = useLenis()
    const curtain = useRef<HTMLDivElement>(null)
    const label = useRef<HTMLSpanElement>(null)
    const busy = useRef(false)

    const go = useCallback<Go>((to, text) => {
        if (busy.current || to === location.pathname) return

        const swap = () => {
            navigate(to)
            lenis?.scrollTo(0, { immediate: true, force: true })
            window.scrollTo(0, 0)
        }

        if (reducedMotion() || !curtain.current) {
            swap()
            return
        }

        busy.current = true
        if (label.current) label.current.textContent = text ?? ''
        lenis?.stop()

        gsap.timeline({
            onComplete: () => {
                busy.current = false
                lenis?.start()
            },
        })
            .set(curtain.current, { yPercent: 100, display: 'flex' })
            .set(label.current, { yPercent: 110 })
            .to(curtain.current, { yPercent: 0, duration: 0.7, ease: EASE_INOUT })
            .to(label.current, { yPercent: 0, duration: 0.5, ease: 'expo.out' }, '-=0.25')
            .add(() => {
                swap()
                // Give React a frame to commit the new page before measuring triggers.
                requestAnimationFrame(() => ScrollTrigger.refresh())
            })
            .to(label.current, { yPercent: -110, duration: 0.4, ease: 'expo.in' }, '+=0.1')
            .to(curtain.current, { yPercent: -100, duration: 0.8, ease: EASE_INOUT }, '-=0.15')
            .set(curtain.current, { display: 'none' })
    }, [lenis, location.pathname, navigate])

    return (
        <TransitionContext.Provider value={go}>
            {children}
            <div className="curtain" ref={curtain} aria-hidden="true">
                <span className="curtain-label-mask">
                    <span className="curtain-label" ref={label} />
                </span>
            </div>
        </TransitionContext.Provider>
    )
}

type TLinkProps = LinkProps & { to: string; label?: string }

/** Drop-in <Link> that plays the page transition. Modifier-clicks still open new tabs. */
export function TLink({ to, label, onClick, children, ...rest }: TLinkProps) {
    const go = useTransitionNavigate()

    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        go(to, label)
    }

    return (
        <Link to={to} onClick={handle} {...rest}>
            {children}
        </Link>
    )
}
