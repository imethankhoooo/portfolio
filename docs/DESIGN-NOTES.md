# Portfolio 重设计 · 设计笔记

> 目标：炫酷、专业、**没有 AI 模板感**。
> 方法：先拆解 2025–2026 年获奖 / 被广泛引用的 portfolio，找出"为什么好看"，再融合成一套属于 Ethan 自己的设计语言。

---

## 1. 参考样本 & 拆解

| 参考 | 结构 | 为什么好看（可迁移的原则） |
|---|---|---|
| **Mat Voyce**（Awwwards SOTD / FWA SOTD，GSAP SOTY 2025 提名） | 三个板块各用不同布局，而不是一套模板套到底；动态字体（kinetic type）作为主视觉 | **字体本身就是视觉**，不靠插图和渐变。不同内容用不同版式，节奏感强 |
| **Joffrey Spitzer**（Codrops 2026.02 案例） | Astro + GSAP；SplitText 按行遮罩显示文字、Flip 过渡、Lenis 平滑滚动 | "克制、精确"：极简 + 一点粗野主义的硬边。动效小而准，全部服务于阅读顺序 |
| **Dennis Snellenberg**（被大量模仿的 portfolio） | 大号名字 + 作品索引列表 + hover 浮动预览图 + 磁吸按钮 + 页面切换幕布 | **交互细节**决定高级感：鼠标对名字有反应、按钮有磁性、页面之间有过渡 |
| **Rauno Freiberg**（Vercel Staff Design Engineer） | 暗色界面，像一个操作系统（dock、音效、横向画廊） | 工程师 portfolio 的高级感来自"**像一个精心打磨的产品**"，而不是一张海报 |
| **Bruno Simon** 等 3D/WebGL 站 | 整个站是一个可交互世界 | 记忆点极强，但成本高、对招聘方不友好；**只借"一个记忆点"的思路，不照搬 3D** |
| 2026 趋势文章（Tactile Brutalism / 编辑排版） | 视口级大字、1px 细线、可见网格、胶片颗粒、等宽字体进入编辑排版 | 柔和玻璃拟态（Soft UI）正在退潮，**锐利几何 + 细线 + 颗粒**成为高级感新信号 |

### 共同点（它们为什么"不像模板"）

1. **一个主角**：要么是字体，要么是作品，绝不是渐变背景 + 玻璃卡片。
2. **信息以"索引 / 目录"呈现**：像杂志、像档案（No. / Title / Category / Stack），显得有体系。
3. **少色**：黑白灰 + 1 个强调色，色彩只用来指路。
4. **细节交互**：自定义光标带上下文标签、磁吸按钮、hover 预览、页面过渡。
5. **真实内容**：具体的系统、具体的数字，而不是"Passionate developer turning ideas into reality"。

---

## 2. 旧版问题诊断（为什么有 AI 模板感）

- 蓝紫粉渐变 + 模糊光斑背景 + 玻璃拟态卡片 → 2023–2024 年 AI 生成站点的标志性组合
- `gradient-text` 渐变文字、emoji 图标（🎓 🤖 🚀）
- "Hi, I'm Ethan" + 头像卡片 + 三列统计（`10+ / 3 / ∞`）——"∞ Passion" 这类数据是空的
- 圆角卡片三列网格，每个区块长得一样，没有节奏
- 文案泛泛："Building Ideas into Digital Reality"

---

## 3. 新设计语言：**"Systems Editorial"**

> 定位：Ethan 做的是 ERP、CRM、SMS 网关、离线 AI——**别人看不见、但每天在跑的系统**。
> 所以视觉 = 杂志式编辑排版（专业、可信）+ 工程蓝图细节（网格线、坐标、等宽标注）。

### 色彩
| Token | 值 | 用途 |
|---|---|---|
| `--ink` | `#0D0D0C` | 主背景（暖黑，不是纯黑） |
| `--paper` | `#ECEAE4` | 主文字 / Footer 反色背景（纸张白） |
| `--signal` | `#FF4F1F` | 唯一强调色（信号橙）——只用于状态点、hover、关键词 |
| `--line` | paper 14% | 1px 细线、网格 |

### 字体
- **Archivo（可变字体，wdth 62–125 / wght 100–900）**：标题。窄体 + 大字号 = 杂志感；鼠标靠近名字时字母的**字重和字宽实时变化**（动态字体，借鉴 Mat Voyce）。
- **Instrument Serif Italic**：只用来点缀极少数词（如 "behind a login screen"），制造编辑排版的反差。
- **JetBrains Mono**：所有标注、编号、元数据——工程师身份的暗示。
- **Noto Sans SC**：中文。

### 结构（首页）
1. **Preloader**：等宽计数 000→100，幕布上拉（仅首次访问）。
2. **Hero**：满屏宽的 `ETHAN KHOO`（字母跟随鼠标改变粗细/宽度）+ 12 栏元信息（身份 / 地点 / 状态 / 本地时间）。背景是可见的 12 栏网格线 + 十字坐标。
3. **Manifesto**：一大段宣言，**随滚动逐词点亮**。
4. **Selected Work**：4 个精选项目以**全屏卡片堆叠**（sticky stack），后一张盖上前一张时前一张缩小变暗。
5. **Index**：全部 9 个项目的档案式列表，hover 时**浮动预览图跟随光标**并按速度倾斜。
6. **Capabilities + 数字**：真实数据（2,783 行 x86 汇编、8B 参数本地模型、3 个上线站点），滚动计数。
7. **Footer**：反色纸张背景 + 巨型邮箱链接 + 磁吸按钮 + 本地时间（GMT+8）。

### 交互细节
- Lenis 平滑滚动 + GSAP ScrollTrigger（同步 ticker）
- SplitText 按行遮罩显示标题
- 自定义光标：小圆点，hover 项目时展开成带 "View" / "Open" 标签的胶囊（mix-blend-mode: difference）
- 页面切换：幕布覆盖 → 显示目标页名称 → 揭开
- 胶片颗粒覆盖层（SVG noise）
- `prefers-reduced-motion`：关闭平滑滚动、preloader、所有 scrub 动画，直接显示终态

### 性能
- 原始 PNG（约 45 MB）→ WebP（1.4 MB，大图 1920w + 小图 880w）
- 演示视频重新编码为 720p 静音 H.264 faststart（1.1 MB / 2.6 MB），`preload="none"` + poster

---

## 4. 参考来源
- Awwwards Portfolio 获奖列表：https://www.awwwards.com/websites/portfolio/
- Hon Tran（Awwwards 2026 评委）· 10 Best Award-Winning Websites of 2026：https://www.hontran.dev/blog/best-award-winning-websites-2026
- Mat Voyce 案例：https://www.hontran.dev/blog/mat-voyce-case-study-award-winning-portfolio
- Codrops · Joffrey Spitzer Portfolio（2026.02）：https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/
- Codrops · From Shader Uniforms to Clip-Path Wipes（2026.05）：https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/
- Rauno Freiberg 介绍：https://uiuxshowcase.com/portfolio/rauno-freiberg/
- 2026 趋势（Tactile Brutalism）：https://fireart.studio/blog/the-best-web-design-trends/
- Brutalist Web Design 2026：https://brainy.ink/paper/brutalist-web-design-2026
