export const profile = {
    name: 'Ethan Khoo',
    email: 'ethankhoo05@gmail.com',
    timezone: 'Asia/Kuala_Lumpur',
    links: [
        { label: 'GitHub', value: '@imethankhoooo', href: 'https://github.com/imethankhoooo' },
        { label: 'LinkedIn', value: 'Tsui Ern Khoo', href: 'https://www.linkedin.com/in/tsui-ern-khoo/' },
        { label: 'WhatsApp', value: '+60 11-2610 0907', href: 'https://wa.me/601126100907' },
    ],
}

export const timeline = [
    {
        when: { en: '2024 — Now', zh: '2024 — 至今' },
        what: { en: 'Bachelor of Information Systems (Hons)', zh: '信息系统学士（荣誉）' },
        where: { en: 'Enterprise Information Systems', zh: '企业信息系统方向' },
    },
    {
        when: { en: 'Internship', zh: '实习' },
        what: { en: 'Full-stack Developer Intern', zh: '全栈开发实习生' },
        where: {
            en: 'ERP, enterprise websites, SMS platforms — AWS, Redis, automated testing',
            zh: 'ERP、企业网站、SMS 平台 —— AWS、Redis、自动化测试',
        },
    },
    {
        when: { en: '2021 — 2024', zh: '2021 — 2024' },
        what: { en: 'Diploma in Information Systems', zh: '信息系统文凭' },
        where: { en: 'Foundation in IT & programming', zh: 'IT 与编程基础' },
    },
]

export const capabilities = [
    {
        no: '01',
        title: { en: 'Build', zh: '构建' },
        body: {
            en: 'Business systems people log into every day — ERPs, CRMs, ticketing, SMS gateways — and the websites in front of them.',
            zh: '每天有人登录使用的业务系统 —— ERP、CRM、工单、短信网关 —— 以及它们前面的网站。',
        },
        items: ['Laravel', 'React', 'Node.js', 'Flutter', 'MySQL', 'REST APIs'],
    },
    {
        no: '02',
        title: { en: 'Ship', zh: '交付' },
        body: {
            en: 'Getting it into production and keeping it there: cloud deploys, caching, and tests that run before users do.',
            zh: '把系统送上线并让它稳定运行：云端部署、缓存，以及在用户之前跑完的测试。',
        },
        items: ['AWS', 'Redis', 'Laravel Dusk', 'Cloudflare', 'Git'],
    },
    {
        no: '03',
        title: { en: 'Automate', zh: '智能化' },
        body: {
            en: 'Teaching those systems to think: retrieval-augmented answers, agent workflows, and models small enough to run offline.',
            zh: '让系统学会思考：检索增强问答、智能体工作流，以及能离线运行的小模型。',
        },
        items: ['RAG', 'Vector DB', 'LoRA fine-tuning', 'n8n agents', 'MCP', 'LangChain', 'Llama'],
    },
]

export const numbers = [
    { value: 3, pad: 2, label: { en: 'Production sites live', zh: '个线上运行的网站' } },
    { value: 2783, pad: 0, label: { en: 'Lines of x86 assembly, by hand', zh: '行手写 x86 汇编' } },
    { value: 8, pad: 0, suffix: 'B', label: { en: 'Parameter model, running offline', zh: '参数模型，离线运行' } },
    { value: 9, pad: 2, label: { en: 'Projects in this index', zh: '个项目收录于此' } },
]
