import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { visualizer } from 'rollup-plugin-visualizer';
import { findSafePort, formatPortFallback } from './scripts/sonda-porta';

const DEV_PORT = Number(process.env.PORT) || 5200;
const PREVIEW_PORT = Number(process.env.PREVIEW_PORT) || 4200;

export default defineConfig(async () => {
  // A sonda roda em top-level: `defineConfig` aceita callback async. Ela
  // escolhe a porta ANTES do bind, que e o que o `strictPort` nao cobre.
  const [devPort, previewPort] = await Promise.all([
    findSafePort(DEV_PORT, { rotulo: 'dev server' }),
    findSafePort(PREVIEW_PORT, { rotulo: 'preview server' })
  ]);

  if (devPort !== DEV_PORT) console.warn(formatPortFallback(DEV_PORT, devPort, 'dev server'));
  if (previewPort !== PREVIEW_PORT)
    console.warn(formatPortFallback(PREVIEW_PORT, previewPort, 'preview server'));

  return {
    plugins: [react(), tailwindcss(), visualizer({ open: true })],
    base: '/',
    // `host: true` = 0.0.0.0. No Windows o bind tem sucesso mesmo com
    // `127.0.0.1:P` ocupado (medido em 2026-09-30 no icon-core), entao o Vite
    // anunciava `localhost:5173` como pronto e o navegador era servido pelo
    // PROJETO ERRADO. A sonda no loopback antes do bind e a unica defesa —
    // `strictPort` sozinho so dispara quando o bind falha, e aqui ele nunca falha.
    //
    // `strictPort: false` estava escrito: registrar a decisao de aceitar o
    // fallback e o oposto do que este projeto precisa.
    server: {
      host: true,
      strictPort: true,
      port: devPort
    },
    preview: {
      host: true,
      strictPort: true,
      port: previewPort
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;

            if (id.includes('react-dom') || id.includes('/react/')) {
              return 'framework';
            }

            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n';
            }

            if (id.includes('lucide-react')) {
              return 'ui';
            }
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  };
});
