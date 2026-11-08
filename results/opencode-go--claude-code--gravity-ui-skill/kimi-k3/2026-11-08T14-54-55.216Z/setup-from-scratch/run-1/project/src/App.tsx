import React from 'react';

import {
  Button,
  Card,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Здесь будет вызов API авторизации
  };

  return (
    <main className="page">
      <Card className="login-card" type="container" view="raised" size="l">
        <form onSubmit={handleSubmit} noValidate>
          <Flex direction="column" gap="spacing-4">
            <Text variant="header-1">Вход</Text>

            <Flex direction="column" gap="spacing-1">
              <Text variant="body-2">Email</Text>
              <TextInput
                id="email"
                name="email"
                type="email"
                size="l"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onUpdate={setEmail}
              />
            </Flex>

            <Flex direction="column" gap="spacing-1">
              <Text variant="body-2">Пароль</Text>
              <PasswordInput
                id="password"
                name="password"
                size="l"
                placeholder="Введите пароль"
                autoComplete="current-password"
                hideCopyButton
                value={password}
                onUpdate={setPassword}
              />
            </Flex>

            <Checkbox
              size="l"
              checked={rememberMe}
              onUpdate={setRememberMe}
              content="Запомнить меня"
            />

            <Button view="action" size="l" width="max" type="submit">
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
