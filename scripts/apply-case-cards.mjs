import fs from 'fs';

const cardSelectors = [
  'meta-cell',
  'kpi-cell',
  'decision',
  'learning-card',
  'challenge',
  'process-card',
  'outcome-cell',
  'ba-callout',
  'type-demo',
  'sc',
  'stat-row',
  'problem-card',
  'persona-card',
  'bi-cell',
  'dec-card',
  'learn-card',
  'oc-cell',
  'ms-cell',
  'screen-card',
  'hm-cell',
  'swatch',
  'decision-icon-wrap',
];

const caseBlockSelectors = [
  'annotation',
  'decision-result',
  'challenge-sol-wrap',
  'pc-quote',
  'persona-pain',
];

function addUtilityClass(html, names, utility) {
  for (const name of names) {
    const re = new RegExp(`class="([^"]*\\b${name}\\b[^"]*)"`, 'g');
    html = html.replace(re, (match, classes) => {
      if (classes.split(/\s+/).includes(utility)) return match;
      return `class="${classes} ${utility}"`;
    });
  }
  return html;
}

function stripCardInlineStyles(html) {
  return html
    .replace(/\s*style="margin-top:0;\s*height:fit-content;\s*align-self:center;"/g, '')
    .replace(/\s*style="margin-top:0\.6rem;"/g, '');
}

for (const file of [
  'public/case-studies/rose-by-basicare.html',
  'public/case-studies/pickme.html',
]) {
  let html = fs.readFileSync(file, 'utf8');
  html = addUtilityClass(html, cardSelectors, 'card');
  html = addUtilityClass(html, caseBlockSelectors, 'case-block');
  html = stripCardInlineStyles(html);
  fs.writeFileSync(file, html);
  console.log('Updated', file);
}
