import { LoginPage } from './LoginPage';

export function App() {
  return (
    <main className="page">
      <LoginPage
        onSubmit={(values) => {
          // TODO: заменить на реальный запрос к API авторизации
          console.log('login', values);
        }}
      />
    </main>
  );
}
