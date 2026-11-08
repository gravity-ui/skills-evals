import {useState} from 'react';
import type {FormEvent} from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Отправка на сервер пока не подключена.
  };

  return (
    <main className="page">
      <Card size="l" view="outlined" width="360px" maxWidth="100%">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="spacing-5">
            <Text as="h1" variant="header-2">
              Вход
            </Text>

            <Flex direction="column" gap="spacing-2">
              <Text as="label" htmlFor="login-email" variant="body-2">
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
              />
            </Flex>

            <Flex direction="column" gap="spacing-2">
              <Text as="label" htmlFor="login-password" variant="body-2">
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
    </main>
  );
}
