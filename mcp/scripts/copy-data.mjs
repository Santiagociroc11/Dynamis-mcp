import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "..", "..", "CEREBRO", "DYNAMIS");
const dest = path.join(__dirname, "..", "data");

function copyRecursive(s, d) {
  if (!fs.existsSync(s)) return;
  if (fs.statSync(s).isDirectory()) {
    fs.mkdirSync(d, { recursive: true });
    for (const e of fs.readdirSync(s)) copyRecursive(path.join(s, e), path.join(d, e));
  } else {
    fs.copyFileSync(s, d);
  }
}

if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
copyRecursive(src, dest);
console.log(`Data copied: ${src} -> ${dest}`);
