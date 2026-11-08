import React from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: подключить реальную авторизацию
    console.info('login', {email, rememberMe});
  };

  return (
    <main className="page">
      <Card className="login-card" type="container" view="outlined">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="spacing-5" padding="spacing-6">
            <Text variant="header-1">Вход</Text>

            <Flex direction="column" gap="spacing-4">
              <TextInput
                type="email"
                name="email"
                size="l"
                label="Email"
                placeholder="name@example.com"
                autoComplete="email"
                value={email}
                onUpdate={setEmail}
                controlProps={{required: true}}
              />
              <PasswordInput
                name="password"
                size="l"
                label="Пароль"
                autoComplete="current-password"
                value={password}
                onUpdate={setPassword}
                controlProps={{required: true}}
              />
              <Checkbox size="l" checked={rememberMe} onUpdate={setRememberMe}>
                Запомнить меня
              </Checkbox>
            </Flex>

            <Button type="submit" view="action" size="xl" width="max">
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
