import { outdent } from "@visulima/string";

export function getBiomeConfig() {
  return outdent`
    {
      "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
      "vcs": {
        "enabled": true,
        "clientKind": "git",
        "useIgnoreFile": true
      },
      "files": {
        "ignoreUnknown": false,
        "ignore": [
          "node_modules",
          "dist"
        ]
      },
      "formatter": {
        "enabled": true,
        "formatWithErrors": false,
        "indentStyle": "space",
        "indentWidth": 2,
        "lineEnding": "lf",
        "lineWidth": 80
      },
      "organizeImports": {
        "enabled": true
      },
      "linter": {
        "enabled": true,
        "rules": {
          "recommended": true,
          "complexity": {
            "noForEach": "off"
          },
          "correctness": {
            "useExhaustiveDependencies": "warn"
          },
          "style": {
            "noNonNullAssertion": "warn"
          },
          "suspicious": {
            "noExplicitAny": "warn"
          }
        }
      },
      "javascript": {
        "formatter": {
          "jsxQuoteStyle": "double",
          "quoteProperties": "asNeeded",
          "trailingCommas": "all",
          "semicolons": "always",
          "arrowParentheses": "always",
          "bracketSpacing": true,
          "bracketSameLine": false,
          "quoteStyle": "single",
          "attributePosition": "auto"
        }
      }
    }
  `;
}
