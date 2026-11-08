import {LoginPage} from './LoginPage/LoginPage';
import type {LoginFormValues} from './LoginPage/LoginPage';

async function handleLogin(values: LoginFormValues) {
  // TODO: заменить на реальный запрос к API авторизации
  console.info('login', {email: values.email, remember: values.remember});
}

export function App() {
  return (
    <main className="page">
      <LoginPage onSubmit={handleLogin} />
    </main>
  );
}
