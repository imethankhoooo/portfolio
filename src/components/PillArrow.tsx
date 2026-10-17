/** Arrow for `.pill` links: one copy slides out as the other slides in on hover. */
export default function PillArrow() {
    const arrow = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 12h16M14 6l6 6-6 6" />
        </svg>
    )
    return (
        <span className="pill-arrow" aria-hidden="true">
            {arrow}
            {arrow}
        </span>
    )
}
