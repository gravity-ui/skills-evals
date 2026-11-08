import { useState } from 'react';
import type { FormEvent } from 'react';
import { Box, Button, Card, Checkbox, Flex, Text, TextInput } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Отправка на сервер пока не подключена.
  };

  return (
    <main className="page">
      <Card type="container" view="outlined" size="l" className="login-card">
        <Box padding="spacing-6">
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="spacing-5">
              <Text as="h1" variant="header-2">
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
                  placeholder="name@example.com"
                  autoComplete="username"
                  value={email}
                  onUpdate={setEmail}
                  controlProps={{ required: true }}
                />
              </Flex>

              <Flex direction="column" gap="spacing-2">
                <Text as="label" htmlFor="login-password" variant="subheader-1">
                  Пароль
                </Text>
                <TextInput
                  id="login-password"
                  name="password"
                  type="password"
                  size="l"
                  autoComplete="current-password"
                  value={password}
                  onUpdate={setPassword}
                  controlProps={{ required: true }}
                />
              </Flex>

              <Checkbox size="l" checked={remember} onUpdate={setRemember}>
                Запомнить меня
              </Checkbox>

              <Button type="submit" view="action" size="l" width="max">
                Войти
              </Button>
            </Flex>
          </form>
        </Box>
      </Card>
    </main>
  );
}
