import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';
import { useState } from 'react';
import type { FormEvent } from 'react';

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  onSubmit?: (credentials: LoginCredentials) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = !email.trim()
    ? 'Введите email'
    : !EMAIL_RE.test(email.trim())
      ? 'Введите корректный email'
      : undefined;
  const passwordError = !password ? 'Введите пароль' : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (emailError || passwordError) {
      return;
    }
    onSubmit?.({ email: email.trim(), password, remember });
  };

  return (
    <Card view="outlined" className="login-card">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-5">
          <Text as="h1" variant="header-1">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" variant="subheader-1" htmlFor="login-email">
              Email
            </Text>
            <TextInput
              id="login-email"
              name="email"
              type="email"
              size="l"
              autoComplete="username"
              placeholder="name@example.com"
              value={email}
              onUpdate={setEmail}
              validationState={submitted && emailError ? 'invalid' : undefined}
              errorMessage={submitted ? emailError : undefined}
            />
          </Flex>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" variant="subheader-1" htmlFor="login-password">
              Пароль
            </Text>
            <PasswordInput
              id="login-password"
              name="password"
              size="l"
              autoComplete="current-password"
              hideCopyButton
              value={password}
              onUpdate={setPassword}
              validationState={submitted && passwordError ? 'invalid' : undefined}
              errorMessage={submitted ? passwordError : undefined}
            />
          </Flex>

          <Checkbox size="l" name="remember" checked={remember} onUpdate={setRemember}>
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="xl" width="max">
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
