import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';
import React from 'react';

import './LoginPage.css';

export function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: подключить реальную авторизацию
    console.info('login', {email, rememberMe});
  };

  return (
    <Card className="login-card" view="outlined" size="l">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="spacing-5">
          <Text variant="header-1">Вход</Text>

          <TextInput
            type="email"
            name="email"
            size="xl"
            label="Email"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onUpdate={setEmail}
            controlProps={{required: true}}
          />

          <PasswordInput
            name="password"
            size="xl"
            label="Пароль"
            autoComplete="current-password"
            value={password}
            onUpdate={setPassword}
            hideCopyButton
            controlProps={{required: true}}
          />

          <Checkbox size="l" checked={rememberMe} onUpdate={setRememberMe}>
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="xl" width="max">
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
