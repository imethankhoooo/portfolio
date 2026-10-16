export type ProjectType = 'live' | 'internal' | 'personal' | 'academic'

type L10n = { en: string; zh: string }
type L10nList = { en: string[]; zh: string[] }

export interface Project {
    id: string
    type: ProjectType
    /** Shown in the "Selected work" grid on the home page */
    featured?: boolean
    /** Only listed on the Work page, never on the home page */
    archived?: boolean
    /** Dark tint used behind the project on cards and detail pages */
    tone: string
    title: L10n
    /** One-liner used in lists */
    summary: L10n
    description: L10n
    /** Where the work happened: client, internship, coursework… */
    context: L10n
    /** What Ethan personally did */
    role: L10n
    /** What was built — concrete features, not adjectives */
    highlights: L10nList
    /** Technical decisions worth talking about (optional) */
    decisions?: L10nList
    /** Measured or observable result (optional — only real facts) */
    result?: L10n
    /** Heading for `result`, e.g. "What I measured" (defaults to "Result") */
    resultLabel?: L10n
    /** Detail page opens on the demo video instead of the first screenshot */
    heroVideo?: boolean
    /** Captions for individual screenshots, keyed by gallery name */
    captions?: Record<string, L10n>
    stack: string[]
    /**
     * Screenshots in /public/media/<id>/. Each entry is a base name; the build
     * expects `<name>.webp` (1920w) and `<name>-sm.webp` (880w) next to it.
     * To add screenshots: drop the files in and append the names here.
     */
    gallery: string[]
    /** Optional card-ratio crop used on project cards instead of the first screenshot */
    cardCover?: string
    video?: { src: string; poster: string; caption: L10n }
    /** Note shown under the screenshots (e.g. "test data") */
    galleryNote?: L10n
    /** Rendered as a code block instead of an image (projects with no UI) */
    code?: string
    link?: string
    /** Public source code, if any */
    repo?: string
}

