import { useTranslation } from 'react-i18next'
import './LanguageToggle.css'

export default function LanguageToggle() {
    const { i18n } = useTranslation()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
    }

    return (
        <div className="lang-toggle">
            <button
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button
                className={`lang-btn ${i18n.language === 'zh' ? 'active' : ''}`}
                onClick={() => changeLanguage('zh')}
            >
                中
            </button>
        </div>
    )
}
