import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="page">
      <Card type="container" view="outlined" size="l" className="login-card">
        <Flex as="form" direction="column" gap="spacing-5" padding="spacing-6" onSubmit={handleSubmit}>
          <Text variant="header-2">Вход</Text>

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
              controlProps={{ required: true }}
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
              hideCopyButton
              value={password}
              onUpdate={setPassword}
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
      </Card>
    </main>
  );
}
