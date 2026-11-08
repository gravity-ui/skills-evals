import { Provider } from '@gravity-ui/uikit';

import { LoginPage } from './LoginPage';

export function App() {
  return (
    <Provider lang="ru">
      <main className="page">
        <LoginPage />
      </main>
    </Provider>
  );
}
