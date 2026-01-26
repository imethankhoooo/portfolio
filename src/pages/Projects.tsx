import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { projects } from '../data/projects'
import './Projects.css'

type FilterType = 'all' | 'live' | 'internal' | 'academic'

export default function Projects() {
    const { t, i18n } = useTranslation()
    const [filter, setFilter] = useState<FilterType>('all')
    const lang: 'en' | 'zh' = i18n.language?.startsWith('zh') ? 'zh' : 'en'

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.type === filter)

    const filters: { key: FilterType; label: string }[] = [
        { key: 'all', label: t('projects.filter_all') },
        { key: 'live', label: t('projects.filter_live') },
        { key: 'internal', label: t('projects.filter_internal') },
        { key: 'academic', label: t('projects.filter_academic') },
    ]

    return (
        <main className="projects-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="page-title">
                        <span className="gradient-text">{t('projects.title')}</span>
                    </h1>
                    <p className="page-subtitle">{t('projects.subtitle')}</p>
                </header>

                <div className="filter-tabs">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            className={`filter-tab ${filter === f.key ? 'active' : ''}`}
                            onClick={() => setFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project) => (
                        <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="project-card"
                        >
                            <div className="project-image" style={{ background: project.gradient }}>
                                {project.image ? (
                                    <img src={project.image} alt={project.title[lang]} />
                                ) : (
                                    <div className="project-image-bg">{project.title[lang].charAt(0)}</div>
                                )}
                                <div className="project-overlay" />
                                <span className={`project-type-badge badge-${project.type}`}>
                                    {t(`projects.badge_${project.type}`)}
                                </span>
                            </div>
                            <div className="project-content">
                                <div className="project-tags">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="project-title">{project.title[lang]}</h3>
                                <p className="project-description">{project.description[lang]}</p>
                                <span className="project-link">
                                    {t('projects.view_project')}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
