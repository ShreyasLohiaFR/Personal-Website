import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";
const root = resolve("public");
for (const file of ["index.html", "resume.html"]) {
  const html = readFileSync(resolve(root, file), "utf8");
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport"/);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const [, link] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (link.startsWith("#")) assert.ok(ids.has(link.slice(1)), file + ": missing anchor " + link);
    else if (!link.startsWith("https://") && !link.startsWith("mailto:")) {
      assert.ok(existsSync(resolve(root, link)), file + ": missing asset " + link);
    }
  }
  assert.ok(!html.includes("javascript:"));
}
console.log("Portfolio checks passed: local navigation, assets and required metadata.");
