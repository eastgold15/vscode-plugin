import { version } from "../../../packages/vite-plugin-vscode/package.json";

const repoUrl = "https://github.com/eastgold15/vscode-plugin";

export const getLatestVersion = (): string => version;

export const getReleaseUrl = (release: string): string =>
  `${repoUrl}/releases/tag/vite-plugin-vscode%40${release}`;
