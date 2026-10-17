import { useTranslation } from 'react-i18next'
import { alsoUsed, capabilities } from '../data/profile'
import { useLang } from '../lib/lang'
import './Capabilities.css'

/** Tools grouped by area — only ones used in the projects on this site, plus a plain "also used" line. */
export function Capabilities() {
    const { t } = useTranslation()
    const lang = useLang()
    return (
        <>
            <div className="caps is-compact">
                {capabilities.map((c) => (
                    <div className="cap" key={c.no}>
                        <h3 className="cap-title">{c.title[lang]}</h3>
                        <ul className="cap-items">
                            {c.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <p className="caps-also">
                <span>{t('home.also_used')}</span> {alsoUsed.join(' · ')}
            </p>
        </>
    )
}
