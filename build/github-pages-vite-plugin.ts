import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

// GitHub Pages ignores directories beginning with an underscore unless the
// published tree opts out of Jekyll, and vinext writes its assets to `_next`.
export function githubPages(): Plugin {
  let root = process.cwd();

  return {
    name: "github-pages",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const clientDirectory = resolve(root, "dist", "client");
      await mkdir(clientDirectory, { recursive: true });
      await writeFile(resolve(clientDirectory, ".nojekyll"), "");
    },
  };
}
