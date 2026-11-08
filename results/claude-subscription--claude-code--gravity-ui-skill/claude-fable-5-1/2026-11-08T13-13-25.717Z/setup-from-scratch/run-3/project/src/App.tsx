import { LoginPage, type LoginFormValues } from './LoginPage';

export function App() {
  const handleLogin = async (values: LoginFormValues) => {
    // Здесь должен быть вызов API авторизации.
    // eslint-disable-next-line no-console
    console.log('login', { email: values.email, rememberMe: values.rememberMe });
  };

  return (
    <main className="page">
      <LoginPage onSubmit={handleLogin} />
    </main>
  );
}
