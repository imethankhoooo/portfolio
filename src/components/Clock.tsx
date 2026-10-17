import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

const format = new Intl.DateTimeFormat('en-GB', {
    timeZone: profile.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
})

/** Live local time in Kuala Lumpur — tells visitors when a reply is likely. */
export default function Clock({ seconds = true }: { seconds?: boolean }) {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 1000)
        return () => window.clearInterval(id)
    }, [])

    const text = format.format(now)
    return <time className="clock">{seconds ? text : text.slice(0, 5)}</time>
}
