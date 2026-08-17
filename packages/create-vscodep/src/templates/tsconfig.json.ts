import { outdent } from "@visulima/string";
import type { Preferences } from "../utils";

export function getTSConfigRoot() {
  return outdent`
    {
      "files": [],
      "references": [
        { "path": "./tsconfig.app.json" },
        { "path": "./tsconfig.node.json" }
      ]
    }
  `;
}

export function getTSConfigApp(preferences: Preferences) {
  const { framework } = preferences;

  let includes = "";

  if (framework === "react") {
    includes = '"src/**/*.ts", "src/**/*.tsx", "src/**/*.d.ts"';
  } else if (framework === "vue") {
    includes = '"src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"';
  }

  return outdent`
    {
      "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "lib": ["es2022", "DOM", "DOM.Iterable"],
        "strict": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "isolatedModules": true,
        "moduleDetection": "force",
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,
        "incremental": false,
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
        "paths": {
          "@/*": ["./src/*"]
        },
        "types": ["vite/client"]
      },
      "include": [${includes}]
    }
  `;
}

export function getTSConfigNode() {
  return outdent`
    {
      "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "lib": ["es2022"],
        "strict": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "isolatedModules": true,
        "moduleDetection": "force",
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,
        "incremental": false,
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
        "types": ["@eastgold15/vite-plugin-vscode/types"]
      },
      "include": ["extension", "*.config.ts"]
    }
  `;
}
