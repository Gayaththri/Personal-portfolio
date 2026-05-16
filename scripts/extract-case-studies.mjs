import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");
const OUT = path.join(ROOT, "src", "case-studies");

const CASES = [
  {
    id: "rose-by-basicare",
    html: "public/case-studies/rose-by-basicare.html",
    cssOut: "rose.css",
    bodyOut: "rose-body.html",
  },
  {
    id: "pickme",
    html: "public/case-studies/pickme.html",
    cssOut: "pickme.css",
    bodyOut: "pickme-body.html",
  },
];

function extractStyle(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1].trim() : "";
}

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!m) throw new Error("no body");
  let body = m[1];

  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<div class="progress-bar"[\s\S]*?<\/motion>/i, "")
    .replace(/<div id="prog"[^>]*><\/motion>/i, "")
    .replace(/<div class="progress-bar"[\s\S]*?<\/div>/i, "")
    .replace(/<div id="prog"[^>]*><\/div>/i, "")
    .replace(/<button[^>]*id="backTop"[\s\S]*?<\/button>/gi, "")
    .replace(/<button[^>]*id="backTop"[\s\S]*?<\/button>/gi, "")
    .replace(/<!--\s*═+\s*NAV\s*═+[\s\S]*?<\/nav>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "");

  return body.trim();
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function stripBaseRules(css) {
  return css
    .replace(/^\s*\*,[\s\S]*?}\s*/m, "")
    .replace(/^\s*\*::before[\s\S]*?}\s*/m, "")
    .replace(/^\s*\*::after[\s\S]*?}\s*/m, "")
    .replace(/^\s*html\s*\{[\s\S]*?\}\s*/m, "")
    .replace(/^\s*body\s*\{[\s\S]*?\}\s*/m, "")
    .replace(/:root\s*\{[\s\S]*?\}\s*/g, "");
}

function scopeCss(css) {
  const cleaned = stripBaseRules(stripComments(css));
  const chunks = [];
  let i = 0;
  let depth = 0;
  let start = 0;

  while (i < cleaned.length) {
    const ch = cleaned[i];
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        chunks.push(cleaned.slice(start, i + 1));
        start = i + 1;
      }
    }
    i++;
  }

  const scoped = chunks
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const open = block.indexOf("{");
      if (open === -1) return block;
      const selector = block.slice(0, open).trim();
      const rules = block.slice(open);

      if (selector.startsWith("@")) return block;

      const scopedSelector = selector
        .split(",")
        .map((s) => {
          const sel = s.trim().replace(/\/\*[\s\S]*?\*\//g, "").trim();
          if (!sel) return null;
          if (sel === "body" || sel === "html") return ".case-study-content";
          if (sel.startsWith(".case-study-content")) return sel;
          return `.case-study-content ${sel}`;
        })
        .filter(Boolean)
        .join(", ");

      if (!scopedSelector) return "";

      return `${scopedSelector} ${rules}`;
    })
    .join("\n\n");

  const merged = `.case-study-content {\n  color: var(--text);\n  line-height: 1.65;\n  -webkit-font-smoothing: antialiased;\n}\n\n${scoped}`;

  return merged
    .replace(/\.case-study-content\s+\/\*[\s\S]*?\*\/\s*/g, "")
    .replace(/\n{3,}/g, "\n\n");
}

fs.mkdirSync(path.join(OUT, "content"), { recursive: true });
fs.mkdirSync(path.join(OUT, "styles"), { recursive: true });

for (const c of CASES) {
  const html = fs.readFileSync(path.join(ROOT, c.html), "utf8");
  const style = extractStyle(html);
  const body = extractBody(html);
  const css = scopeCss(style);

  fs.writeFileSync(path.join(OUT, "styles", c.cssOut), css);
  fs.writeFileSync(path.join(OUT, "content", c.bodyOut), body);
  console.log(`extracted ${c.id}: ${body.length} chars body, ${css.length} chars css`);
}

// Copy shared theme into src for bundling
fs.copyFileSync(
  path.join(ROOT, "public/case-studies/portfolio-case-theme.css"),
  path.join(OUT, "case-theme.css"),
);

console.log("done");
