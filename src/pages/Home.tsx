import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getFeaturedProjects } from '../data/projects'
import './Home.css'

export default function Home() {
    const { t, i18n } = useTranslation()
    const featuredProjects = getFeaturedProjects()
    // Handle language codes like 'en-US' or 'zh-CN' by extracting the base language
    const lang: 'en' | 'zh' = i18n.language?.startsWith('zh') ? 'zh' : 'en'


    const techStack = [
        'Laravel', 'React', 'Flutter', 'Node.js', 'Python',
        'AI Coding', 'MCP', 'LangChain', 'n8n Agents'
    ]

    return (
        <main>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-tag">
                            <span className="status-dot" />
                            <span>{t('hero.status')}</span>
                        </div>

                        <h1 className="hero-title">
                            <span className="line"><span>{t('hero.greeting')}</span></span>
                            <span className="line"><span className="gradient-text">{t('hero.name')}</span></span>
                            <span className="line"><span>{t('hero.title')}</span></span>
                        </h1>

                        <p className="hero-tagline">{t('hero.tagline')}</p>
                        <p className="hero-description">{t('hero.description')}</p>

                        <div className="cta-group">
                            <Link to="/projects" className="btn btn-primary">
                                <span>{t('hero.cta_projects')}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link to="/contact" className="btn btn-glass">
                                <span>{t('hero.cta_contact')}</span>
                            </Link>
                        </div>
                    </div>

                    <div className="hero-card glass-card">
                        <div className="card-header">
                            <div className="avatar-ring">
                                <div className="avatar">E</div>
                            </div>
                            <div className="card-info">
                                <h3>{t('card.name')}</h3>
                                <p>{t('card.role')}</p>
                                <div className="location">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>{t('card.location')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="tech-stack">
                            {techStack.map((tech) => (
                                <span key={tech} className="tech-item">{tech}</span>
                            ))}
                        </div>

                        <div className="card-stats">
                            <div className="stat">
                                <div className="stat-value">{t('card.years')}</div>
                                <div className="stat-label">{t('card.years_label')}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">{t('card.projects')}</div>
                                <div className="stat-label">{t('card.projects_label')}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">{t('card.skills')}</div>
                                <div className="stat-label">{t('card.skills_label')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <span className="scroll-text">{t('common.scroll_down')}</span>
                    <div className="scroll-line" />
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="featured-section">
                <div className="section-container">
                    <h2 className="section-heading">{t('featured.title')}</h2>
                    <p className="section-desc">{t('featured.description')}</p>

                    <div className="featured-grid">
                        {featuredProjects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className="featured-card"
                            >
                                <div className="featured-image" style={{ background: project.gradient }}>
                                    <div className="featured-image-bg">{project.title[lang].charAt(0)}</div>
                                </div>
                                <div className="featured-content">
                                    <div className="featured-tags">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="tech-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="featured-title">{project.title[lang]}</h3>
                                    <p className="featured-desc">{project.description[lang]}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="featured-cta">
                        <Link to="/projects" className="btn btn-glass">
                            {t('featured.view_all')}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
