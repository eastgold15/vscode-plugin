import dedent from "ts-dedent";
import type { Preferences } from "../utils";

export function getReadme(preferences: Preferences) {
  const { projectName, framework, packageManager } = preferences;

  return dedent`
    # ${projectName}

    VS Code extension built with ${framework} and Vite.

    ## Features

    - ${framework} ${framework === "react" ? "19" : "3"} with TypeScript
    - Vite for fast development
    - VSCode Webview UI Toolkit
    - Hot Module Replacement (HMR)

    ## Getting Started

    ### Development

    \`\`\`bash
    ${packageManager} install
    ${packageManager} run dev
    \`\`\`

    Press \`F5\` in VS Code to launch the extension in a new window.

    ### Build

    \`\`\`bash
    ${packageManager} run build
    \`\`\`

    ## Project Structure

    \`\`\`
    .
    ├── extension/          # Extension backend code (Node.js)
    │   ├── index.ts        # Extension activation and commands
    │   └── views/          # Webview management
    ├── src/               # ${framework} frontend code
    │   ├── main.${framework === "react" ? "tsx" : "ts"}  # ${framework} entry point
    │   └── App.${framework === "react" ? "tsx" : "vue"}  # Main ${framework} component
    ├── vite.config.ts     # Vite configuration
    └── package.json       # Project manifest
    \`\`\`

    ## Configuration

    ### VSCode Settings

    - \`vscode.extension.kind\`: \`[\`workspace\`]\`
    - \`files.autoSave\`: \`afterDelay\`

    ## License

    MIT
  `;
}
