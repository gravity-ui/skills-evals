import { LoginPage, type LoginValues } from './pages/LoginPage';

export function App() {
  const handleLogin = (values: LoginValues) => {
    // TODO: подключить реальный запрос авторизации
    console.log('login', { email: values.email, remember: values.remember });
  };

  return (
    <main className="page">
      <LoginPage onSubmit={handleLogin} />
    </main>
  );
}
