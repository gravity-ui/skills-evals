import React from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  /** Вызывается с данными формы, когда они прошли проверку. */
  onSubmit?: (values: LoginValues) => void | Promise<void>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage({onSubmit}: LoginPageProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const emailError = !email
    ? 'Введите email'
    : !EMAIL_PATTERN.test(email)
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
      await onSubmit?.({email, password, remember});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card type="container" view="outlined" className="login-card">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-5">
          <Text variant="header-1">Вход</Text>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" htmlFor="login-email" variant="subheader-1">
              Email
            </Text>
            <TextInput
              id="login-email"
              name="email"
              type="email"
              size="l"
              placeholder="name@example.com"
              autoComplete="email"
              autoFocus
              value={email}
              onUpdate={setEmail}
              validationState={submitted && emailError ? 'invalid' : undefined}
              errorMessage={submitted ? emailError : undefined}
            />
          </Flex>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" htmlFor="login-password" variant="subheader-1">
              Пароль
            </Text>
            <PasswordInput
              id="login-password"
              name="password"
              size="l"
              placeholder="Введите пароль"
              autoComplete="current-password"
              hideCopyButton
              value={password}
              onUpdate={setPassword}
              validationState={submitted && passwordError ? 'invalid' : undefined}
              errorMessage={submitted ? passwordError : undefined}
            />
          </Flex>

          <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember}>
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="xl" width="max" loading={loading}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
