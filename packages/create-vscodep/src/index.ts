#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import { createCommand } from "./commands/create";
import { genCommand } from "./commands/gen";

const main = defineCommand({
  meta: {
    description: "VSCode 扩展开发工具链：脚手架与代码生成",
    name: "vscodep",
  },
  subCommands: {
    create: createCommand,
    gen: genCommand,
  },
});

runMain(main);
