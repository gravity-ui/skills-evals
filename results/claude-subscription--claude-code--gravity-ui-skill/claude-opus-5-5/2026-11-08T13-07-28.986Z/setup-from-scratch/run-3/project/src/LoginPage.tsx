import * as React from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(email: string, password: string) {
  return {
    email: !email.trim()
      ? 'Введите email'
      : EMAIL_RE.test(email.trim())
        ? undefined
        : 'Некорректный email',
    password: password ? undefined : 'Введите пароль',
  };
}

export function LoginPage({onSubmit}: LoginPageProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const errors = validate(email, password);
  const emailError = submitted ? errors.email : undefined;
  const passwordError = submitted ? errors.password : undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (errors.email || errors.password) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit?.({email: email.trim(), password, remember});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card view="raised" width="100%" maxWidth="400px" padding="spacing-8">
      <Flex as="form" direction="column" gap="spacing-5" onSubmit={handleSubmit} noValidate>
        <Text as="h1" variant="header-1" className="login-title">
          Вход
        </Text>

        <Flex direction="column" gap="spacing-2">
          <Text as="label" htmlFor="login-email" variant="subheader-1">
            Email
          </Text>
          <TextInput
            id="login-email"
            name="email"
            type="email"
            size="l"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onUpdate={setEmail}
            validationState={emailError ? 'invalid' : undefined}
            errorMessage={emailError}
            autoFocus
          />
        </Flex>

        <Flex direction="column" gap="spacing-2">
          <Text as="label" htmlFor="login-password" variant="subheader-1">
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
            validationState={passwordError ? 'invalid' : undefined}
            errorMessage={passwordError}
          />
        </Flex>

        <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember}>
          Запомнить меня
        </Checkbox>

        <Button type="submit" view="action" size="l" width="max" loading={loading}>
          Войти
        </Button>
      </Flex>
    </Card>
  );
}
