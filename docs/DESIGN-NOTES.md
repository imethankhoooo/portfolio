# Portfolio 重设计 · 设计笔记

> v2 方向：**科技 / 科幻（Mission Control）**。
> v1 的"编辑排版"方向被否决（太像杂志），本版改为 FUI/HUD 驱动的科幻界面，同时保持专业、可读，避免廉价的霓虹赛博朋克模板感。

---

## 1. 参考与拆解

| 参考 | 可迁移的原则 |
|---|---|
| **FUI（Fantasy User Interface，电影/游戏界面设计）** | 界面元素来自真实的雷达、驾驶舱、医疗、工业读数，再改造成"讲故事的道具"。词汇：遥测数据、准星、网格、扫描、半透明叠层。 |
| **FUI 配色惯例** | 半透明的青 / 琥珀 / 绿叠在深蓝黑上；红色只留给锁定、危险、失败状态。 |
| **WebGL 粒子作品集**（Awwwards 上的 Julie Guzal、Salt and Pepper 的粒子 Hero、Equinox 太空主题站） | 一个"可交互的 3D 主角"就足以撑起整站的科幻感；粒子随鼠标反应让页面"活着"。 |
| **Codrops 2026 案例**（Joffrey Spitzer / Thibault Guignand） | 动效要克制精准：文字遮罩显现、clip-path 擦除、平滑滚动，服务阅读顺序。 |
| **v1 中保留下来的**（Dennis Snellenberg 式交互） | 项目索引 + 浮动预览、磁吸按钮、页面切换幕布、上下文光标。 |

### 为什么这些站"科幻但不廉价"
1. **一个主角**：一个会变形的粒子星球，而不是满屏霓虹。
2. **信息即装饰**：坐标、时钟、滚动深度、路由——每个 HUD 元素都显示真实数据。
3. **克制配色**：冰青为主，琥珀只标记"企业系统/内部"状态，没有紫粉渐变。
4. **可读性优先**：正文用 IBM Plex Sans，HUD 字体只用于标签和标题。

---

## 2. 设计语言：Mission Control

### 色彩
| Token | 值 | 用途 |
|---|---|---|
| `--void` | `#04070b` | 深蓝黑背景 |
| `--fg` | `#dbe9f0` | 冷白正文 |
| `--cyan` | `#6fe3ff` | 冰青遥测色：强调、交互、粒子 |
| `--amber` | `#ffb02e` | 状态标记（企业系统）、少量琥珀粒子 |
| `--line` / `--line-strong` | 青色 12% / 32% | 细线、面板边框、角标 |

### 字体
- **Saira**（可变宽度/字重）：标题。干净的科技感几何字，正常宽度、长标题用大小写混排，保证易读。
- **IBM Plex Sans**（400 起）：正文。工程背景、可读性强。
- **JetBrains Mono**：所有 HUD 标签、编号、遥测数据。
- **Doto**：点阵数字（计数器、本地时钟），像设备上的 LED 屏。

### 签名元素：会变形的粒子场（three.js）
固定在页面背后的 9000 个粒子（手机 4200 个），**每个区块用 `data-shape` 声明自己的形态**，滚动时粒子会溶解并重组：

| 区块 | 形态 | 含义 |
|---|---|---|
| Hero | 带轨道环的星球 | "系统本身" |
| 宣言 | 起伏的地形网格 | 数据底层 |
| 作品 / 索引 | 3×3×3 晶格立方体 | 结构化系统 |
| 能力 / 数字 | 双螺旋 | 模块 / 构建块 |
| 页脚 | 星环 / 传送门 | "建立通讯" |

- 粒子在鼠标附近被推开；镜头随鼠标轻微视差；滚动速度会加快旋转。
- 主要区块之外粒子自动变暗，不干扰阅读。
- three.js 懒加载（单独 chunk），首屏不被阻塞；标签页隐藏时暂停渲染。

### HUD 层
- **开机序列**：终端日志逐行输出 + 点阵计数器 000→100 + CRT"开机"收束动画（仅每次会话首次）。
- **解码文字**：标题、导航、项目名在出现或悬停时随机字符滚动后锁定。
- **固定 HUD 框**：四角括号、左侧随滚动移动的刻度尺、实时鼠标坐标、滚动深度、当前路由。
- **准星光标**：圆环 + 四刻度；悬停项目时变成 `[ VIEW ]` 标签框。
- **页面切换**：带扫描光边的深色面板上扫，显示 `LOADING ROUTE` 和目标页名。

### 结构（首页）
1. Hero：左侧 `ETHAN` 实心 + `KHOO` 线框字，右侧粒子星球与三个模块标注
2. `[01]` 宣言：滚动逐词点亮
3. 技术栈跑马灯（描边字 + 速度响应）
4. `[02]` 精选作品：`FILE_01/04` 任务档案卡片堆叠，状态灯（上线=青，企业=琥珀）
5. `[03]` 档案索引：数据表 + 悬停解码 + 扫描线预览
6. `[04]` 模块：BUILD / SHIP / AUTOMATE 三个面板
7. `[05]` 数字：点阵 LED 计数
8. `[06]` 通讯：`> mailto:` 终端式邮箱、点阵本地时钟

### 可读性规则（v2.1）
炫酷效果只放在背景和装饰层，文字永远干净：
- 不在文字上加发光（text-shadow），不在全页和截图上叠扫描线
- 标题用正常宽度字形；项目名等长标题不全大写
- 正文不低于 400 字重；HUD 标签 12px、对比度 ≥ 76%
- 粒子在阅读区块自动降到 32%–60% 亮度；文字较多的页面不把亮星球放在段落后面
- 滚动点亮的宣言，未点亮文字保持 32% 透明度仍可读

### 无障碍与性能
- `prefers-reduced-motion`：跳过开机序列和解码动画，粒子静止，所有过渡为 0s。
- 无 WebGL 时自动降级为纯背景，页面照常可用。
- 图片 WebP（约 45 MB PNG → 1.4 MB），演示视频 720p 静音 faststart。

---

## 3. 参考来源
- FUI/HUD 设计趋势：https://trends.daisyui.com/trend/fui-hud/
- 未来感/推测式 UI 趋势：https://trends.daisyui.com/futuristic-speculative-ui/
- FUI 叙事（No Film School）：https://nofilmschool.com/storytelling-through-fantasy-user-interfaces
- Awwwards · Julie Guzal 粒子作品集：https://www.awwwards.com/inspiration/julie-guzal-portfolio-reactive-cursor-animation-particles
- Awwwards · Interactive WebGL particles on Hero：https://www.awwwards.com/inspiration/interactive-webgl-particles-on-hero-image-salt-and-pepper
- Best Three.js Portfolio Examples (2026)：https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025
- Codrops · Joffrey Spitzer Portfolio：https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/
- Codrops · From Shader Uniforms to Clip-Path Wipes：https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/
