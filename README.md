<div align="center">
  <h1><code>🦊</code> VSCode Plugin Monorepo</h1>
  <strong>VSCode 扩展开发工具链：脚手架 CLI、Vite 插件与运行时库</strong>
</div>

## Packages

| 包 | 角色 |
| --- | --- |
| [`@eastgold15/vscode-utils`](./packages/vscode-utils/README.md) | 扩展主进程运行时工具：i18n、配置管理 |
| [`@eastgold15/vscode-webview`](./packages/vscode-webview/README.md) | Webview ↔ 扩展通信的客户端 API |
| [`@eastgold15/vite-plugin-vscode`](./packages/vite-plugin-vscode/README.md) | Vite 插件，一键构建扩展主进程 + Webview |
| `@eastgold15/vscodep-cli`（计划中） | 脚手架 CLI，包含 `create` 与 `gen` 两个子命令 |
| [`apps/docs`](./apps/docs) | 文档站 |
| [`examples/vscode-i18n`](./examples/vscode-i18n) | 用 `@eastgold15/vscode-utils` 写的最小扩展示例 |

## Quick Start

```bash
# 安装依赖（bun workspaces）
bun install

# 跑类型检查 + 测试 + 构建
bun run type-check
bun test
bun run build
```

## 仓库布局

```
.
├── apps/
│   └── docs/                # 文档站（typedoc + blume）
├── packages/
│   ├── vscode-utils/        # 扩展运行时工具
│   ├── vscode-webview/      # Webview 客户端
│   ├── vite-plugin-vscode/  # Vite 插件
│   └── create-vscodep/      # 脚手架 CLI（重构中）
└── examples/
    └── vscode-i18n/         # 用上面这些包拼出来的最小扩展示例
```

## 发版流程（自动）

本项目用 [release-please](https://github.com/googleapis/release-please) 自动管理版本号和 CHANGELOG。

- **提交规范**: 遵循 [Conventional Commits](https://www.conventionalcommits.org/)，**scope 写包目录名**（如 `feat(vite-plugin-vscode): ...`）。`feat:` 触发 minor，`fix:` / `perf:` 触发 patch，`feat!:` / `BREAKING CHANGE:` 触发 major
- **流程**: push 到 `main` 后 `release-please.yml` 自动开/更新一个 `chore(release): 版本发布` PR，合并即逐包 `npm publish --provenance`
- **多包发布**: `release-please-config.json` 里配了三个包，各自独立走 semver，**Release PR 合并到一个**避免一次改动开三个 PR

详细约定见 [`.github/RELEASE.md`](./.github/RELEASE.md)。
