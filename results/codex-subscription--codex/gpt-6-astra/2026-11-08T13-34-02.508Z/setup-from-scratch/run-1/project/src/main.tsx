import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from '@gravity-ui/uikit';
import {App} from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider theme="light" lang="ru">
      <App />
    </Provider>
  </React.StrictMode>,
);
