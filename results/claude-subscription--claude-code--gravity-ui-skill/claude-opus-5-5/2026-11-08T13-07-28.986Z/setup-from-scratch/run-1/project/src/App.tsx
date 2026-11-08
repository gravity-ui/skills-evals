import { LoginPage, type LoginValues } from './LoginPage/LoginPage';

async function handleLogin(values: LoginValues) {
  // TODO: подключить реальный API авторизации.
  console.info('login', { email: values.email, remember: values.remember });
}

export function App() {
  return (
    <main className="page">
      <LoginPage onSubmit={handleLogin} />
    </main>
  );
}
