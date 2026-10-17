import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const reducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches

export const EASE = 'expo.out'
export const EASE_INOUT = 'expo.inOut'

export { gsap, ScrollTrigger, SplitText }
