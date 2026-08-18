import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import prompts, { type PromptObject } from "prompts";

export type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

export type Framework = "react" | "vue";

export type Linter = "Biome" | "None" | "ultracite";

export interface Preferences {
  dir: string;
  framework: Framework;
  git: boolean;
  meta: {
    commandName: string;
    viewName: string;
  };
  noInstall: boolean;
  packageManager: PackageManager;
  projectName: string;
  runtime: "Bun" | "Node.js";
  vscode: boolean;
}

export class PreferencesClass {
  projectName = "";
  dir = "";
  packageManager: PackageManager = "bun";
  framework: Framework = "react";

  runtime: "Bun" | "Node.js" = "Bun";
  git = true;
  vscode = true;
  noInstall = false;
  meta: {
    commandName: string;
    viewName: string;
  } = {
    commandName: "hello-world",
    viewName: "HelloWorld",
  };
}

export async function createOrFindDir(dir: string) {
  try {
    await fs.access(dir);
    const filesInTargetDirectory = await fs.readdir(dir);
    if (filesInTargetDirectory.length > 0) {
      const response = await prompts({
        initial: false,
        message:
          "Target directory is not empty. Remove existing files and continue?",
        name: "overwrite",
        type: "confirm",
      });
      if (!response.overwrite) {
        process.exit(0);
      }
      await fs.rm(dir, { force: true, recursive: true });
      await fs.mkdir(dir, { recursive: true });
    }
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) {
    return "bun";
  }
  const pmSpec = userAgent.split(" ")[0];
  const pm = pmSpec.split("/")[0] as PackageManager;
  if (["bun", "npm", "pnpm", "yarn"].includes(pm)) {
    return pm;
  }
  return "bun";
}

export function generateRandomString(length: number): string {
  return randomBytes(length).toString("hex");
}

export function getPrefixedName(name: string): string {
  return `${name}`;
}

export function getCamelCaseName(name: string): string {
  return name
    .replace(/-./g, (x) => x[1].toUpperCase())
    .replace(/^./, (x) => x.toLowerCase());
}

export function getPascalCaseName(name: string): string {
  return name
    .replace(/-./g, (x) => x[1].toUpperCase())
    .replace(/^./, (x) => x.toUpperCase());
}

export function toLowerCase(name: string): string {
  return name.toLowerCase();
}

export async function createPrompt(
  questions: PromptObject | PromptObject[]
): Promise<any> {
  return await prompts(questions);
}

export function getExtensionId(name: string): string {
  return `${name.replace(/[^a-z0-9-]/gi, "").toLowerCase()}`;
}
