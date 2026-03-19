# Web3 Intern Plan

一个基于 [Layer3](https://layer3.xyz) 风格的 **Moledao Web3 实习任务平台** 前端 UI，用于管理和追踪 Web3 实习生的链上任务、公会协作与奖励体系。

## 预览

### 主要功能模块

- **Discover & Learn** — 浏览和发现 Web3 任务（Swap、Mint、Bridge 等链上操作）
- **Guilds（公会）** — 创建 / 加入公会，成员管理，公会排行
- **Task Management** — 任务提交、审核流程（Master 审批 + 链上凭证验证）
- **Leaderboard** — XP / Cubes 全局排行榜
- **Rewards** — 查看 XP 收益统计与奖励
- **Profile** — 个人资料编辑，社交账号绑定（Twitter / Discord / Farcaster 等）
- **Admin Dashboard** — 管理员后台

### UI 特色

- 深色 / 浅色主题切换
- 3D 卡片悬浮效果 & 光晕动画
- 翻转文字动画（FlipWords）
- Framer Motion 流畅过渡动画
- 完全响应式布局

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 4 |
| 动画 | Framer Motion (motion) |
| 图标 | Lucide React |
| AI | Google Gemini API (可选) |

## 项目结构

```
src/
├── components/          # 通用组件
│   ├── ui/              # UI 基础组件（3D卡片、翻转文字、闪光按钮）
│   ├── Sidebar.tsx      # 侧边导航栏
│   ├── TopBar.tsx       # 顶部栏（搜索、主题切换、用户信息）
│   ├── RightPanel.tsx   # 右侧面板
│   ├── QuestCard.tsx    # 任务卡片
│   └── GlowOverlay.tsx  # 光晕效果
├── pages/               # 页面
│   ├── Discover.tsx     # 发现页（首页）
│   ├── Guilds.tsx       # 公会列表
│   ├── CreateGuild.tsx  # 创建公会
│   ├── MyGuild.tsx      # 我的公会（任务管理）
│   ├── GuildDetail.tsx  # 公会详情
│   ├── Leaderboard.tsx  # 排行榜
│   ├── Rewards.tsx      # 奖励
│   ├── Profile.tsx      # 个人资料
│   ├── EditProfile.tsx  # 编辑资料
│   ├── Leagues.tsx      # 联赛
│   ├── Collection.tsx   # 合集
│   ├── TaskPage.tsx     # 任务详情
│   └── AdminDashboard.tsx # 管理后台
├── types.ts             # TypeScript 类型定义
├── App.tsx              # 应用入口 & 路由
├── main.tsx             # 渲染入口
└── index.css            # 全局样式
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

## License

Apache-2.0
