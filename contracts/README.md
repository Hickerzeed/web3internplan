# Contracts

这个目录承载 Web3 Intern Plan 的链上部分，当前第一期实现是一个受控发放的成就 NFT 合约：

- 合约：`CuberAchievementNFT`
- 标准：`ERC-721`
- 领取方式：后台签名授权领取，或管理员兜底代 mint
- 去重规则：同一用户对同一 `taskId` 只能 mint 一次

## 设计边界

- 审核、任务 proof、XP 计算保留在链下
- 合约只负责验证发放资格并铸造成就 NFT
- `taskId` 使用稳定的 `bytes32` 业务 ID，不直接依赖前端标题文案

## 目录

- `src/CuberAchievementNFT.sol`: 主合约
- `test/CuberAchievementNFT.t.sol`: 核心测试
- `script/DeployCuberAchievementNFT.s.sol`: Foundry 部署脚本
- `examples/sign-mint-request.ts`: 后端签名示例
- `foundry.toml`: Foundry 配置

## 本地初始化

先安装 Foundry，然后在 `contracts/` 下安装依赖：

```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install foundry-rs/forge-std
```

部署前可复制环境模板：

```bash
cp .env.example .env
```

这个实现使用了以下 import 别名：

- `@openzeppelin/contracts/...`
- `forge-std/...`

如果你偏好 remappings，可以在本地执行：

```bash
forge remappings > remappings.txt
```

## 关键接口

```solidity
function mintWithSignature(MintRequest calldata request, bytes calldata signature)
    external
    returns (uint256 tokenId);

function adminMint(address to, bytes32 taskId, string calldata metadataURI)
    external
    returns (uint256 tokenId);

function hasMinted(address user, bytes32 taskId) external view returns (bool);
function claimKey(address user, bytes32 taskId) public pure returns (bytes32);
function hashMintRequest(MintRequest calldata request) external view returns (bytes32);
```

`MintRequest` 字段：

- `to`: NFT 接收者
- `taskId`: 任务唯一 ID，建议由后端生成并持久化
- `metadataURI`: 成就 metadata 地址
- `deadline`: 签名过期时间

## 部署

部署脚本位于 `script/DeployCuberAchievementNFT.s.sol`，依赖以下环境变量：

- `PRIVATE_KEY`: 部署钱包私钥
- `ADMIN_ADDRESS`: 合约管理员地址
- `SIGNER_ADDRESS`: 后端 EIP-712 签名地址
- `BASE_URI`: fallback metadata 前缀
- `ARBITRUM_SEPOLIA_RPC_URL`: Arbitrum Sepolia RPC

示例：

```bash
forge script script/DeployCuberAchievementNFT.s.sol:DeployCuberAchievementNFT \
  --rpc-url $ARBITRUM_SEPOLIA_RPC_URL \
  --broadcast
```

Arbitrum Sepolia 广播命令：

```bash
source .env
forge script script/DeployCuberAchievementNFT.s.sol:DeployCuberAchievementNFT \
  --rpc-url $ARBITRUM_SEPOLIA_RPC_URL \
  --broadcast
```

## 后端签名流程

1. 学生提交 proof
2. 后端/TA 审核通过
3. 后端构造 `MintRequest`
4. 后端按 EIP-712 对请求签名
5. 前端调用 `mintWithSignature`

EIP-712 域：

- `name`: `Moledao Cuber Achievement`
- `version`: `1`

类型哈希：

```solidity
MintRequest(address to,bytes32 taskId,bytes32 metadataURIHash,uint256 deadline)
```

注意这里不是直接签原始字符串，而是签 `keccak256(bytes(metadataURI))`。

`examples/sign-mint-request.ts` 给了一个基于 `viem` 的后端签名参考。真正对接时，后端应该先计算：

```ts
const metadataURIHash = keccak256(toBytes(metadataURI));
```

然后再把这个 hash 放进 EIP-712 message 中签名。

## 前端调用

前端拿到后端返回的 `request + signature` 后，直接调用：

```solidity
mintWithSignature(request, signature)
```

如果后端已经完成审核但用户不方便自己发起交易，也可以由拥有 `MINTER_ROLE` 的平台地址调用 `adminMint` 兜底发放。

前端环境变量：

- `VITE_ARBITRUM_SEPOLIA_RPC_URL`
- `VITE_CUBER_NFT_CONTRACT`
- `VITE_CUBER_SIGNATURE_API`

## 一期未覆盖

- 链上 XP / Cubes
- 公会积分与成员关系上链
- NFT 升级、合成、装备系统
- 多链部署编排
