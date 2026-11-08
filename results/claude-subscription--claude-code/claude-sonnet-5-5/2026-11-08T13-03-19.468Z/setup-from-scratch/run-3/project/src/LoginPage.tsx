import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';
import { useState } from 'react';
import type { FormEvent } from 'react';

export interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginPageProps {
  onSubmit?: (values: LoginValues) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string) {
  if (!email.trim()) return 'Введите email';
  if (!EMAIL_RE.test(email.trim())) return 'Некорректный email';
  return undefined;
}

function validatePassword(password: string) {
  return password ? undefined : 'Введите пароль';
}

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted ? validateEmail(email) : undefined;
  const passwordError = submitted ? validatePassword(password) : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (validateEmail(email) || validatePassword(password)) return;
    onSubmit?.({ email: email.trim(), password, rememberMe });
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
              autoComplete="email"
              autoFocus
              value={email}
              onUpdate={setEmail}
              validationState={emailError ? 'invalid' : undefined}
              errorMessage={emailError}
            />

            <PasswordInput
              name="password"
              size="l"
              label="Пароль"
              placeholder="Введите пароль"
              autoComplete="current-password"
              hideCopyButton
              value={password}
              onUpdate={setPassword}
              validationState={passwordError ? 'invalid' : undefined}
              errorMessage={passwordError}
            />

            <Checkbox size="l" checked={rememberMe} onUpdate={setRememberMe}>
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
