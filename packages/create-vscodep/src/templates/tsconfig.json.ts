import dedent from "ts-dedent";
import type { Preferences } from "../utils";

export function getTSConfigRoot() {
  return dedent`
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

  let extendsPath = "";
  let includes = "";

  if (framework === "react") {
    extendsPath = "@tomjs/tsconfig/react-dom.json";
    includes = '"src/**/*.ts", "src/**/*.tsx", "src/**/*.d.ts"';
  } else if (framework === "vue") {
    extendsPath = "@vue/tsconfig/tsconfig.dom.json";
    includes = '"src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"';
  }

  return dedent`
    {
      "extends": "${extendsPath}",
      "compilerOptions": {
         "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
          "paths": {
            "@/*": ["./src/*"]
          },
          "types": ["vite/client"]
        },
      },
      "include": [${includes}]
    }
  `;
}

export function getTSConfigNode() {
  return dedent`
  {
  "extends": "@tomjs/tsconfig/node.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "types": ["@tomjs/vite-plugin-vscode/types"]
  },
  "include": ["extension", "*.config.ts"]
  }
  `;
}
