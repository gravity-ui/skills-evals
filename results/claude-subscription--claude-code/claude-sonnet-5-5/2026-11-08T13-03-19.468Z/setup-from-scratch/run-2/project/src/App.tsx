import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@gravity-ui/uikit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = !email
    ? 'Введите email'
    : !EMAIL_RE.test(email)
      ? 'Некорректный email'
      : undefined;
  const passwordError = !password ? 'Введите пароль' : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (emailError || passwordError) {
      return;
    }
    // TODO: подключить реальную авторизацию
    console.log('login', { email, remember });
  };

  return (
    <main className="page">
      <Card type="container" view="outlined" className="login-card">
        <form onSubmit={handleSubmit} noValidate>
          <Flex direction="column" gap="spacing-5">
            <Text variant="header-1" as="h1">
              Вход
            </Text>

            <TextInput
              type="email"
              name="email"
              size="l"
              label="Email"
              placeholder="name@example.com"
              autoComplete="username"
              autoFocus
              value={email}
              onUpdate={setEmail}
              validationState={submitted && emailError ? 'invalid' : undefined}
              errorMessage={submitted ? emailError : undefined}
            />

            <PasswordInput
              name="password"
              size="l"
              label="Пароль"
              autoComplete="current-password"
              hideCopyButton
              value={password}
              onUpdate={setPassword}
              validationState={submitted && passwordError ? 'invalid' : undefined}
              errorMessage={submitted ? passwordError : undefined}
            />

            <Checkbox
              name="remember"
              size="l"
              checked={remember}
              onUpdate={setRemember}
              content="Запомнить меня"
            />

            <Button type="submit" view="action" size="xl" width="max">
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
