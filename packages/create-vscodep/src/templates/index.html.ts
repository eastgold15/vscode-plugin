import dedent from "ts-dedent";
import type { Preferences } from "../utils";

export function getIndexHtml(preferences: Preferences) {
  const { framework } = preferences;

  return dedent`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VSCode Extension</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.${framework === "react" ? "tsx" : "ts"}"></script>
      </body>
    </html>
  `;
}
