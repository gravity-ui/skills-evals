// Порядок важен: шрифты, затем базовые стили uikit, затем собственные стили.
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from '@gravity-ui/uikit';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider theme="system">
      <App />
    </Provider>
  </React.StrictMode>,
);
