import { useTranslation } from 'react-i18next'
import './About.css'

export default function About() {
    const { t, i18n } = useTranslation()
    const lang: 'en' | 'zh' = i18n.language?.startsWith('zh') ? 'zh' : 'en'

    const education = [
        {
            date: { en: '2024 - PRESENT', zh: '2024 - 至今' },
            title: { en: 'Bachelor of Information Systems (Hons)', zh: '信息系统学士（荣誉）' },
            subtitle: { en: 'Enterprise Information Systems', zh: '企业信息系统方向' },
        },
        {
            date: { en: '2021 - 2024', zh: '2021 - 2024' },
            title: { en: 'Diploma in Information Systems', zh: '信息系统文凭' },
            subtitle: { en: 'Foundation in IT & Programming', zh: 'IT 与编程基础' },
        },
        {
            date: { en: 'INTERNSHIP', zh: '实习经历' },
            title: { en: 'Full Stack Developer Intern', zh: '全栈开发实习生' },
            subtitle: {
                en: 'ERP system, enterprise websites, SMS platforms. AWS deployment, Redis, automated testing.',
                zh: '参与 ERP 系统、企业网站、SMS 平台开发。实践 AWS 部署、Redis 缓存、自动化测试。'
            },
        }
    ]

    const aiAgents = [
        {
            tag: { en: 'AGENTIC WORKFLOWS', zh: '智能体工作流' },
            title: { en: 'n8n Agent Builder', zh: 'n8n 智能体构建' },
            desc: { en: 'Designing autonomous AI agents using n8n to automate complex workflows.', zh: '使用 n8n 设计自主 AI 智能体，自动化复杂工作流。' },
        },
        {
            tag: { en: 'NEXT-GEN CODING', zh: '下一代编程' },
            title: { en: 'AI Coding & MCP', zh: 'AI 编程与 MCP' },
            desc: { en: 'Mastering Cursor, Gemini CLI, and Model Context Protocol for 10x dev speed.', zh: '精通 Cursor、Gemini CLI 和 MCP，实现 10 倍开发效率。' },
        },
        {
            tag: { en: 'DIGITAL PRESENCE', zh: '数字展现' },
            title: { en: 'Digital Humans & Avatars', zh: '数字人与虚拟形象' },
            desc: { en: 'Creating interactive real-time digital humans and AI avatars.', zh: '创建交互式实时数字人和 AI 虚拟形象。' },
        },
        {
            tag: { en: 'DESIGN', zh: '设计' },
            title: { en: 'AI-Driven UI/UX', zh: 'AI 驱动 UI/UX' },
            desc: { en: 'Leveraging generative AI for rapid prototyping and design systems.', zh: '利用生成式 AI 进行快速原型设计。' },
        },
        {
            tag: { en: 'ENGINEERING', zh: '工程化' },
            title: { en: 'RAG & Fine-tuning', zh: 'RAG 与微调' },
            desc: { en: 'Building RAG systems with Vector DBs and Query Rewriting. Fine-tuning models (LoRA).', zh: '构建 RAG 系统，使用 LoRA 微调模型。' },
        },
        {
            tag: { en: 'RESEARCH', zh: '前沿研究' },
            title: { en: 'Frontier AI Tech', zh: '前沿 AI 科技' },
            desc: { en: 'Continuously exploring cutting-edge AI and integrating latest capabilities.', zh: '持续探索前沿 AI 技术，整合最新能力。' },
        },
    ]

    const skills = [
        { icon: '🧠', name: 'AI Coding', level: { en: 'Advanced', zh: '高级' } },
        { icon: '🔌', name: 'MCP', level: { en: 'Intermediate', zh: '中级' } },
        { icon: '⚡', name: 'Laravel', level: { en: 'Advanced', zh: '高级' } },
        { icon: '⚛️', name: 'React', level: { en: 'Intermediate', zh: '中级' } },
        { icon: '👤', name: 'Digital Human', level: { en: 'Exploring', zh: '探索中' } },
        { icon: '🎨', name: 'AI UI/UX', level: { en: 'Exploring', zh: '探索中' } },
        { icon: '🗄️', name: 'MySQL', level: { en: 'Advanced', zh: '高级' } },
        { icon: '🤖', name: 'RAG & Fine-tuning', level: { en: 'Intermediate', zh: '中级' } },
    ]

    const technologies = {
        frontend: ['HTML/CSS', 'JavaScript', 'React', 'TailwindCSS', 'Flutter'],
        backend: ['Laravel', 'Node.js', 'Python', 'MySQL', 'Redis', 'RESTful API'],
        ai: ['Cursor IDE', 'Gemini CLI', 'MCP Protocol', 'LangChain', 'n8n Agents', 'Llama', 'Vector DB', 'LoRA', 'Prompt Eng', 'Digital Human', 'AI UI/UX'],
    }

    return (
        <main className="about-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="page-title">
                        <span>{lang === 'zh' ? '关于' : 'About'}</span>{' '}
                        <span className="gradient-text">{lang === 'zh' ? '我' : 'Me'}</span>
                    </h1>
                    <p className="page-subtitle">
                        {lang === 'zh' ? '热爱技术，致力于将想法变为现实' : 'Passionate about technology, dedicated to turning ideas into reality'}
                    </p>
                </header>

                <div className="about-grid">
                    {/* Education Card */}
                    <div className="about-card glass-card">
                        <h2 className="card-title">
                            <span className="card-icon">🎓</span>
                            {lang === 'zh' ? '教育背景' : 'Education Background'}
                        </h2>
                        <div className="timeline">
                            {education.map((item, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot" />
                                    <span className="timeline-date">{item.date[lang]}</span>
                                    <h3 className="timeline-title">{item.title[lang]}</h3>
                                    <p className="timeline-subtitle">{item.subtitle[lang]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI & Intelligent Agents Card */}
                    <div className="about-card glass-card ai-card">
                        <h2 className="card-title">
                            <span className="card-icon">🤖</span>
                            {lang === 'zh' ? 'AI 与智能体' : 'AI & Intelligent Agents'}
                        </h2>
                        <div className="timeline ai-timeline">
                            {aiAgents.map((item, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot" />
                                    <span className="timeline-date">{item.tag[lang]}</span>
                                    <h3 className="timeline-title">{item.title[lang]}</h3>
                                    <p className="timeline-desc">{item.desc[lang]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Core Skills */}
                <h2 className="section-title">{lang === 'zh' ? '核心技能' : 'Core Skills'}</h2>
                <div className="skills-grid">
                    {skills.map((skill) => (
                        <div key={skill.name} className="skill-card">
                            <span className="skill-icon">{skill.icon}</span>
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-level">{skill.level[lang]}</span>
                        </div>
                    ))}
                </div>

                {/* Technologies */}
                <h2 className="section-title">{lang === 'zh' ? '技术栈' : 'Technologies'}</h2>
                <div className="tech-categories">
                    <div className="tech-category">
                        <h3 className="tech-category-title">{lang === 'zh' ? '前端' : 'Frontend'}</h3>
                        <div className="tech-tags">
                            {technologies.frontend.map((tech) => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                    <div className="tech-category">
                        <h3 className="tech-category-title">{lang === 'zh' ? '后端与数据库' : 'Backend & Database'}</h3>
                        <div className="tech-tags">
                            {technologies.backend.map((tech) => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                    <div className="tech-category ai-tech">
                        <h3 className="tech-category-title">{lang === 'zh' ? 'AI 与前沿科技' : 'AI & Frontier Tech'}</h3>
                        <div className="tech-tags">
                            {technologies.ai.map((tech) => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fast Learner Note */}
                <div className="learner-card glass-card">
                    <div className="learner-content">
                        <span className="learner-icon">🚀</span>
                        <div>
                            <h3>{lang === 'zh' ? '快速学习者' : 'Fast Learner'}</h3>
                            <p>
                                {lang === 'zh'
                                    ? '持续关注最新 AI 论文和发展动态，积极试用新应用，紧跟时代浪潮。Prompt Engineering 熟练应用，结合 AI 扩展和补充开发能力。'
                                    : 'Continuously following the latest AI papers and developments, actively trying new applications. Proficient in Prompt Engineering, leveraging AI to extend and complement development capabilities.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
