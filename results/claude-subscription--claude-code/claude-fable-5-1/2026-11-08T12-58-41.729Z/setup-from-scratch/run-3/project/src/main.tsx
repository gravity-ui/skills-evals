import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Lang, ThemeProvider, configure } from '@gravity-ui/uikit';

import { App } from './App';

// Встроенные тексты компонентов (например, «Показать пароль») — на русском
configure({ lang: Lang.Ru });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="system">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
