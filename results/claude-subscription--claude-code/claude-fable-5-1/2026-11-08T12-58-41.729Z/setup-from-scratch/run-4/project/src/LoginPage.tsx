import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginPageProps {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailError = email.trim() === '' ? 'Введите email' : !EMAIL_RE.test(email) ? 'Некорректный email' : undefined;
  const passwordError = password === '' ? 'Введите пароль' : undefined;
  const isValid = !emailError && !passwordError;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (!isValid) return;

    setLoading(true);
    try {
      await onSubmit?.({ email: email.trim(), password, rememberMe });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card type="container" view="raised" width="100%" maxWidth="400px" padding="spacing-8">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-4">
          <Text as="h1" variant="header-2">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-3">
            <TextInput
              type="email"
              name="email"
              size="l"
              placeholder="Email"
              value={email}
              onUpdate={setEmail}
              autoComplete="email"
              autoFocus
              hasClear
              validationState={submitted && emailError ? 'invalid' : undefined}
              errorMessage={submitted ? emailError : undefined}
              controlProps={{ 'aria-label': 'Email' }}
            />
            <PasswordInput
              name="password"
              size="l"
              placeholder="Пароль"
              value={password}
              onUpdate={setPassword}
              autoComplete="current-password"
              hideCopyButton
              validationState={submitted && passwordError ? 'invalid' : undefined}
              errorMessage={submitted ? passwordError : undefined}
              controlProps={{ 'aria-label': 'Пароль' }}
            />
          </Flex>

          <Checkbox size="l" name="rememberMe" checked={rememberMe} onUpdate={setRememberMe}>
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
