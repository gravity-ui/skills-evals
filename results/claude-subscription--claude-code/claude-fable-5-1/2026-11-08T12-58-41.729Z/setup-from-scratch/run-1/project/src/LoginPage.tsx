import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginPageProps {
  /** Вызывается при отправке формы с валидными значениями. */
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailError = !email
    ? 'Введите email'
    : !EMAIL_RE.test(email)
      ? 'Некорректный email'
      : undefined;
  const passwordError = !password ? 'Введите пароль' : undefined;
  const isValid = !emailError && !passwordError;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!isValid) return;

    setLoading(true);
    try {
      await onSubmit?.({ email, password, remember });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card type="container" view="outlined" size="l" className="login-card">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-4">
          <Text as="h1" variant="header-2" style={{ margin: 0 }}>
            Вход
          </Text>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" htmlFor="login-email" variant="body-1" color="secondary">
              Email
            </Text>
            <TextInput
              id="login-email"
              name="email"
              type="email"
              size="l"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onUpdate={setEmail}
              validationState={submitted && emailError ? 'invalid' : undefined}
              errorMessage={submitted ? emailError : undefined}
            />
          </Flex>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" htmlFor="login-password" variant="body-1" color="secondary">
              Пароль
            </Text>
            <PasswordInput
              id="login-password"
              name="password"
              size="l"
              autoComplete="current-password"
              placeholder="Введите пароль"
              value={password}
              onUpdate={setPassword}
              hideCopyButton
              validationState={submitted && passwordError ? 'invalid' : undefined}
              errorMessage={submitted ? passwordError : undefined}
            />
          </Flex>

          <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember}>
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="l" width="max" loading={loading}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
