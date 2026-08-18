# 发版规范

本项目使用 [release-please](https://github.com/googleapis/release-please) 自动管理版本号和 CHANGELOG。

## 参与发版的包

| 路径 | npm 包名 |
| --- | --- |
| `packages/vscode-utils` | `@eastgold15/vscode-utils` |
| `packages/vscode-webview` | `@eastgold15/vscode-webview` |
| `packages/vite-plugin-vscode` | `@eastgold15/vite-plugin-vscode` |
| `packages/create-vscodep` | `@eastgold15/vscodep-cli` |

`apps/docs` 与 `examples/*` 是私有包，不发布。

## 工作流

1. 开发者按 [Conventional Commits](https://www.conventionalcommits.org/) 规范提交 commit，**scope 用包目录名**，例如 `feat(vite-plugin-vscode): ...`
2. push 到 `main` 后，`release-please.yml` workflow 自动检测 commits，开/更新一个 `chore(release): 版本发布` PR
3. reviewer 检查 CHANGELOG 和各包 `package.json#version` 正确，合并该 PR
4. workflow 遍历 release-please 的 outputs，只对本次真的产生了 release 的包跑 `npm publish --provenance`
5. 为每个发布的包推 tag（`<package>-v<version>`）+ 开 GitHub Release

配置里设了 `separate-pull-requests: false`，所以多个包的版本变更合并进**同一个** Release PR，避免一次改动开出三个 PR。

## Conventional Commits → semver 映射

| Commit 类型 | 版本号变化 |
| --- | --- |
| `feat:` | minor (X.**Y**.Z) |
| `fix:` / `perf:` | patch (X.Y.**Z**) |
| `feat!:` / `fix!:` / `<type>!:` | major (**X**.Y.Z) |
| `BREAKING CHANGE:` (在 commit body/footer) | major (**X**.Y.Z) |
| `chore:` / `docs:` / `refactor:` / `test:` / `ci:` / `build:` | 不触发版本变化(从 changelog 隐藏) |

## 版本号约定

三个包各自独立走 semver，**不做跨包版本对齐**。`vite-plugin-vscode` 通过 `peerDependencies` 声明它兼容的 `vite` 版本范围，升级 vite 大版本要求时用带 `!` 的 commit 触发 major。

### Reviewer 检查清单

合并 Release PR 前，确认：
- [ ] CHANGELOG 描述准确，且改动落在正确的包下（看 commit scope 有没有写错）
- [ ] 破坏性改动确实走了 major，没有被误判成 minor
- [ ] 如果改了 `peerDependencies` 的版本范围，对应包有相应的版本 bump

## 手动补发

某个包发布失败需要重发时，手动触发 `publish.yml`，在下拉里选包路径。它会跑一次全量 `bun run build` 再发布指定包。

## 本地试运行(可选)

```bash
# 不开 PR,只 dry-run 算出版本
npx -y release-please manifest-pr \
  --config-file .github/release-please-config.json \
  --manifest-file .github/.release-please-manifest.json \
  --dry-run
```
