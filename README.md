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

## 合约开发

仓库现在已经补了独立的 `contracts/` 子工程，用于实现任务完成后的成就 NFT。

- 主合约：`contracts/src/CuberAchievementNFT.sol`
- 测试：`contracts/test/CuberAchievementNFT.t.sol`
- 配置：`contracts/foundry.toml`

设计重点：

- 使用 `ERC-721` 记录学生完成任务后的链上成就
- 采用 EIP-712 签名授权领取，避免开放式公开 mint
- 同一用户对同一任务只能 mint 一次
- 审核与 proof 校验保留在链下，链上只负责发放

初始化依赖示例：

```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts
forge install foundry-rs/forge-std
forge test
```

仓库还包含：

- Foundry 部署脚本：`contracts/script/DeployCuberAchievementNFT.s.sol`
- 后端签名参考：`contracts/examples/sign-mint-request.ts`
- 本地签名 API：`server/mint-signature-api.ts`

更详细的接口、部署方式和签名流程说明见 `contracts/README.md`。

### 本地启动签名服务

前端真实调用 `mintWithSignature` 时，需要后端先返回 `request + signature`。仓库里已经提供了一个最小可跑的本地签名服务：

```bash
npm run dev:signer
```

对应环境变量见 `.env.example`，默认接口地址为：

```txt
http://localhost:8080/api/contracts/cuber-achievement/mint-request
```

默认监听 `127.0.0.1:8080`，可通过 `MINT_SIGNATURE_API_HOST` 和 `MINT_SIGNATURE_API_PORT` 调整。

这个服务和前端当前默认按 `Arbitrum Sepolia` 联调。真正上线前需要把“TA 审核通过”和 proof 校验接进来。

现在前端里的 MyGuild 审核操作也会同步到这个服务。只有当 TA 在公会任务审核里把某个任务标记为通过后，签名接口才会对该钱包和该任务返回 `request + signature`。

## License

Apache-2.0
