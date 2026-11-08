import {useState} from 'react';

import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="page">
      <Card className="login-card" size="l">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="spacing-4">
            <Text variant="header-1">Вход</Text>

            <Flex direction="column" gap="spacing-2">
              <Text variant="body-2" color="secondary">
                Email
              </Text>
              <TextInput
                type="email"
                name="email"
                size="l"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onUpdate={setEmail}
              />
            </Flex>

            <Flex direction="column" gap="spacing-2">
              <Text variant="body-2" color="secondary">
                Пароль
              </Text>
              <PasswordInput
                name="password"
                size="l"
                placeholder="Введите пароль"
                autoComplete="current-password"
                hideCopyButton
                value={password}
                onUpdate={setPassword}
              />
            </Flex>

            <Checkbox name="remember" checked={remember} onUpdate={setRemember} content="Запомнить меня" />

            <Button type="submit" view="action" size="l" width="max">
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
