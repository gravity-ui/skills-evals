import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@gravity-ui/uikit';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginPageProps {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (emailError || passwordError) {
      return;
    }
    setLoading(true);
    try {
      await onSubmit?.({ email, password, remember });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card view="raised" size="l" className="login-card">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-6">
          <Flex direction="column" gap="spacing-1">
            <Text as="h1" variant="header-2">
              Вход
            </Text>
            <Text variant="body-1" color="secondary">
              Введите данные учётной записи, чтобы продолжить
            </Text>
          </Flex>

          <Flex direction="column" gap="spacing-4">
            <TextInput
              size="l"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              autoFocus
              value={email}
              onUpdate={setEmail}
              validationState={submitted && emailError ? 'invalid' : undefined}
              errorMessage={submitted ? emailError : undefined}
              controlProps={{ 'aria-label': 'Email' }}
            />
            <PasswordInput
              size="l"
              name="password"
              placeholder="Пароль"
              autoComplete="current-password"
              hideCopyButton
              value={password}
              onUpdate={setPassword}
              validationState={submitted && passwordError ? 'invalid' : undefined}
              errorMessage={submitted ? passwordError : undefined}
              controlProps={{ 'aria-label': 'Пароль' }}
            />
            <Checkbox size="l" name="remember" checked={remember} onUpdate={setRemember}>
              Запомнить меня
            </Checkbox>
          </Flex>

          <Button type="submit" view="action" size="xl" width="max" loading={loading}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
