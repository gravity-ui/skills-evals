import { Button, Card, Checkbox, Flex, Text, TextInput } from '@gravity-ui/uikit';
import { useState } from 'react';
import type { FormEvent } from 'react';

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
      <Card className="login-card" type="container" view="outlined" padding="spacing-6">
        <form onSubmit={handleSubmit} noValidate>
          <Flex direction="column" gap="spacing-4">
            <Text variant="header-1" as="h1">
              Вход
            </Text>
            <TextInput
              name="email"
              type="email"
              size="l"
              label="Email"
              placeholder="name@example.com"
              autoComplete="email"
              autoFocus
              value={email}
              onUpdate={setEmail}
              validationState={submitted && emailError ? 'invalid' : undefined}
              errorMessage={submitted ? emailError : undefined}
            />
            <TextInput
              name="password"
              type="password"
              size="l"
              label="Пароль"
              autoComplete="current-password"
              value={password}
              onUpdate={setPassword}
              validationState={submitted && passwordError ? 'invalid' : undefined}
              errorMessage={submitted ? passwordError : undefined}
            />
            <Checkbox size="l" checked={remember} onUpdate={setRemember}>
              Запомнить меня
            </Checkbox>
            <Button type="submit" view="action" size="xl" width="max">
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
