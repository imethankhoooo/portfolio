import { useTranslation } from 'react-i18next'
import './Contact.css'

export default function Contact() {
    const { t, i18n } = useTranslation()
    const lang: 'en' | 'zh' = i18n.language?.startsWith('zh') ? 'zh' : 'en'

    const contactItems = [
        {
            icon: '📧',
            label: t('contact.email'),
            value: 'ethankhoo05@gmail.com',
            href: 'mailto:ethankhoo05@gmail.com'
        },
        {
            icon: '💬',
            label: t('contact.phone'),
            value: '+60 11-2610 0907',
            href: 'https://wa.me/601126100907'
        },
        {
            icon: '🐙',
            label: t('contact.github'),
            value: '@imethankhoooo',
            href: 'https://github.com/imethankhoooo'
        },
        {
            icon: '💼',
            label: t('contact.linkedin'),
            value: 'Tsui Ern Khoo',
            href: 'https://www.linkedin.com/in/tsui-ern-khoo/'
        },
    ]

    return (
        <main className="contact-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="page-title">
                        <span>{lang === 'zh' ? '联系' : 'Get in'}</span>{' '}
                        <span className="gradient-text">{lang === 'zh' ? '我' : 'Touch'}</span>
                    </h1>
                    <p className="page-subtitle">{t('contact.subtitle')}</p>
                </header>

                <div className="contact-grid">
                    {contactItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="contact-card glass-card"
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                            <span className="contact-icon">{item.icon}</span>
                            <div className="contact-info">
                                <span className="contact-label">{item.label}</span>
                                <span className="contact-value">{item.value}</span>
                            </div>
                            <div className="contact-arrow">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="cta-section">
                    <p className="cta-text">
                        {lang === 'zh' ? '准备开始项目？' : 'Ready to start a project?'}
                    </p>
                    <div className="cta-buttons">
                        <a href="mailto:ethankhoo05@gmail.com" className="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>{lang === 'zh' ? '发送邮件' : 'Send Email'}</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}
