import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider, configure} from '@gravity-ui/uikit';

import {App} from './App';

configure({lang: 'ru'});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
);
