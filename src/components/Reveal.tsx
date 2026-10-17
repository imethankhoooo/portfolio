import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText, reducedMotion } from '../lib/gsap'
import { useLang } from '../lib/lang'

type Props = {
    as?: ElementType
    className?: string
    children: ReactNode
    /** Start immediately instead of waiting for the element to scroll into view */
    immediate?: boolean
    delay?: number
}

/**
 * Masked line-by-line text reveal. Chinese has no spaces between words, so it
 * is split by character first to let SplitText find the line breaks.
 */
export default function Reveal({ as: Tag = 'div', className, children, immediate = false, delay = 0 }: Props) {
    const ref = useRef<HTMLElement>(null)
    const lang = useLang()
    // Re-split only when the words change, not on every parent render.
    const textKey = typeof children === 'string' ? children : ''

    useLayoutEffect(() => {
        const el = ref.current
        if (!el || reducedMotion()) return

        const split = SplitText.create(el, {
            type: lang === 'zh' ? 'chars,lines' : 'words,lines',
            mask: 'lines',
            linesClass: 'reveal-line',
            autoSplit: true,
            onSplit: (self) =>
                gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1.1,
                    ease: 'expo.out',
                    stagger: 0.08,
                    delay,
                    scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
                }),
        })

        return () => split.revert()
    }, [lang, textKey, immediate, delay])

    return (
        <Tag ref={ref} className={className}>
            {children}
        </Tag>
    )
}
