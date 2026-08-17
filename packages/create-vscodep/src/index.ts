#!/usr/bin/env node
import { createCerebro } from "@visulima/cerebro";
import { createCommand } from "./commands/create";
import { genCommand } from "./commands/gen";
import { packageName, packageVersion } from "./constants";

// cerebro 要求 logger 是 Node `Console` 类型（`logger: console`），pail 不兼容，
// 所以这里走 cerebro 默认 console；`gen` 子命令自己持有 pail 实例。
const cli = createCerebro(packageName, {
  packageName,
  packageVersion,
});

cli.addCommand(createCommand);
cli.addCommand(genCommand);

await cli.run();
