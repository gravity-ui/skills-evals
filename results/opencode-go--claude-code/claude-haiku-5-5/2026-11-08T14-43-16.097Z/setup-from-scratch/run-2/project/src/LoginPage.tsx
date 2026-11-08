import * as React from 'react';

import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Отправка на бэкенд ещё не подключена.
  };

  return (
    <Card view="outlined" size="l" padding="spacing-6" className="login-card">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="spacing-5">
          <Text as="h1" variant="header-2">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-2">
            <Text as="label" htmlFor="login-email" variant="body-short" color="secondary">
              Email
            </Text>
            <TextInput
              id="login-email"
              name="email"
              type="email"
              size="l"
              autoComplete="username"
              value={email}
              onUpdate={setEmail}
              controlProps={{ required: true }}
            />
          </Flex>

          <Flex direction="column" gap="spacing-2">
            <Text as="label" htmlFor="login-password" variant="body-short" color="secondary">
              Пароль
            </Text>
            <PasswordInput
              id="login-password"
              name="password"
              size="l"
              autoComplete="current-password"
              value={password}
              onUpdate={setPassword}
              hideCopyButton
              controlProps={{ required: true }}
            />
          </Flex>

          <Checkbox size="l" checked={rememberMe} onUpdate={setRememberMe}>
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="l" width="max">
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
