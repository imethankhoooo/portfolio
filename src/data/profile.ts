export const profile = {
    name: 'Ethan Khoo',
    email: 'ethankhoo05@gmail.com',
    /**
     * Public CV, served from /public. Leave undefined to hide the download buttons.
     * Use a general version (no company-specific heading, no referee contact details).
     */
    cv: undefined as string | undefined,
    timezone: 'Asia/Kuala_Lumpur',
    links: [
        { label: 'GitHub', value: '@imethankhoooo', href: 'https://github.com/imethankhoooo' },
        { label: 'LinkedIn', value: 'Tsui Ern Khoo', href: 'https://www.linkedin.com/in/tsui-ern-khoo/' },
        { label: 'WhatsApp', value: '+60 11-2610 0907', href: 'https://wa.me/601126100907' },
    ],
}

export const timeline = [
    {
        when: { en: '2023 — Now', zh: '2023 — 至今' },
        what: { en: 'Freelance Full-stack & AI Developer', zh: '自由职业全栈与 AI 开发者' },
        where: {
            en: 'Web and AI applications from business requirements to production — UI, APIs, databases, payments, integrations, deployment',
            zh: '从业务需求到上线的 Web 与 AI 应用——界面、API、数据库、支付、第三方集成与部署',
        },
    },
    {
        when: { en: 'Oct 2024 — Feb 2025', zh: '2024.10 — 2025.02' },
        what: { en: 'Full-stack Intern · 360 Interactive Sdn Bhd', zh: '全栈实习生 · 360 Interactive Sdn Bhd' },
        where: {
            en: 'UI, backend and API work; AWS deployments, Redis caching, Laravel Dusk automated tests',
            zh: '界面、后端与 API 开发；AWS 部署、Redis 缓存、Laravel Dusk 自动化测试',
        },
    },
    {
        when: { en: '2024 — 2027', zh: '2024 — 2027' },
        what: { en: 'Bachelor of Information Systems (Hons) · TAR UMT', zh: '信息系统学士（荣誉）· TAR UMT' },
        where: { en: 'Enterprise Information Systems · CGPA 3.44 / 4.00', zh: '企业信息系统方向 · CGPA 3.44 / 4.00' },
    },
    {
        when: { en: '2021 — 2024', zh: '2021 — 2024' },
        what: { en: 'Diploma in Information Systems · TAR UMT', zh: '信息系统文凭 · TAR UMT' },
        where: { en: 'Tunku Abdul Rahman University of Management and Technology', zh: '拉曼管理与科技大学' },
    },
]

export const capabilities = [
    {
        no: '01',
        title: { en: 'Full-stack', zh: '全栈' },
        items: ['Next.js', 'TypeScript', 'React', 'Node.js', 'Laravel', 'PostgreSQL', 'MySQL', 'Supabase (Auth / RLS)'],
    },
    {
        no: '02',
        title: { en: 'Cloud, automation & quality', zh: '云、自动化与质量' },
        items: ['Inngest', 'Cloudflare R2', 'Vercel', 'AWS', 'Redis / Upstash', 'Sentry', 'Vitest', 'Playwright', 'Laravel Dusk'],
    },
    {
        no: '03',
        title: { en: 'AI', zh: 'AI' },
        items: ['Multi-model AI APIs', 'Tool calling', 'Webhooks', 'RAG', 'Local LLMs (Llama 8B)', 'MinerU / GLM', 'Claude Code', 'Codex'],
    },
]

/** Tools Ethan has worked with that aren't shown in a project on this site. */
export const alsoUsed = ['Flutter', 'LangChain', 'n8n', 'MCP', 'LoRA fine-tuning', 'Java', 'x86 Assembly']
