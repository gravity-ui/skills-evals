import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import {Provider} from '@gravity-ui/uikit';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider theme="light" lang="ru"><App /></Provider>
  </React.StrictMode>,
);
