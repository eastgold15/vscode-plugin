import dedent from "ts-dedent";

export function getGitignore() {
  return dedent`
    node_modules
    dist
    .DS_Store
    *.log
    .vscode-test
  `;
}