export const projects: Project[] = [
    {
        id: 'mage-ai-media',
        type: 'live',
        featured: true,
        tone: '#0B1630',
        title: { en: 'Mage AI Media', zh: 'Mage AI Media' },
        summary: {
            en: 'A trilingual, node-based AI creation platform — image, video and audio models behind one gateway. Live, with real users and payments.',
            zh: '三语、节点式 AI 创作平台——图像、视频、音频模型统一接入。已上线，有真实用户与付费。',
        },
        description: {
            en: 'A production AI creation platform in English, Chinese and Malay. Users build generations on a node canvas that chains image, video and audio models from multiple providers through a single gateway. Long-running generations run as background jobs with retries and provider webhooks; accounts, usage credits and payments are handled in-app, and the whole system is monitored in production.',
            zh: '一个已投入生产的 AI 创作平台，支持英文、中文与马来文。用户在节点画布上串联来自多家供应商的图像、视频、音频模型，统一通过一个网关调用。耗时较长的生成任务以后台作业运行，支持重试与供应商 Webhook 回调；账户、使用额度与支付都在平台内完成，整个系统在生产环境中被持续监控。',
        },
        context: { en: 'Live product · mageaimedia.com', zh: '线上产品 · mageaimedia.com' },
        role: { en: 'Solo developer (AI-assisted) — architecture, build, deployment and operations', zh: '独立开发者（AI 辅助）——架构、开发、部署与运维' },
        highlights: {
            en: [
                'Node-based canvas for chaining image, video and audio generation',
                'Multi-provider model gateway: one interface over several AI APIs',
                'Async generation workflows on Inngest with retries and webhook handling',
                'Supabase Auth with PostgreSQL row-level security',
                'Usage credits and payment flows',
                'Trilingual UI: English, Chinese, Malay',
            ],
            zh: ['节点画布：串联图像、视频、音频生成', '多供应商模型网关：一个接口对接多家 AI API', '基于 Inngest 的异步生成工作流，支持重试与 Webhook 回调', 'Supabase Auth + PostgreSQL 行级安全（RLS）', '使用额度与支付流程', '三语界面：英文、中文、马来文'],
        },
        decisions: {
            en: [
                'Generations run as background jobs (Inngest) rather than in the request, so slow model calls can retry and finish via provider webhooks without timing out the user',
                'Access control lives in the database (Postgres RLS), not only in API code',
                'Media goes to Cloudflare R2; errors are tracked in Sentry; Vitest and Playwright cover the critical flows',
            ],
            zh: ['生成任务以后台作业（Inngest）运行而不是放在请求里——慢的模型调用可以重试，并通过供应商 Webhook 完成，用户请求不会超时', '权限控制放在数据库层（Postgres RLS），而不仅仅在 API 代码里', '媒体存储于 Cloudflare R2；错误由 Sentry 追踪；关键流程由 Vitest 与 Playwright 覆盖'],
        },
        resultLabel: { en: 'Status', zh: '现状' },
        result: {
            en: 'Live in production at mageaimedia.com with real users, usage credits and payments.',
            zh: '已在 mageaimedia.com 上线运行，有真实用户、使用额度与付费。',
        },
        stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Inngest', 'Cloudflare R2', 'Upstash Redis', 'Sentry', 'Vitest', 'Playwright'],
        // Add current screenshots of mageaimedia.com here (see scripts/optimize-media.sh).
        gallery: [],
        link: 'https://mageaimedia.com/',
    },
    {
        id: 'kathok',
        type: 'live',
        featured: true,
        tone: '#3A0F0C',
        title: { en: 'Kathok Buddhist Association', zh: '噶陀佛教会官网' },
        summary: {
            en: 'Paid client project: the official bilingual website of a Kuala Lumpur Buddhist association — events, online registration, delivered end to end.',
            zh: '有偿客户项目：吉隆坡佛教会的中英双语官网——活动与在线报名，从需求到上线一手交付。',
        },
        description: {
            en: "A paid engagement for the Nyingma Kathok Buddhist Association (Persatuan Penganut Buddha Nyingma Kathok) in Kuala Lumpur. I took the project from the client's brief to a live site: structured the content, designed a visual identity that carries the lineage's tradition into a modern interface, and built a bilingual English / Chinese website with an event calendar and online registration — the association's official presence online today.",
            zh: '为吉隆坡宁玛噶陀佛教会（Persatuan Penganut Buddha Nyingma Kathok）承接的有偿项目。我从客户需求一路做到网站上线：梳理内容结构，设计出将传承底蕴融入现代界面的视觉风格，并开发了支持中英双语、带活动日历与在线报名的网站——如今是该会在网上的官方门户。',
        },
        context: { en: 'Paid freelance project · client: Nyingma Kathok Buddhist Association', zh: '有偿自由接单项目 · 客户：宁玛噶陀佛教会' },
        role: { en: 'Sole designer & developer — from client brief to launch', zh: '独立设计与开发——从客户需求到上线' },
        highlights: {
            en: [
                'End-to-end delivery: client brief, information architecture, visual design, build and launch',
                'A visual identity that carries Tibetan Buddhist tradition into a modern, clean interface',
                'English / Chinese content throughout, switchable on every page',
                'Event calendar and online registration for members and visitors',
                'Responsive on phones — where most of the community browses',
            ],
            zh: ['端到端交付：客户需求、信息架构、视觉设计、开发与上线', '把藏传佛教传统融入现代、简洁界面的视觉风格', '全站中英文内容，每页可切换', '面向会员与访客的活动日历与在线报名', '手机端响应式——社区成员大多用手机浏览'],
        },
        stack: ['HTML', 'CSS', 'JavaScript'],
        gallery: ['01'],
        link: 'https://kathok.org.my/Kathok-Website%20-%20online/index.html',
    },
    {
        id: 'erp',
        type: 'internal',
        featured: true,
        tone: '#0F1A2E',
        title: { en: 'ProBuild — Retail ERP', zh: 'ProBuild 零售 ERP 系统' },
        summary: {
            en: 'Multi-store ERP: customers & membership points, configurable products, inventory, staff and sales. Covered by browser tests.',
            zh: '多门店 ERP：会员与积分、可配置商品、库存、员工与销售，并有浏览器自动化测试覆盖。',
        },
        description: {
            en: 'A Laravel ERP for retail stores. Each store has its own warehouses, customers (with membership levels and points), products, staff and sales. Product categories carry configurable parameters with validation rules — used here for optical-lens specs such as refractive index and lens type. Deployed on AWS with Redis caching, and exercised end-to-end by Laravel Dusk browser tests.',
            zh: '面向零售门店的 Laravel ERP。每个门店有独立的仓库、会员（等级与积分）、商品、员工与销售数据。商品分类支持可配置参数与校验规则——例如镜片的折射率、镜片类型等规格。部署在 AWS，使用 Redis 缓存，并由 Laravel Dusk 浏览器测试做端到端验证。',
        },
        context: { en: 'Internship · 360 Interactive Sdn Bhd', zh: '实习 · 360 Interactive Sdn Bhd' },
        role: { en: 'Solo developer (AI-assisted) — design, build and deployment', zh: '独立开发者（AI 辅助）——设计、开发与部署' },
        highlights: {
            en: [
                'Multi-store setup: each store has its own warehouses and data',
                'Customer records with IC number, membership level and points',
                'Product categories with configurable parameters and validation rules',
                'Inventory, staff, sales and analytics modules',
            ],
            zh: ['多门店：每个门店独立的仓库与数据', '会员档案：身份证号、会员等级与积分', '商品分类支持可配置参数与校验规则', '库存、员工、销售与分析模块'],
        },
        decisions: {
            en: [
                'Category parameters (with validation rules) are defined in the admin UI, not hard-coded — new product types such as lenses need no code change',
                'Laravel Dusk drives a real browser through create / search / edit flows, so UI regressions are caught before release',
                'Deployed on AWS with Redis caching',
            ],
            zh: ['分类参数（含校验规则）在后台界面中定义，而不是写死在代码里——新增镜片等商品类型无需改代码', '用 Laravel Dusk 驱动真实浏览器跑新增 / 搜索 / 编辑流程，发布前发现界面回归', '部署于 AWS，并使用 Redis 缓存'],
        },
        stack: ['Laravel', 'MySQL', 'Redis', 'AWS', 'Laravel Dusk'],
        gallery: ['04', '03', '02', '01'],
        cardCover: 'card',
        captions: {
            '04': {
                en: 'Lens specs (spherical degree, refractive index, lens type) are category parameters defined in the admin — not hard-coded fields.',
                zh: '镜片规格（球镜度数、折射率、镜片类型）是在后台定义的分类参数，而不是写死的字段。',
            },
        },
        galleryNote: { en: 'Screens and recording use seeded test data.', zh: '截图与录屏使用的是测试数据。' },
        video: {
            src: 'media/erp/demo.mp4',
            poster: 'media/erp/poster.webp',
            caption: { en: 'Laravel Dusk test run creating stores, customers and product categories (2× speed)', zh: 'Laravel Dusk 自动化测试：创建门店、会员与商品分类（2 倍速）' },
        },
    },
    {
        id: 'aiquiz',
        type: 'personal',
        featured: true,
        tone: '#0B2424',
        title: { en: 'AI Quiz — PDF to Practice', zh: 'AI Quiz 智能测验系统' },
        summary: {
            en: 'Upload lecture PDFs; get bilingual structured notes, generated quizzes, grading and a weak-spot heatmap.',
            zh: '上传课堂 PDF，自动生成双语结构化笔记、测验与批改，并用热力图追踪薄弱点。',
        },
        description: {
            en: 'A study tool that turns lecture PDFs into a learning loop. MinerU parses the PDF, a GLM model turns it into bilingual structured notes, quizzes are generated from those notes, answers are graded, and every wrong answer feeds a weak-spot tracker and heatmap that drives the next round of practice.',
            zh: '把课堂 PDF 变成学习闭环的工具。MinerU 解析 PDF，GLM 模型生成双语结构化笔记，再基于笔记生成测验、批改作答，每道错题都进入薄弱点追踪与热力图，驱动下一轮练习。',
        },
        context: { en: 'Personal tool — built for my own studies, before NotebookLM existed', zh: '个人工具——在 NotebookLM 出现之前，为自己的学习而做' },
        role: { en: 'Solo developer (AI-assisted) — design, build and deployment', zh: '独立开发者（AI 辅助）——设计、开发与部署' },
        highlights: {
            en: ['PDF parsing with MinerU', 'Bilingual structured notes generated by GLM', 'Quiz generation grounded in the notes', 'Wrong-answer tracking with a weak-spot heatmap'],
            zh: ['MinerU 解析 PDF', 'GLM 生成双语结构化笔记', '基于笔记内容生成测验', '错题追踪与薄弱点热力图'],
        },
        decisions: {
            en: ['Quizzes are generated from the parsed notes rather than the whole PDF, keeping prompts short and answers grounded in the material'],
            zh: ['测验基于解析后的笔记生成，而不是整份 PDF——提示更短，答案也更贴合原材料'],
        },
        stack: ['Python', 'MinerU', 'GLM', 'LLM'],
        gallery: ['01', '02', '03', '04', '05', '06', '07'],
    },
    {
        id: 'chatbot',
        type: 'academic',
        tone: '#16121F',
        title: { en: 'SQL AI Assistant — Offline RAG', zh: 'SQL AI 助手 · 离线 RAG' },
        summary: {
            en: 'Answers SQL Accounting & Malaysian e-invoice questions with Llama 8B on a laptop — no cloud — with a stage-by-stage debug panel.',
            zh: '在笔记本上用 Llama 8B 离线回答 SQL Accounting 与马来西亚电子发票问题，并带分阶段调试面板。',
        },
        description: {
            en: 'An assistant for SQL Accounting Software users (Malaysia) that answers questions about e-invoicing, SST and day-to-day usage. It runs fully offline: Llama 8B on a standard laptop with retrieval over a local vector store. A debug panel shows each pipeline stage — keyword extraction, vector retrieval, intent optimisation and streamed response generation — with its timing.',
            zh: '面向马来西亚 SQL Accounting 软件用户的问答助手，回答电子发票、SST 和日常操作问题。完全离线运行：在普通笔记本上跑 Llama 8B，并对本地向量库做检索。调试面板展示每个管线阶段——关键词提取、向量检索、意图优化、流式回答生成——及其耗时。',
        },
        context: { en: 'AI course assignment · for SQL Accounting users', zh: 'AI 课程作业 · 面向 SQL Accounting 用户' },
        role: { en: 'Solo developer (AI-assisted) — design, build and deployment', zh: '独立开发者（AI 辅助）——设计、开发与部署' },
        highlights: {
            en: ['Runs fully offline on a consumer laptop', 'Retrieval over a local vector store (RAG)', 'Four-stage pipeline with streamed answers', 'Debug panel: per-stage timings, memory use, request log'],
            zh: ['在消费级笔记本上完全离线运行', '基于本地向量库的检索增强（RAG）', '四阶段管线，流式输出回答', '调试面板：分阶段耗时、内存占用、请求日志'],
        },
        decisions: {
            en: ['Added a debug panel with per-stage timings and memory use, so bottlenecks are measured rather than guessed'],
            zh: ['加入显示分阶段耗时与内存占用的调试面板，用数据而不是猜测定位瓶颈'],
        },
        resultLabel: { en: 'What I measured', zh: '测量结果' },
        result: {
            en: 'Profiled every stage on a CPU-only laptop: vector retrieval 87 ms; the three LLM stages 20–52 s each (≈1.9 min per answer). Inference, not retrieval, is the bottleneck — next step is fewer LLM calls per question, or a smaller model for the keyword and intent stages.',
            zh: '在纯 CPU 笔记本上逐阶段测量：向量检索 87 毫秒；三个大模型阶段各 20–52 秒（每个回答约 1.9 分钟）。瓶颈在推理而非检索——下一步是减少每个问题的模型调用次数，或在关键词与意图阶段换用更小的模型。',
        },
        heroVideo: true,
        stack: ['Python', 'Llama 8B', 'RAG', 'Vector DB'],
        gallery: ['01', '02'],
        captions: {
            '02': { en: 'Debug panel: per-stage timings and memory use.', zh: '调试面板：分阶段耗时与内存占用。' },
        },
        video: {
            src: 'media/chatbot/demo.mp4',
            poster: 'media/chatbot/poster.webp',
            caption: { en: 'One question end to end, with the debug panel (2× speed)', zh: '一个问题的完整处理过程与调试面板（2 倍速）' },
        },
    },
    {
        id: 'primesms',
        type: 'live',
        tone: '#0B2018',
        title: { en: 'PrimeSMS Platform', zh: 'PrimeSMS 短信平台' },
        summary: {
            en: 'Bulk-SMS platform with an API for businesses in Indonesia.',
            zh: '面向印尼企业的批量短信平台，提供 API 接入。',
        },
        description: {
            en: 'SMS service platform for the Indonesian market — bulk messaging, an API for business systems, and delivery analytics.',
            zh: '面向印尼市场的短信服务平台——批量发送、供业务系统接入的 API，以及发送数据分析。',
        },
        context: { en: 'Business messaging platform', zh: '企业短信平台' },
        role: { en: 'Solo developer (AI-assisted) — design, build and deployment', zh: '独立开发者（AI 辅助）——设计、开发与部署' },
        highlights: {
            en: ['Bulk messaging workflows', 'Integrations with external messaging APIs', 'Activity tracking and usage analytics'],
            zh: ['批量短信发送流程', '对接第三方短信 API', '活动追踪与用量分析'],
        },
        stack: ['Laravel', 'MySQL', 'Third-party REST APIs'],
        gallery: ['01'],
        link: 'https://primesms.id/',
    },
    {
        id: 'servicenote',
        type: 'internal',
        tone: '#24140A',
        title: { en: 'Service Note System', zh: 'Service Note 服务管理系统' },
        summary: {
            en: 'Service-ticket management with a built-in CRM and dashboard.',
            zh: '集成 CRM 与仪表板的服务工单管理系统。',
        },
        description: {
            en: 'Service-ticket management with a built-in CRM, dashboard analytics and customer tracking.',
            zh: '服务工单管理系统，集成 CRM、仪表板分析与客户追踪。',
        },
        context: { en: 'CRM & operations system', zh: 'CRM 与运营系统' },
        role: { en: 'Solo developer (AI-assisted) — design, build and deployment', zh: '独立开发者（AI 辅助）——设计、开发与部署' },
        highlights: {
            en: ['Service-ticket workflow with status tracking', 'Customer management (CRM)', 'Dashboard for day-to-day operations', 'Login and roles'],
            zh: ['带状态追踪的服务工单流程', '客户管理（CRM）', '日常运营仪表板', '登录与权限'],
        },
        stack: ['Laravel', 'MySQL'],
        gallery: ['01', '02', '03', '04'],
    },
    {
        id: 'java',
        type: 'academic',
        archived: true,
        tone: '#151515',
        title: { en: 'CarSeek — Java CLI', zh: 'CarSeek — Java 命令行系统' },
        summary: {
            en: 'Car-rental system in the terminal, with SMTP email verification.',
            zh: '终端里的汽车租赁系统，带 SMTP 邮件验证。',
        },
        description: {
            en: 'A command-line car-rental system in object-oriented Java: registration with SMTP email verification, account management, and an admin panel for users, vehicles, bookings, payments and reports.',
            zh: '面向对象 Java 编写的命令行汽车租赁系统：SMTP 邮件验证注册、账户管理，以及管理用户、车辆、预订、支付与报表的管理员面板。',
        },
        context: { en: 'University coursework', zh: '大学课程作业' },
        role: { en: 'Solo', zh: '独立完成' },
        highlights: {
            en: ['Object-oriented design', 'SMTP email verification', 'Admin panel', 'Bookings and payments'],
            zh: ['面向对象设计', 'SMTP 邮件验证', '管理员面板', '预订与支付'],
        },
        stack: ['Java', 'OOP', 'SMTP'],
        gallery: ['01', '02'],
    },
    {
        id: 'assembly',
        type: 'academic',
        archived: true,
        tone: '#0B1218',
        title: { en: 'Leisure Club in x86 Assembly', zh: '汇编语言 · 休闲俱乐部系统' },
        summary: {
            en: '2,783 lines of x86 assembly: logins, bookings, staff management.',
            zh: '2,783 行 x86 汇编：登录、预订、员工管理。',
        },
        description: {
            en: 'A club management system written in x86 assembly for DOS — member registration and login, facility booking, pricing and staff management, with buffers and arrays managed by hand.',
            zh: '用 x86 汇编为 DOS 编写的俱乐部管理系统——会员注册与登录、设施预订、价格查询与员工管理，缓冲区与数组全部手动管理。',
        },
        context: { en: 'University coursework', zh: '大学课程作业' },
        role: { en: 'Solo', zh: '独立完成' },
        highlights: {
            en: ['Member registration with IC and phone validation', 'Hidden password input with backspace handling', 'Facility booking and pricing', 'Staff management'],
            zh: ['会员注册：身份证与电话校验', '密码隐藏输入并支持退格', '设施预订与价格查询', '员工管理'],
        },
        stack: ['x86 Assembly', 'MASM', 'DOS'],
        gallery: [],
        code: `; Read password without echo, print '*', support backspace
readPasswordChar:
    mov ah, 08h          ; read character without echo
    int 21h

    cmp al, 13           ; Enter -> done
    je endPasswordInput
    cmp al, 8            ; Backspace
    je handleBackspace

    mov [si], al         ; store the character
    inc si
    inc cx

    mov ah, 02h          ; show an asterisk instead
    mov dl, '*'
    int 21h

    cmp cx, 20           ; max password length
    jl readPasswordChar

endPasswordInput:
    mov byte ptr [inputPasswordBuffer + 1], cl
    mov byte ptr [si], '$'
    call lineBreak
    ret

handleBackspace:
    cmp cx, 0            ; nothing to delete
    je readPasswordChar
    dec si
    dec cx
    mov ah, 02h          ; erase: back, space, back
    mov dl, 8
    int 21h
    mov dl, ' '
    int 21h
    mov dl, 8
    int 21h
    jmp readPasswordChar`,
    },
]

export const getProjectById = (id: string) => projects.find(p => p.id === id)

export const getFeaturedProjects = () => projects.filter(p => p.featured)

export const getNextProject = (id: string) => {
    const i = projects.findIndex(p => p.id === id)
    return projects[(i + 1) % projects.length]
}

export const coverOf = (p: Project, size: 'lg' | 'sm' = 'lg', card = false) => {
    const name = card && p.cardCover ? p.cardCover : p.gallery[0]
    return name ? `media/${p.id}/${name}${size === 'sm' ? '-sm' : ''}.webp` : undefined
}
