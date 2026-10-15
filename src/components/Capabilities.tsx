import { capabilities, numbers } from '../data/profile'
import { useLang } from '../lib/lang'
import Counter from './Counter'
import Scramble from './Scramble'
import './Capabilities.css'

/** `compact` drops the descriptions and keeps just the module names and their tools. */
export function Capabilities({ compact = false }: { compact?: boolean }) {
    const lang = useLang()
    return (
        <div className={`caps${compact ? ' is-compact' : ''}`}>
            {capabilities.map((c) => (
                <div className="cap" key={c.no}>
                    <div className="cap-top">
                        <span className="cap-no">MOD_{c.no}</span>
                        <span className="cap-status">
                            <i /> ONLINE
                        </span>
                    </div>
                    <Scramble as="h3" className="cap-title" text={c.title[lang]} trigger="view" duration={900} />
                    {!compact && <p className="cap-body">{c.body[lang]}</p>}
                    <ul className="cap-items">
                        {c.items.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export function Numbers() {
    const lang = useLang()
    return (
        <dl className="numbers">
            {numbers.map((n) => (
                <div className="number" key={n.label.en}>
                    <dt className="number-value">
                        <Counter value={n.value} pad={n.pad} suffix={n.suffix} />
                    </dt>
                    <dd className="number-label">{n.label[lang]}</dd>
                </div>
            ))}
        </dl>
    )
}
