import { outdent } from "@visulima/string";
import type { Preferences } from "../utils";

export function getVSCodeSettings(preferences: Preferences) {
  return outdent`
    {
      "editor.formatOnSave": true,
      "typescript.enablePromptUseWorkspaceTsdk": true,
    }
  `;
}

export function getVSCodeExtensions(preferences: Preferences) {
  const extensions = [
    "usernamehw.errorlens",
    "yzhang.markdown-all-in-one",
    "streetsidesoftware.code-spell-checker",
    "bradlc.vscode-tailwindcss",
  ];

  return outdent`
    {
      "recommendations": ${JSON.stringify(extensions, null, 2).replace(/\n/g, "\n      ")}
    }
  `;
}

export function getVSCodeLaunch(preferences: Preferences) {
  const { meta } = preferences;

  return outdent`
  // A launch configuration that compiles the extension and then opens it inside a new window
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  {
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Extension",
      "type": "extensionHost",
      "request": "launch",
      "args": [
        "--disable-extensions",
        "--extensionDevelopmentPath=\${workspaceFolder}"
      ],
      "outFiles": [
        "\${workspaceFolder}/dist/extension/*.js"
      ],
      "preLaunchTask": "bun: dev"
    },
    {
      "name": "Preview Extension",
      "type": "extensionHost",
      "request": "launch",
      "args": [
        "--extensionDevelopmentPath=\${workspaceFolder}"
      ],
      "outFiles": [
        "\${workspaceFolder}/dist/extension/*.js"
      ],
      "preLaunchTask": "bun: build"
    }
   ]
  }
  `;
}

export function getVSCodeTasks(preferences: Preferences) {
  return outdent`
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  {
  "version": "2.0.0",
  "tasks": [
    {
      "type": "bun",
      "script": "dev",
      "problemMatcher": {
        "owner": "typescript",
        "fileLocation": "relative",
        "pattern": {
          "regexp": "${"^([a-zA-Z]\\:/?([\\w\\-]/?)+\\.\\w+):(\\d+):(\\d+): (ERROR|WARNING)\\: (.*)$"}",
          "file": 1,
          "line": 3,
          "column": 4,
          "code": 5,
          "message": 6
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "^.*extension build start*$",
          "endsPattern": "^.*extension (build|rebuild) success.*$"
        }
      },
      "isBackground": true,
      "presentation": {
        "reveal": "never"
      },
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": []
    }
   ]
  }
  `;
}
