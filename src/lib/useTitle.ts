import { useEffect } from 'react'

export function useTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} — Ethan Khoo` : 'Ethan Khoo — Full-stack Developer & System Builder'
    }, [title])
}
