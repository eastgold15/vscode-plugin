# 快速使用指南

## 本地开发

### 1. 构建脚手架

\`\`\`bash
cd scaffold
bun install
bun run build
\`\`\`

### 2. 测试脚手架

\`\`\`bash
# 交互式模式
node dist/index.js my-extension

# 使用参数
node dist/index.js my-extension --framework=vue --linter=Biome --no-install

# 使用默认值
node dist/index.js my-extension --defaults
\`\`\`

## 发布到 npm

### 1. 更新版本号

\`\`\`bash
cd scaffold
npm version patch  # 或 minor, major
\`\`\`

### 2. 发布

\`\`\`bash
npm publish
\`\`\`

## 全局安装（本地测试）

\`\`\`bash
cd scaffold
bun link

# 在其他项目中使用
bunx create-vscodep my-extension
\`\`\`

## 命令行选项速查

\`\`\`bash
# 基本用法
create-vscodep <project-name> [options]

# 选项
--pm <bun|npm|pnpm|yarn>      # 包管理器
--framework <react|vue>        # 框架
--linter <ESLint|Biome|None>  # Linter
--git                          # 初始化 Git
--vscode                       # 生成 VSCode 配置
--install                      # 安装依赖
--no-install                   # 不安装依赖
--defaults                     # 使用默认值
\`\`\`

## 常见使用场景

### 场景 1：快速原型

\`\`\`bash
create-vscodep prototype --defaults --no-install
\`\`\`

### 场景 2：React 项目 + ESLint

\`\`\`bash
create-vscodep my-app --framework=react --linter=ESLint
\`\`\`

### 场景 3：Vue 项目 + Biome

\`\`\`bash
create-vscodep my-app --framework=vue --linter=Biome --pm=pnpm
\`\`\`

### 场景 4：完整项目（包含 VSCode 配置）

\`\`\`bash
create-vscodep my-ext --framework=react --linter=ESLint --git --vscode
\`\`\`
