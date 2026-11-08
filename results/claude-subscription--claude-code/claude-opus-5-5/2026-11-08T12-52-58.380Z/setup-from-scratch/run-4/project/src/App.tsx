import { LoginPage, type LoginValues } from './pages/LoginPage/LoginPage';

async function handleLogin(_values: LoginValues) {
  // TODO: заменить на запрос к API авторизации.
}

export function App() {
  return (
    <main className="page">
      <LoginPage onSubmit={handleLogin} />
    </main>
  );
}
