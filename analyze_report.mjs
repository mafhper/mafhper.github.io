import fs from 'fs';
import path from 'path';

const logDir = '_dev/logs';
const files = fs
  .readdirSync(logDir)
  .filter((f) => f.endsWith('.json'))
  .sort();
const latestFile = 'localhost_4200-20260208T010143.json';

console.log(`Analyzing: ${latestFile}`);
const raw = fs.readFileSync(path.join(logDir, latestFile), 'utf-8');
const report = JSON.parse(raw);

const categories = report.categories;
console.log(`\n🏆 Scores:`);
console.log(`  - Performance: ${categories.performance.score * 100}`);
console.log(`  - Accessibility: ${categories.accessibility.score * 100}`);
console.log(`  - SEO: ${categories.seo.score * 100}`);

console.log('\n♿ Accessibility Issues:');
const a11yIssues = report.categories.accessibility.auditRefs
  .filter((r) => r.weight > 0 && report.audits[r.id].score < 1)
  .map((r) => report.audits[r.id]);

a11yIssues.forEach((audit) => {
  console.log(`  - [${audit.id}] ${audit.title}`);
});

console.log('\n🔍 SEO Issues:');
const seoIssues = report.categories.seo.auditRefs
  .filter((r) => r.weight > 0 && report.audits[r.id].score < 1)
  .map((r) => report.audits[r.id]);

seoIssues.forEach((audit) => {
  console.log(`  - [${audit.id}] ${audit.title}`);
});
