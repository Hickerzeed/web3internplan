# Web3 Intern Plan

一个基于 [Layer3](https://layer3.xyz) 风格的 **Moledao Web3 实习任务平台** 前端 UI，用于管理和追踪 Web3 实习生的链上任务、公会协作与奖励体系。

## 功能模块

### 学生端

- **Discover & Learn** — 浏览和发现 Web3 任务，支持 Banner 轮播、分类筛选（General / Technical / Operational / Bounty）、横向滚动浏览
- **My Tasks** — 个人任务追踪页，支持按状态筛选（In Progress / Pending Review / Approved / Rejected）、搜索、拒绝原因悬浮提示
- **Task Flow** — 任务提交（截图/文件上传）→ TA 审核 → 领取 XP → Mint Cuber NFT 完整流程
- **Guilds（公会）** — 浏览公会列表、查看详情、申请加入、创建新公会
- **My Guild** — 公会内部管理：成员列表、任务审核（卡片堆叠翻阅）、加入申请审批、活动日志
- **Leaderboard** — XP / Cubes 全局排行榜，领奖台动画
- **Rewards** — XP 收益统计、任务完成数据、Cuber NFT 奖励概览
- **Profile** — 个人资料编辑，社交账号绑定（Twitter / Discord / Farcaster / GitHub）

### 管理员端（Admin Dashboard）

- **Quests & Tasks** — 任务 CRUD（标题、描述、分类、难度、XP/Cuber 奖励、时间管理），学生预览模式
- **Hero Banners** — 首页 Banner 全功能管理（新建 / 编辑 / 删除），与 Discover 页实时同步
- **Bounty Review** — Bounty 类任务提交审核（按 Bounty 筛选、查看凭证、批准/拒绝）

### UI 特色

- 深色 / 浅色主题一键切换
- 动态网格背景动画（Animated Grid Pattern）
- 全局光晕漂浮效果（pulse-slow / blob 动画）
- 3D 卡片悬浮 & 鼠标跟随高亮输入框
- 翻转文字动画（FlipWords）& 卡片堆叠翻阅
- 横向滚动箭头导航（Quest Sections）
- 头像堆叠组件（Avatar Circles）& 跟随指针组件
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
| 工具 | jsrepo |
| AI | Google Gemini API (可选) |

## 项目结构

```
src/
├── components/
│   ├── ui/                        # UI 基础组件
│   │   ├── animated-grid-pattern.tsx  # 动态网格背景
│   │   ├── avatar-circles.tsx     # 头像堆叠展示
│   │   ├── following-pointer.tsx   # 鼠标跟随指针
│   │   ├── 3d-card.tsx            # 3D 悬浮卡片
│   │   ├── flip-words.tsx         # 翻转文字
│   │   ├── shiny-button.tsx       # 闪光按钮
│   │   ├── input.tsx              # 鼠标跟随高亮输入框
│   │   ├── label.tsx              # 表单标签 (Radix UI)
│   │   └── signup-form-demo.tsx   # 登录表单
│   ├── ElectricBorder.jsx/.css    # 电光边框特效
│   ├── Sidebar.tsx                # 侧边导航栏
│   ├── TopBar.tsx                 # 顶部栏
│   ├── RightPanel.tsx             # 右侧面板（签到、GM Streak）
│   ├── QuestCard.tsx              # 任务卡片
│   └── GlowOverlay.tsx            # 光晕跟踪效果
├── pages/
│   ├── Discover.tsx               # 发现页（Banner + 分类 + 横向滚动任务列表）
│   ├── MyTasks.tsx                # 我的任务（状态筛选 + 搜索）
│   ├── Guilds.tsx                 # 公会列表
│   ├── CreateGuild.tsx            # 创建公会
│   ├── MyGuild.tsx                # 我的公会（成员管理 + 任务审核 + 加入审批）
│   ├── GuildDetail.tsx            # 公会详情
│   ├── Leaderboard.tsx            # 排行榜
│   ├── Rewards.tsx                # 奖励统计
│   ├── Profile.tsx                # 个人资料
│   ├── EditProfile.tsx            # 编辑资料
│   ├── Leagues.tsx                # 联赛等级
│   ├── Collection.tsx             # 任务合集
│   ├── TaskPage.tsx               # 任务详情（提交 → 审核 → 领奖 → Mint）
│   └── AdminDashboard.tsx         # 管理后台（任务/Banner/Bounty 审核）
├── lib/
│   └── utils.ts                   # 工具函数
├── types.ts                       # TypeScript 类型定义
├── App.tsx                        # 应用入口 & 全局状态
├── main.tsx                       # 渲染入口
└── index.css                      # 全局样式 & 动画
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
