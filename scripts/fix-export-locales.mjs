import { readFile, writeFile } from "node:fs/promises";

const GERMAN_EXPORTS = ["out/de.html", "out/de/scan.html"];

for (const path of GERMAN_EXPORTS) {
  const html = await readFile(path, "utf8");
  if (html.includes('<html lang="de"')) continue;

  const marker = '<html lang="en"';
  const first = html.indexOf(marker);
  if (first < 0 || html.indexOf(marker, first + marker.length) >= 0) {
    throw new Error(`${path}: expected exactly one ${marker}`);
  }

  await writeFile(path, html.replace(marker, '<html lang="de"'), "utf8");
}
