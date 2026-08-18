# 📖 VSCode Plugin 文档站

本目录是 [eastgold15/vscode-plugin](https://github.com/eastgold15/vscode-plugin) 仓库的文档站，用 [Blume](https://github.com/haydenbleasel/blume) 搭。Astro 静态站点，全站无后端。

## 本地开发

```bash
bun install
bun run dev        # http://localhost:3000
```

其他脚本：

```bash
bun run build      # 静态构建到 dist/
bun run type-check  # tsc --noEmit
bun run clean      # 清掉 build 产物与缓存
```

## 目录结构

```
apps/docs/
├── content/                       # 所有文档
│   ├── introduction.mdx           # 入口
│   ├── create-vscodep/            # CLI 指南
│   │   ├── meta.ts
│   │   ├── quickstart.mdx
│   │   ├── options.mdx
│   │   ├── linter.mdx
│   │   └── deps-system.mdx
│   ├── gen/                       # vscodep gen 命令
│   │   ├── meta.ts
│   │   ├── index.mdx
│   │   ├── nls.mdx
│   │   └── vscode-dts.mdx
│   ├── libs/                      # 3 个运行时库
│   │   ├── meta.ts
│   │   ├── vscode-utils.mdx
│   │   ├── vscode-webview.mdx
│   │   └── vite-plugin-vscode.mdx
│   ├── contributing/index.mdx     # 贡献指南
│   ├── release/index.mdx          # 发版流程
│   ├── api/                       # typedoc 自动生成（不要手改）
│   └── meta.ts                    # 顶层导航顺序
├── pages/
│   └── index.astro                # 首页（landing）
├── components/home/              # landing 用的组件
├── blume.config.ts                # 站点配置：导航、redirect、字体、主题
└── typedoc.json                   # typedoc 配置
```

## 内容组织

每个一级目录对应 sidebar 一个分组。分组内页面顺序由该目录的 `meta.ts` 控制（`pages: [...]`）。

顶层（`/docs` 路径下）的顺序由 `content/meta.ts` 控制。

## 写一篇新文档

1. 在合适目录下创建 `.mdx`
2. 在该目录的 `meta.ts` 的 `pages` 数组加文件名（不含扩展名）
3. 顶部 frontmatter：

```mdx
---
title: 标题（侧栏显示）
description: SEO 描述
---
```

4. 跑 `bun run dev` 看效果

## API 文档

`/api` 路径下的内容由 typedoc 自动生成，**不要手改**。改 `typedoc.json` 加/减 entry point。

跑 `bun run typedoc`（或 `bun run build`）会重生成 `content/api/`。

## 部署

Vercel 通过 Blume Vercel adapter 自动部署。`vercel.json` 只配 bun 版本与输出目录。

每次 GitHub Release 发布时，`.github/workflows/docs-redeploy.yml` 触发一次 Vercel deploy hook。
