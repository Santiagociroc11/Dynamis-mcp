import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDynamis = path.join(__dirname, "..", "CEREBRO", "DYNAMIS");
const srcSkills = path.join(__dirname, "..", ".cursor", "skills");
const dest = path.join(__dirname, "..", "data");
const destSkills = path.join(dest, "skills");

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
copyRecursive(srcDynamis, dest);
copyRecursive(srcSkills, destSkills);

const fichasCount = (function count(dir) {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => {
    const full = path.join(dir, e.name);
    return n + (e.isDirectory() ? count(full) : e.name.endsWith(".md") ? 1 : 0);
  }, 0);
})(path.join(dest, "fichas"));
const sintesisCount = fs.existsSync(path.join(dest, "sintesis")) ? fs.readdirSync(path.join(dest, "sintesis")).filter(f => f.endsWith(".md")).length : 0;
const skillsCount = fs.existsSync(destSkills) ? fs.readdirSync(destSkills).length : 0;

console.log(`Data copied: ${fichasCount} fichas, ${sintesisCount} sintesis, ${skillsCount} skills -> ${dest}`);
