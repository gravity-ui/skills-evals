import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { LangProvider, ThemeProvider } from '@gravity-ui/uikit';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="light">
      <LangProvider lang="ru">
        <App />
      </LangProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
