import { capabilities, numbers } from '../data/profile'
import { useLang } from '../lib/lang'
import Counter from './Counter'
import Reveal from './Reveal'
import './Capabilities.css'

export function Capabilities() {
    const lang = useLang()
    return (
        <div className="caps">
            {capabilities.map((c) => (
                <div className="cap" key={c.no}>
                    <span className="cap-no">{c.no}</span>
                    <Reveal as="h3" className="cap-title" key={lang}>
                        {c.title[lang]}
                    </Reveal>
                    <p className="cap-body">{c.body[lang]}</p>
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
