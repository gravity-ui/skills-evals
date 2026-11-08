import {useState, type FormEvent} from 'react';
import {Button, Checkbox, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Connect the authentication API here, including its session persistence policy.
    // Credentials must never be stored in browser storage or written to logs.
    setMessage('Вход пока недоступен: сервис авторизации ещё не подключён.');
  }

  return (
    <main className="page">
      <section className="login" aria-labelledby="login-title">
        <div className="login-heading">
          <Text as="h1" id="login-title" variant="header-2">Вход в аккаунт</Text>
          <Text as="p" variant="body-2" color="secondary">
            Введите email и пароль, чтобы продолжить.
          </Text>
        </div>

        <form className="login-form" onSubmit={handleSubmit} onChange={() => setMessage('')}>
          <div className="login-field">
            <Text as="label" htmlFor="email" variant="body-2">Email</Text>
            <TextInput
              id="email"
              name="email"
              type="email"
              size="xl"
              placeholder="you@example.com"
              autoComplete="username"
              value={email}
              onUpdate={setEmail}
              controlProps={{required: true, spellCheck: false, autoCapitalize: 'none'}}
            />
          </div>

          <div className="login-field">
            <Text as="label" htmlFor="password" variant="body-2">Пароль</Text>
            <TextInput
              id="password"
              name="password"
              type="password"
              size="xl"
              placeholder="Введите пароль"
              autoComplete="current-password"
              value={password}
              onUpdate={setPassword}
              controlProps={{required: true}}
            />
          </div>

          <Checkbox name="rememberMe" size="l" checked={rememberMe} onUpdate={setRememberMe}>
            Запомнить меня
          </Checkbox>

          <Button className="login-submit" type="submit" view="action" size="xl" width="max">
            Войти
          </Button>

          {message && (
            <Text as="p" className="login-message" variant="body-1" color="secondary" role="status">
              {message}
            </Text>
          )}
        </form>
      </section>
    </main>
  );
}
