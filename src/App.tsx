import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import MobileNav from './components/MobileNav'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'

function App() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <>
            {!isMobile && <CustomCursor />}
            <Background />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/index.html" element={<Navigate to="/" replace />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {isMobile && <MobileNav />}
        </>
    )
}

export default App
