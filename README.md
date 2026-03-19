# Web3 Intern Plan

一个基于 [Layer3](https://layer3.xyz) 风格的 **Moledao Web3 实习任务平台** 前端 UI，用于管理和追踪 Web3 实习生的链上任务、公会协作与奖励体系。

## 功能模块

- **Discover & Learn** — 浏览和发现 Web3 任务（Swap、Mint、Bridge 等链上操作），支持轮播 Banner 与分类筛选
- **Guilds（公会）** — 创建 / 加入公会，成员管理（邀请、踢出），公会排行与 XP 加成
- **Task Management** — 任务提交（支持截图/文件上传）→ Master 审核（卡片式翻阅）→ 链上凭证验证
- **Leaderboard** — XP / Cubes 全局排行榜，支持时间区间筛选
- **Rewards** — 查看 XP 收益统计、任务完成数据、Cuber NFT 奖励概览
- **Profile** — 个人资料编辑，社交账号绑定（Twitter / Discord / Farcaster / GitHub 等）
- **Admin Dashboard** — 管理员后台（任务 CRUD、Banner 管理、平台配置、学生预览模式）
- **Login** — 登录弹窗（Email + 密码 / GitHub / Google 社交登录），后续将对接 Moledao 统一认证

### UI 特色

- 深色 / 浅色主题一键切换
- 3D 卡片悬浮效果 & 光晕追踪动画
- 翻转文字动画（FlipWords）
- 输入框鼠标跟随高亮特效
- Framer Motion 页面过渡 & 卡片堆叠翻阅动画
- 未登录 / 已登录状态差异化 UI

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 4 |
| 动画 | Framer Motion (motion) |
| 图标 | Lucide React / Tabler Icons |
| UI 组件 | Radix UI (Label) |
| AI | Google Gemini API (可选) |

## 项目结构

```
src/
├── components/             # 通用组件
│   ├── ui/                 # UI 基础组件
│   │   ├── 3d-card.tsx     # 3D 悬浮卡片
│   │   ├── flip-words.tsx  # 翻转文字
│   │   ├── shiny-button.tsx# 闪光按钮
│   │   ├── input.tsx       # 鼠标跟随高亮输入框
│   │   ├── label.tsx       # 表单标签 (Radix UI)
│   │   └── signup-form-demo.tsx # 登录表单
│   ├── Sidebar.tsx         # 侧边导航栏（Moledao Logo + 导航菜单）
│   ├── TopBar.tsx          # 顶部栏（搜索、主题切换、登录/用户菜单）
│   ├── RightPanel.tsx      # 右侧面板（日历签到、GM Streak、Cuber 余额）
│   ├── QuestCard.tsx       # 任务卡片
│   └── GlowOverlay.tsx     # 光晕跟踪效果
├── pages/                  # 页面
│   ├── Discover.tsx        # 发现页（首页，Banner 轮播 + 任务列表）
│   ├── Guilds.tsx          # 公会列表
│   ├── CreateGuild.tsx     # 创建公会
│   ├── MyGuild.tsx         # 我的公会（成员管理 + 任务审核）
│   ├── GuildDetail.tsx     # 公会详情
│   ├── Leaderboard.tsx     # 排行榜
│   ├── Rewards.tsx         # 奖励统计
│   ├── Profile.tsx         # 个人资料
│   ├── EditProfile.tsx     # 编辑资料
│   ├── Leagues.tsx         # 联赛等级
│   ├── Collection.tsx      # 任务合集
│   ├── TaskPage.tsx        # 任务详情（提交 → 审核 → 领奖 → Mint）
│   └── AdminDashboard.tsx  # 管理后台
├── lib/
│   └── utils.ts            # 工具函数（cn class merge）
├── types.ts                # TypeScript 类型定义
├── App.tsx                 # 应用入口 & 路由 & 登录状态
├── main.tsx                # 渲染入口
└── index.css               # 全局样式
```

## 快速开始

### 环境要求

- Node.js >= 18

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/Hickerzeed/web3internplan.git
cd web3internplan

# 安装依赖
npm install

# （可选）配置 Gemini API Key
cp .env.example .env.local
# 编辑 .env.local 填入你的 GEMINI_API_KEY

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看应用。

### 其他命令

```bash
npm run build     # 生产构建
npm run preview   # 预览生产构建
npm run lint      # TypeScript 类型检查
```

## 后续规划

### 后端（Go + Gin + GORM）

- 用户认证：对接 [Moledao Servers] 的 JWT 认证体系，共享 Token 验证
- 任务 CRUD、公会管理、XP 积分、排行榜等 API
- 数据库设计与用户数据同步

### 智能合约

- ERC-721 Cuber NFT：任务完成后 Mint 成就 NFT

## License

Apache-2.0
