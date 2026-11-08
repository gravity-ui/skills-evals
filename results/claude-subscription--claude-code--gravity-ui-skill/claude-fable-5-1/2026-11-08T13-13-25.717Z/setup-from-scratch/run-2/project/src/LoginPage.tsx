import * as React from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

const EMAIL_ID = 'login-email';
const PASSWORD_ID = 'login-password';

export function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const emailError = submitted && !email.trim() ? 'Введите email' : undefined;
  const passwordError = submitted && !password ? 'Введите пароль' : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (!email.trim() || !password) {
      return;
    }
    setLoading(true);
    // TODO: заменить на реальный запрос авторизации
    window.setTimeout(() => setLoading(false), 800);
  };

  return (
    <Card view="raised" size="l" className="login-card">
      <Flex as="form" direction="column" gap="spacing-6" onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-2">
          <Text as="h1" variant="header-2" className="login-title">
            Вход
          </Text>
          <Text variant="body-1" color="secondary">
            Введите данные учётной записи, чтобы продолжить
          </Text>
        </Flex>

        <Flex direction="column" gap="spacing-4">
          <Flex direction="column" gap="spacing-1">
            <Text as="label" variant="body-1" htmlFor={EMAIL_ID}>
              Email
            </Text>
            <TextInput
              id={EMAIL_ID}
              name="email"
              type="email"
              size="l"
              value={email}
              onUpdate={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              hasClear
              validationState={emailError ? 'invalid' : undefined}
              errorMessage={emailError}
            />
          </Flex>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" variant="body-1" htmlFor={PASSWORD_ID}>
              Пароль
            </Text>
            <PasswordInput
              id={PASSWORD_ID}
              name="password"
              size="l"
              value={password}
              onUpdate={setPassword}
              autoComplete="current-password"
              hideCopyButton
              validationState={passwordError ? 'invalid' : undefined}
              errorMessage={passwordError}
            />
          </Flex>

          <Checkbox size="l" name="remember" checked={remember} onUpdate={setRemember}>
            Запомнить меня
          </Checkbox>
        </Flex>

        <Button type="submit" view="action" size="xl" width="max" loading={loading}>
          Войти
        </Button>
      </Flex>
    </Card>
  );
}
