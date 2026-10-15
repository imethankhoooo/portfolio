import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SmoothScroll, { useLenis } from './components/SmoothScroll'
import { TransitionProvider } from './components/Transition'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import { IntroContext } from './lib/intro'
import { ScrollTrigger } from './lib/gsap'

/** Reset scroll and re-measure scroll triggers whenever the route changes (incl. back/forward). */
function RouteEffects() {
    const { pathname } = useLocation()
    const lenis = useLenis()

    useEffect(() => {
        const toTop = () => {
            lenis?.scrollTo(0, { immediate: true, force: true })
            window.scrollTo(0, 0)
        }
        toTop()
        // ScrollTrigger remembers scroll positions per page; forget them so a refresh can't jump back.
        ScrollTrigger.clearScrollMemory('manual')
        const id = requestAnimationFrame(() => {
            ScrollTrigger.refresh()
            toTop()
        })
        return () => cancelAnimationFrame(id)
    }, [pathname, lenis])

    return null
}

function Shell() {
    const { pathname } = useLocation()
    const { i18n } = useTranslation()
    const [introDone, setIntroDone] = useState(false)

    useEffect(() => {
        document.documentElement.lang = i18n.language?.startsWith('zh') ? 'zh' : 'en'
        // Line breaks move when the language changes.
        requestAnimationFrame(() => ScrollTrigger.refresh())
    }, [i18n.language])

    return (
        <IntroContext.Provider value={introDone}>
            <TransitionProvider>
                <RouteEffects />
                <Preloader onDone={() => setIntroDone(true)} />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/index.html" element={<Navigate to="/" replace />} />
                    <Route path="/projects" element={<Work />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                {pathname !== '/contact' && <Footer />}
                <Cursor />
                <div className="grain" aria-hidden="true" />
            </TransitionProvider>
        </IntroContext.Provider>
    )
}

export default function App() {
    return (
        <SmoothScroll>
            <Shell />
        </SmoothScroll>
    )
}
