import fs from "fs";

const p = "c:/Users/Gayaththri/Desktop/portflio/public/case-studies/pickme.html";
let html = fs.readFileSync(p, "utf8");
const start = html.indexOf('      <div class="phone-mockup">', html.indexOf("hero-phone-wrap"));
if (start < 0) throw new Error("phone-mockup not found");

let pos = start + html.slice(start).indexOf(">") + 1;
let depth = 1;
while (depth > 0) {
  const o = html.indexOf("<div", pos);
  const c = html.indexOf("</div>", pos);
  if (c === -1) break;
  if (o !== -1 && o < c) {
    depth++;
    pos = o + 4;
  } else {
    depth--;
    pos = c + 6;
  }
}

const img = `      <div class="phone-mockup">
        <img
          src="/case-studies/pickme-assets/hero-tracking.png"
          alt="PickMe ride tracking screen — driver ETA, map, and trip status"
          width="280"
          height="560"
          loading="eager"
          decoding="async"
        />
      </div>`;

fs.writeFileSync(p, html.slice(0, start) + img + html.slice(pos));
console.log("Fixed hero in pickme.html");
