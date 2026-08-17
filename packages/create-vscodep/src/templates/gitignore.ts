import { outdent } from "@visulima/string";

export function getGitignore() {
  return outdent`
    node_modules
    dist
    .DS_Store
    *.log
    .vscode-test
  `;
}
