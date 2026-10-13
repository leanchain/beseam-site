import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// `output: "export"` renders one root layout for every route, so every
// exported page starts as <html lang="en">. Rewrite each German and Dutch
// page to its own language: out/de.html, out/nl.html and everything under
// out/de/ and out/nl/.
const PREFIXED = ["de", "nl"];

async function htmlFilesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFilesUnder(path)));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

for (const lang of PREFIXED) {
  const files = [`out/${lang}.html`, ...(await htmlFilesUnder(`out/${lang}`))];
  for (const path of files) {
    const html = await readFile(path, "utf8");
    if (html.includes(`<html lang="${lang}"`)) continue;

    const marker = '<html lang="en"';
    const first = html.indexOf(marker);
    if (first < 0 || html.indexOf(marker, first + marker.length) >= 0) {
      throw new Error(`${path}: expected exactly one ${marker}`);
    }

    await writeFile(path, html.replace(marker, `<html lang="${lang}"`), "utf8");
  }
}
