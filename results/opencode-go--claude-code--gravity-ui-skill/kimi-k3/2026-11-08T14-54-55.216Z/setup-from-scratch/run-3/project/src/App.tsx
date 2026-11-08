import * as React from 'react';

import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Здесь будет запрос авторизации
    console.log({email, password, remember});
  };

  return (
    <main className="page">
      <Card className="login-card" view="raised" size="l">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="spacing-5">
            <Text variant="header-1">Вход</Text>
            <TextInput
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              size="l"
              value={email}
              onUpdate={setEmail}
            />
            <PasswordInput
              name="password"
              autoComplete="current-password"
              placeholder="Пароль"
              size="l"
              hideCopyButton
              value={password}
              onUpdate={setPassword}
            />
            <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember}>
              Запомнить меня
            </Checkbox>
            <Button type="submit" view="action" size="l" width="max">
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
