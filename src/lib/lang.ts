import { useTranslation } from 'react-i18next'

export type Lang = 'en' | 'zh'

/** Current language collapsed to the two we ship ('zh-CN' -> 'zh'). */
export function useLang(): Lang {
    const { i18n } = useTranslation()
    return i18n.language?.startsWith('zh') ? 'zh' : 'en'
}
