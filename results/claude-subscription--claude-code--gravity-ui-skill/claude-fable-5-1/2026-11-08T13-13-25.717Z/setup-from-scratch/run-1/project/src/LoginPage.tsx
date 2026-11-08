import React from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const emailError = !email
    ? 'Введите email'
    : !EMAIL_RE.test(email)
      ? 'Некорректный email'
      : undefined;
  const passwordError = !password ? 'Введите пароль' : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (emailError || passwordError) {
      return;
    }
    setLoading(true);
    // TODO: заменить на реальный запрос авторизации
    window.setTimeout(() => setLoading(false), 800);
  };

  return (
    <Card view="outlined" className="login-card" padding="spacing-6">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-5">
          <Flex direction="column" gap="spacing-1">
            <Text variant="header-2" as="h1">
              Вход
            </Text>
            <Text variant="body-1" color="secondary">
              Введите данные учётной записи, чтобы продолжить
            </Text>
          </Flex>

          <Flex direction="column" gap="spacing-4">
            <Flex direction="column" gap="spacing-1">
              <Text variant="body-1" as="label" htmlFor="login-email">
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
                validationState={submitted && emailError ? 'invalid' : undefined}
                errorMessage={submitted ? emailError : undefined}
              />
            </Flex>

            <Flex direction="column" gap="spacing-1">
              <Text variant="body-1" as="label" htmlFor="login-password">
                Пароль
              </Text>
              <PasswordInput
                id="login-password"
                name="password"
                size="l"
                autoComplete="current-password"
                placeholder="Введите пароль"
                hideCopyButton
                value={password}
                onUpdate={setPassword}
                validationState={submitted && passwordError ? 'invalid' : undefined}
                errorMessage={submitted ? passwordError : undefined}
              />
            </Flex>

            <Checkbox size="l" checked={remember} onUpdate={setRemember}>
              Запомнить меня
            </Checkbox>
          </Flex>

          <Button type="submit" view="action" size="l" width="max" loading={loading}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
