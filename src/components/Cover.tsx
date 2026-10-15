import { coverOf, type Project } from '../data/projects'
import { asset } from '../lib/asset'
import { useLang } from '../lib/lang'
import './Cover.css'

/**
 * The visual for a project: its first screenshot, or its source code for
 * projects without a UI, or a typographic card while screenshots are pending.
 */
export default function Cover({ project, size = 'lg', eager = false }: { project: Project; size?: 'lg' | 'sm'; eager?: boolean }) {
    const lang = useLang()
    const src = coverOf(project, size)

    if (src) {
        return (
            <img
                className="cover cover-img"
                src={asset(src)}
                alt={project.title[lang]}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
            />
        )
    }

    if (project.code) {
        return (
            <div className="cover cover-code" style={{ background: project.tone }}>
                <pre>
                    <code>{project.code}</code>
                </pre>
            </div>
        )
    }

    const domain = project.link ? new URL(project.link).hostname.replace(/^www\./, '') : project.id
    return (
        <div className="cover cover-type" style={{ background: project.tone }}>
            <span className="cover-type-domain">{project.title[lang]}</span>
            <span className="cover-type-title">{domain}</span>
            <span className="cover-type-tags">{project.stack.join(' · ')}</span>
        </div>
    )
}
