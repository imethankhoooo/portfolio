export interface Project {
    id: string
    type: 'live' | 'internal' | 'academic'
    featured?: boolean
    image?: string
    gradient: string
    tags: string[]
    title: {
        en: string
        zh: string
    }
    description: {
        en: string
        zh: string
    }
    link?: string
}

export const projects: Project[] = [
    // ============ LIVE SITES ============
    {
        id: 'kathok',
        type: 'live',
        featured: true,
        gradient: 'linear-gradient(135deg, #1E3A5F, #3B82F6)',
        image: 'img/噶玛/index.png',
        tags: ['HTML/CSS/JS', 'Responsive', 'Multilingual'],
        title: {
            en: 'Kathok Buddhist Center',
            zh: '噶陀佛教中心官网',
        },
        description: {
            en: "Official website for Malaysia's Tibetan Buddhist center. Modern design with traditional cultural content, multilingual support, event calendar and online registration.",
            zh: '为马来西亚藏传佛教中心设计开发的官方网站。采用现代设计语言呈现传统文化内容，支持多语言切换，实现活动日历与在线报名功能。',
        },
        link: 'https://kathok.org.my/Kathok-Website%20-%20online/index.html',
    },
    {
        id: 'primesms',
        type: 'live',
        gradient: 'linear-gradient(135deg, #065F46, #34D399)',
        image: 'img/sms/index.png',
        tags: ['Laravel', 'MySQL', 'API'],
        title: {
            en: 'PrimeSMS Platform',
            zh: 'PrimeSMS 短信平台',
        },
        description: {
            en: 'Enterprise SMS service platform for Indonesian market. Bulk messaging, API integration, and analytics.',
            zh: '印尼市场的企业级 SMS 服务平台，提供批量短信发送、API 接口和数据分析功能。',
        },
        link: 'https://primesms.id/',
    },
    {
        id: 'mage-ai-media',
        type: 'live',
        gradient: 'linear-gradient(135deg, #4C1D95, #A78BFA)',
        image: 'img/mage/index.png',
        tags: ['React', 'Node.js', 'AI'],
        title: {
            en: 'Mage AI Media',
            zh: 'Mage AI Media',
        },
        description: {
            en: 'AI-powered media content platform with advanced content generation and management features.',
            zh: 'AI 驱动的媒体内容平台，集成先进的内容生成和管理功能。',
        },
        link: 'https://www.mageaimedia.com/register.html',
    },

    // ============ INTERNAL / ENTERPRISE ============
    {
        id: 'aiquiz',
        type: 'internal',
        gradient: 'linear-gradient(135deg, #0D9488, #22D3EE)',
        image: 'img/aiquiz/dashboard.png',
        tags: ['Python', 'AI/LLM', 'PDF Parser'],
        title: {
            en: 'AI Quiz Generator',
            zh: 'AI 智能测验系统',
        },
        description: {
            en: 'Smart quiz system: PDF notes parsing, AI-generated quizzes based on content, precise grading, wrong answer tracking and adaptive weakness training.',
            zh: '智能测验系统：PDF 笔记自动解析、基于内容的智能 Quiz 生成、精准批改、错题追踪与自适应弱点训练。',
        },
    },
    {
        id: 'servicenote',
        type: 'internal',
        gradient: 'linear-gradient(135deg, #7C2D12, #FB923C)',
        image: 'img/servicenote/servicenotedashboard.png',
        tags: ['Laravel', 'CRM', 'Dashboard'],
        title: {
            en: 'Service Note System',
            zh: 'Service Note 服务管理系统',
        },
        description: {
            en: 'Enterprise service ticket management with CRM, dashboard analytics and customer tracking.',
            zh: '企业级服务工单管理系统，集成 CRM 功能、仪表板分析和客户追踪。',
        },
    },
    {
        id: 'erp',
        type: 'internal',
        gradient: 'linear-gradient(135deg, #1E40AF, #60A5FA)',
        image: 'img/ERP/ERPproductpage1.png',
        tags: ['Laravel', 'AWS', 'Redis', 'Dusk'],
        title: {
            en: 'ERP System',
            zh: 'ERP 企业资源管理系统',
        },
        description: {
            en: 'Full ERP with product, warehouse, and customer management. Deployed on AWS with Redis caching and Laravel Dusk testing.',
            zh: '全功能 ERP 系统，包含产品管理、仓库管理、客户管理等模块。AWS 部署，Redis 缓存，配有 Dusk 自动化测试。',
        },
    },
    {
        id: 'chatbot',
        type: 'internal',
        gradient: 'linear-gradient(135deg, #4C1D95, #F472B6)',
        image: 'img/AIChatbot/output.png',
        tags: ['Python', 'Llama 8B', 'Local AI'],
        title: {
            en: 'AI Chatbot',
            zh: 'AI Chatbot 本地对话系统',
        },
        description: {
            en: 'Locally deployed Llama 8B model for offline intelligent Q&A on a standard laptop.',
            zh: '在本地笔记本电脑上运行 Llama 8B 模型的 AI 对话系统，实现离线智能问答功能。',
        },
    },

    // ============ ACADEMIC ============
    {
        id: 'java',
        type: 'academic',
        gradient: 'linear-gradient(135deg, #7C2D12, #EF4444)',
        image: 'img/javaass/register.png',
        tags: ['Java', 'OOP', 'CLI'],
        title: {
            en: 'Java CLI System',
            zh: 'Java CLI 管理系统',
        },
        description: {
            en: 'University assignment: Java-based command line management system showcasing OOP design skills.',
            zh: '大学课程作业：基于 Java 的命令行界面管理系统，展示面向对象编程设计能力。',
        },
    },
    {
        id: 'assembly',
        type: 'academic',
        gradient: 'linear-gradient(135deg, #1F2937, #6B7280)',
        tags: ['x86 Assembly', 'System Programming', '2700+ LOC'],
        title: {
            en: 'Assembly - Leisure Club System',
            zh: '汇编语言 - 休闲俱乐部系统',
        },
        description: {
            en: 'Complete club management system written in x86 assembly. Member login, facility booking, staff management. 2700+ lines of low-level code.',
            zh: '使用 x86 汇编语言编写的完整俱乐部管理系统，包含会员登录、设施预订、员工管理等功能。超过 2700 行底层代码。',
        },
    },
]

export const getProjectById = (id: string): Project | undefined => {
    return projects.find(p => p.id === id)
}

export const getProjectsByType = (type: 'live' | 'internal' | 'academic'): Project[] => {
    return projects.filter(p => p.type === type)
}

export const getFeaturedProjects = (): Project[] => {
    return projects.filter(p => p.featured).concat(projects.filter(p => !p.featured)).slice(0, 3)
}
