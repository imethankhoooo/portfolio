export type ProjectType = 'live' | 'internal' | 'academic'

type L10n = { en: string; zh: string }
type L10nList = { en: string[]; zh: string[] }

export interface Project {
    id: string
    type: ProjectType
    /** Shown in the stacked "Selected work" section on the home page */
    featured?: boolean
    /** Dark tint used behind the project on cards and detail pages */
    tone: string
    title: L10n
    /** One-liner used in lists */
    summary: L10n
    description: L10n
    role: L10n
    highlights: L10nList
    stack: string[]
    /**
     * Screenshots in /public/media/<id>/. Each entry is a base name; the build
     * expects `<name>.webp` (1920w) and `<name>-sm.webp` (880w) next to it.
     * To add screenshots: drop the files in and append the names here.
     */
    gallery: string[]
    video?: { src: string; poster: string }
    /** Rendered as a code block instead of an image (projects with no UI) */
    code?: string
    link?: string
}

export const projects: Project[] = [
    {
        id: 'kathok',
        type: 'live',
        featured: true,
        tone: '#3A0F0C',
        title: { en: 'Kathok Buddhist Centre', zh: '噶陀佛教中心官网' },
        summary: {
            en: 'Official website for a Tibetan Buddhist centre in Kuala Lumpur.',
            zh: '吉隆坡藏传佛教中心官方网站。',
        },
        description: {
            en: "Official website for Malaysia's Nyingma Kathok Buddhist Association. Modern design language presenting traditional cultural content, with multilingual support, an event calendar and online registration.",
            zh: '为马来西亚宁玛噶陀佛教会设计开发的官方网站。采用现代设计语言呈现传统文化内容，支持多语言切换，实现活动日历与在线报名功能。',
        },
        role: { en: 'Design & development', zh: '设计与开发' },
        highlights: {
            en: ['Multilingual content', 'Event calendar', 'Online registration', 'Responsive on every screen'],
            zh: ['多语言内容', '活动日历', '在线报名', '全尺寸响应式'],
        },
        stack: ['HTML', 'CSS', 'JavaScript', 'i18n'],
        gallery: ['01'],
        link: 'https://kathok.org.my/Kathok-Website%20-%20online/index.html',
    },
    {
        id: 'erp',
        type: 'internal',
        featured: true,
        tone: '#0F1A2E',
        title: { en: 'ERP System', zh: 'ERP 企业资源管理系统' },
        summary: {
            en: 'Product, warehouse and customer management — on AWS, cached with Redis.',
            zh: '产品、仓库、客户管理 —— AWS 部署，Redis 缓存。',
        },
        description: {
            en: 'A full ERP covering product, warehouse and customer management. Deployed on AWS with Redis caching, and covered by Laravel Dusk browser tests so releases do not break the flows teams rely on.',
            zh: '全功能 ERP 系统，包含产品管理、仓库管理、客户管理等模块。AWS 部署，Redis 缓存，并以 Laravel Dusk 浏览器自动化测试保障每次发布不破坏核心业务流程。',
        },
        role: { en: 'Full-stack development', zh: '全栈开发' },
        highlights: {
            en: ['Product, warehouse & customer modules', 'Deployed on AWS', 'Redis caching layer', 'Laravel Dusk browser tests'],
            zh: ['产品 / 仓库 / 客户模块', 'AWS 部署', 'Redis 缓存层', 'Laravel Dusk 浏览器测试'],
        },
        stack: ['Laravel', 'MySQL', 'Redis', 'AWS', 'Dusk'],
        gallery: ['01', '02', '03', '04'],
        video: { src: 'media/erp/demo.mp4', poster: 'media/erp/poster.webp' },
    },
    {
        id: 'aiquiz',
        type: 'internal',
        featured: true,
        tone: '#0B2424',
        title: { en: 'AI Quiz Generator', zh: 'AI 智能测验系统' },
        summary: {
            en: 'Turns PDF notes into quizzes, grades them, and drills your weak spots.',
            zh: '把 PDF 笔记变成测验，自动批改，并针对弱点反复训练。',
        },
        description: {
            en: 'A study system that parses PDF notes, generates quizzes from their content, grades answers precisely, tracks every wrong answer and builds adaptive training around your weak points.',
            zh: '智能测验系统：PDF 笔记自动解析、基于内容的智能 Quiz 生成、精准批改、错题追踪与自适应弱点训练。',
        },
        role: { en: 'Full-stack & AI integration', zh: '全栈与 AI 集成' },
        highlights: {
            en: ['PDF note parsing', 'LLM-generated quizzes', 'Automatic grading', 'Wrong-answer tracking', 'Adaptive weakness training'],
            zh: ['PDF 笔记解析', 'LLM 生成测验', '自动批改', '错题追踪', '自适应弱点训练'],
        },
        stack: ['Python', 'LLM', 'PDF parsing'],
        gallery: ['01', '02', '03', '04', '05', '06', '07'],
    },
    {
        id: 'chatbot',
        type: 'internal',
        featured: true,
        tone: '#16121F',
        title: { en: 'Offline AI Assistant', zh: '本地离线 AI 助手' },
        summary: {
            en: 'Llama 8B answering domain questions on an ordinary laptop — no cloud.',
            zh: '在普通笔记本上运行 Llama 8B，离线回答业务问题。',
        },
        description: {
            en: 'A locally deployed Llama 8B assistant for offline question answering on a standard laptop. A debug panel exposes every stage of the pipeline — keyword extraction, vector retrieval, intent optimisation and response generation — with timings.',
            zh: '在本地笔记本电脑上运行 Llama 8B 模型的 AI 对话系统，实现离线智能问答。调试面板展示管线的每个阶段——关键词提取、向量检索、意图优化、回答生成——及其耗时。',
        },
        role: { en: 'AI engineering', zh: 'AI 工程' },
        highlights: {
            en: ['Runs fully offline', 'Llama 8B on consumer hardware', 'Vector retrieval (RAG)', 'Stage-by-stage debug panel'],
            zh: ['完全离线运行', '消费级硬件运行 Llama 8B', '向量检索（RAG）', '分阶段调试面板'],
        },
        stack: ['Python', 'Llama 8B', 'Vector DB', 'RAG'],
        gallery: ['01'],
        video: { src: 'media/chatbot/demo.mp4', poster: 'media/chatbot/poster.webp' },
    },
    {
        id: 'primesms',
        type: 'live',
        tone: '#0B2018',
        title: { en: 'PrimeSMS Platform', zh: 'PrimeSMS 短信平台' },
        summary: {
            en: 'Enterprise bulk-SMS platform with an API for the Indonesian market.',
            zh: '面向印尼市场的企业级批量短信平台。',
        },
        description: {
            en: 'Enterprise SMS service platform for the Indonesian market — bulk messaging, API integration for business systems, and delivery analytics.',
            zh: '印尼市场的企业级 SMS 服务平台，提供批量短信发送、API 接口和数据分析功能。',
        },
        role: { en: 'Full-stack development', zh: '全栈开发' },
        highlights: {
            en: ['Bulk messaging', 'API integration', 'Analytics'],
            zh: ['批量短信发送', 'API 接口', '数据分析'],
        },
        stack: ['Laravel', 'MySQL', 'REST API'],
        gallery: ['01'],
        link: 'https://primesms.id/',
    },
    {
        id: 'mage-ai-media',
        type: 'live',
        tone: '#0B1630',
        title: { en: 'Mage AI Media', zh: 'Mage AI Media' },
        summary: {
            en: 'AI-powered media platform for generating and managing content.',
            zh: 'AI 驱动的媒体内容生成与管理平台。',
        },
        description: {
            en: 'AI-powered media content platform with advanced content generation and management features.',
            zh: 'AI 驱动的媒体内容平台，集成先进的内容生成和管理功能。',
        },
        role: { en: 'Development', zh: '开发' },
        highlights: {
            en: ['AI content generation', 'Content management'],
            zh: ['AI 内容生成', '内容管理'],
        },
        stack: ['React', 'Node.js', 'AI'],
        // Add current screenshots of mageaimedia.com here (see scripts/optimize-media.sh).
        gallery: [],
        link: 'https://mageaimedia.com/',
    },
    {
        id: 'servicenote',
        type: 'internal',
        tone: '#24140A',
        title: { en: 'Service Note System', zh: 'Service Note 服务管理系统' },
        summary: {
            en: 'Service-ticket management with CRM and dashboard analytics.',
            zh: '集成 CRM 与仪表板分析的服务工单管理。',
        },
        description: {
            en: 'Enterprise service-ticket management with built-in CRM, dashboard analytics and customer tracking.',
            zh: '企业级服务工单管理系统，集成 CRM 功能、仪表板分析和客户追踪。',
        },
        role: { en: 'Full-stack development', zh: '全栈开发' },
        highlights: {
            en: ['Service tickets', 'CRM', 'Dashboard analytics', 'Customer tracking'],
            zh: ['服务工单', 'CRM', '仪表板分析', '客户追踪'],
        },
        stack: ['Laravel', 'MySQL', 'CRM'],
        gallery: ['01', '02', '03', '04'],
    },
    {
        id: 'java',
        type: 'academic',
        tone: '#151515',
        title: { en: 'CarSeek — Java CLI', zh: 'CarSeek — Java 命令行系统' },
        summary: {
            en: 'Car-rental system in the terminal, with SMTP email verification.',
            zh: '终端里的汽车租赁系统，带 SMTP 邮件验证。',
        },
        description: {
            en: 'University assignment: a command-line car-rental system built with object-oriented Java. Registration with SMTP email verification, account management, and an admin panel for users, vehicles, bookings, payments and reports.',
            zh: '大学课程作业：基于面向对象 Java 的命令行汽车租赁系统。包含 SMTP 邮件验证注册、账户管理，以及管理用户、车辆、预订、支付与报表的管理员面板。',
        },
        role: { en: 'Coursework', zh: '课程作业' },
        highlights: {
            en: ['OOP design', 'SMTP email verification', 'Admin panel', 'Bookings & payments'],
            zh: ['面向对象设计', 'SMTP 邮件验证', '管理员面板', '预订与支付'],
        },
        stack: ['Java', 'OOP', 'SMTP', 'CLI'],
        gallery: ['01', '02'],
    },
    {
        id: 'assembly',
        type: 'academic',
        tone: '#111111',
        title: { en: 'Leisure Club in x86 Assembly', zh: '汇编语言 · 休闲俱乐部系统' },
        summary: {
            en: '2,783 lines of x86 assembly: logins, bookings, staff management.',
            zh: '2,783 行 x86 汇编：登录、预订、员工管理。',
        },
        description: {
            en: 'A complete club management system written in x86 assembly — member login and registration, facility booking, pricing and staff management. 2,783 lines of low-level code with hand-managed buffers and arrays.',
            zh: '使用 x86 汇编语言编写的完整俱乐部管理系统，包含会员登录注册、设施预订、价格查询、员工管理等功能。2,783 行底层代码，缓冲区与数组全部手动管理。',
        },
        role: { en: 'Coursework', zh: '课程作业' },
        highlights: {
            en: ['Member login & registration', 'Facility booking', 'Staff management', '2,783 lines of x86'],
            zh: ['会员登录与注册', '设施预订', '员工管理', '2,783 行 x86'],
        },
        stack: ['x86 Assembly', 'MASM', 'DOS'],
        gallery: [],
        code: `.MODEL small
.STACK 100h
.DATA
mainMenu     DB "1. Staff", 0Dh, 0Ah, "2. Member", 0Dh, 0Ah
             DB "3. Exit", 0Dh, 0Ah, "Please Enter Your Selection : ", "$"
msgId        DB 0Dh, 0Ah, "Enter ID: $"
msgPassword  DB 0Dh, 0Ah, "Enter Password: $"
successMsg   DB 0Dh, 0Ah, "Login Successful!", 0Dh, 0Ah, "$"

MAX_MEMBERS EQU 20
memberIDArray        DB MAX_MEMBERS * 5  DUP('$')
memberPasswordArray  DB MAX_MEMBERS * 5  DUP('$')
memberNameArray      DB MAX_MEMBERS * 20 DUP('$')
memberICArray        DB MAX_MEMBERS * 13 DUP('$')
memberPhoneArray     DB MAX_MEMBERS * 12 DUP('$')
memberCounter        DB 0`,
    },
]

export const getProjectById = (id: string) => projects.find(p => p.id === id)

export const getFeaturedProjects = () => projects.filter(p => p.featured)

export const getNextProject = (id: string) => {
    const i = projects.findIndex(p => p.id === id)
    return projects[(i + 1) % projects.length]
}

export const coverOf = (p: Project, size: 'lg' | 'sm' = 'lg') =>
    p.gallery.length ? `media/${p.id}/${p.gallery[0]}${size === 'sm' ? '-sm' : ''}.webp` : undefined
