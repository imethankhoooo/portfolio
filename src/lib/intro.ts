import { createContext, useContext } from 'react'

/** True once the preloader has finished (or was skipped), so the hero can animate in. */
export const IntroContext = createContext(false)
export const useIntroDone = () => useContext(IntroContext)
