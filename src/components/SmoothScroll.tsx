import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

/** Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null)
    const raf = useRef<(time: number) => void>(undefined)

    useEffect(() => {
        if (reducedMotion()) return

        const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
        instance.on('scroll', ScrollTrigger.update)
        raf.current = (time: number) => instance.raf(time * 1000)
        gsap.ticker.add(raf.current)
        gsap.ticker.lagSmoothing(0)
        setLenis(instance)

        return () => {
            if (raf.current) gsap.ticker.remove(raf.current)
            instance.destroy()
            setLenis(null)
        }
    }, [])

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
