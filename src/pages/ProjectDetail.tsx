import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { getProjectById } from '../data/projects'
import './ProjectDetail.css'

export default function ProjectDetail() {
    const { t, i18n } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const lang: 'en' | 'zh' = i18n.language?.startsWith('zh') ? 'zh' : 'en'

    const project = getProjectById(id || '')

    if (!project) {
        return (
            <main className="project-detail-page">
                <div className="container">
                    <Link to="/projects" className="back-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        {t('projects.back_to_projects')}
                    </Link>
                    <div className="not-found">
                        <h1>Project Not Found</h1>
                        <p>The project you're looking for doesn't exist.</p>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="project-detail-page">
            <div className="container">
                <Link to="/projects" className="back-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    {t('projects.back_to_projects')}
                </Link>

                <header className="project-header">
                    <span className={`project-badge badge-${project.type}`}>
                        {t(`projects.badge_${project.type}`)}
                    </span>
                    <h1 className="project-title" style={{
                        background: project.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        {project.title[lang]}
                    </h1>
                    <p className="project-desc">{project.description[lang]}</p>
                    <div className="tech-tags">
                        {project.tags.map((tag) => (
                            <span key={tag} className="tech-tag">{tag}</span>
                        ))}
                    </div>
                </header>

                <div className="project-content">
                    <div
                        className="project-preview"
                        style={{ background: project.gradient }}
                    >
                        <div className="preview-letter">{project.title[lang].charAt(0)}</div>
                    </div>

                    {project.link && (
                        <div className="project-actions">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                {lang === 'zh' ? '访问网站' : 'Visit Website'}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
