import { access, readFile } from "node:fs/promises";

// `output: "export"` with the default `trailingSlash: false` writes each
// route as `<route>.html`, not `<route>/index.html` -- the whole site
// already exports that way (e.g. `out/scan.html`, `out/compare.html`), and
// changing that convention now would rewrite every page's output path, not
// just the new German ones. These paths match what `npm run build` actually
// produces; the root route keeps its special-cased `index.html`.
const REQUIRED = [
  "out/index.html",
  "out/scan.html",
  "out/de.html",
  "out/de/scan.html",
];
const FORBIDDEN = ["out/en", "out/en.html"];

let failed = false;
for (const path of REQUIRED) {
  try {
    await access(path);
  } catch {
    console.error(`missing: ${path}`);
    failed = true;
  }
}
for (const path of FORBIDDEN) {
  try {
    await access(path);
    console.error(`must not exist: ${path}`);
    failed = true;
  } catch {
    /* expected */
  }
}

for (const [path, expectedLang] of [
  ["out/index.html", "en"],
  ["out/scan.html", "en"],
  ["out/de.html", "de"],
  ["out/de/scan.html", "de"],
]) {
  try {
    const html = await readFile(path, "utf8");
    if (!html.includes(`<html lang="${expectedLang}"`)) {
      console.error(`${path}: expected html lang=${expectedLang}`);
      failed = true;
    }
  } catch {
    // The existence check above already reports the missing file.
  }
}
console.log(failed ? "export check FAILED" : "export check ok");
process.exit(failed ? 1 : 0);
