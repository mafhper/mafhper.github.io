import fs from 'fs';
import path from 'path';

// Diretorio dos relatorios do Lighthouse. Pode vir como 1o argumento, da
// variavel LIGHTHOUSE_LOG_DIR, ou do padrao historico "_dev/logs".
const logDir = process.argv[2] || process.env.LIGHTHOUSE_LOG_DIR || '_dev/logs';

if (!fs.existsSync(logDir)) {
  console.error(`Diretorio de relatorios nao encontrado: ${logDir}`);
  console.error('Uso: node analyze_report.mjs [diretorio-dos-relatorios]');
  process.exit(1);
}

const files = fs
  .readdirSync(logDir)
  .filter((f) => f.endsWith('.json'))
  .sort();

if (files.length === 0) {
  console.error(`Nenhum relatorio .json em: ${logDir}`);
  process.exit(1);
}

// O nome carrega o timestamp (localhost_<porta>-<AAAA...>.json), entao a
// ordenacao lexicografica deixa o mais recente por ultimo.
const latestFile = files[files.length - 1];

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
