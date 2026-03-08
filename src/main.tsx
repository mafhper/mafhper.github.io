import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initI18n } from './i18n';
import './index.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

if (!window.location.hash) {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

void initI18n().finally(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
