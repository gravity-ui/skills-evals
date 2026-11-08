import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider, configure} from '@gravity-ui/uikit';

import {App} from './App';

// Built-in component strings (e.g. the password reveal button) in Russian.
configure({lang: 'ru'});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider theme="system">
      <App />
    </Provider>
  </React.StrictMode>,
);
