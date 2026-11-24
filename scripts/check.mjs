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

// External destinations must preserve the portfolio tab and isolate window.opener.
for (const file of ["index.html", "resume.html"]) {
  const html = readFileSync(resolve(root, file), "utf8");
  for (const [tag] of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!href) continue;
    if (/^https?:\/\//i.test(href) && new URL(href).hostname !== "shreyas-lohia-portfolio.onrender.com") {
      assert.match(tag, /\btarget="_blank"/, file + ": external link must open in a new tab: " + href);
      assert.match(tag, /\brel="noopener noreferrer"/, file + ": external link isolation: " + href);
    } else {
      assert.doesNotMatch(tag, /\btarget="_blank"/, file + ": internal link should stay in the same tab: " + href);
    }
  }
}
console.log("External link behavior checks passed.");
