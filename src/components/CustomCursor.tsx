import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const dotRef = useRef<HTMLDivElement>(null)
    const pos = useRef({ x: 0, y: 0, cursorX: 0, cursorY: 0, dotX: 0, dotY: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            pos.current.x = e.clientX
            pos.current.y = e.clientY
        }

        const handleMouseEnter = () => {
            cursorRef.current?.classList.add('hover')
        }

        const handleMouseLeave = () => {
            cursorRef.current?.classList.remove('hover')
        }

        const animate = () => {
            const { x, y } = pos.current
            pos.current.cursorX += (x - pos.current.cursorX) * 0.1
            pos.current.cursorY += (y - pos.current.cursorY) * 0.1
            pos.current.dotX += (x - pos.current.dotX) * 0.25
            pos.current.dotY += (y - pos.current.dotY) * 0.25

            if (cursorRef.current) {
                cursorRef.current.style.left = `${pos.current.cursorX - 12}px`
                cursorRef.current.style.top = `${pos.current.cursorY - 12}px`
            }
            if (dotRef.current) {
                dotRef.current.style.left = `${pos.current.dotX - 3}px`
                dotRef.current.style.top = `${pos.current.dotY - 3}px`
            }
            requestAnimationFrame(animate)
        }

        document.addEventListener('mousemove', handleMouseMove)

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .glass-card, .project-card, .tech-tag')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter)
            el.addEventListener('mouseleave', handleMouseLeave)
        })

        const animationId = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter)
                el.removeEventListener('mouseleave', handleMouseLeave)
            })
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <>
            <div ref={cursorRef} className="cursor" />
            <div ref={dotRef} className="cursor-dot" />
        </>
    )
}
