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
        title: { en: 'Web & business systems', zh: 'Web 与业务系统' },
        items: ['Laravel', 'PHP', 'MySQL', 'React', 'Node.js', 'HTML / CSS / JS', 'REST APIs'],
    },
    {
        no: '02',
        title: { en: 'Deploy & test', zh: '部署与测试' },
        items: ['AWS', 'Redis', 'Laravel Dusk'],
    },
    {
        no: '03',
        title: { en: 'AI', zh: 'AI' },
        items: ['Python', 'RAG', 'Vector DB', 'Llama 8B (local)', 'GLM', 'MinerU'],
    },
]

/** Tools Ethan has worked with that aren't shown in a project on this site. */
export const alsoUsed = ['Flutter', 'LangChain', 'n8n', 'MCP', 'LoRA fine-tuning', 'Java', 'x86 Assembly']
