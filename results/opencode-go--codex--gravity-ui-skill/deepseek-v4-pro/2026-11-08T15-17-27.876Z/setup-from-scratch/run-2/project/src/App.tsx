import React from 'react';
import {
  Provider,
  Card,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Text,
  Flex,
} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Provider theme="system">
      <main className="page">
        <Card type="container" view="outlined" className="login-card">
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="spacing-4">
              <Text variant="header-1">Войти</Text>

              <Flex direction="column" gap="spacing-3">
                <TextInput
                  type="email"
                  size="l"
                  placeholder="Email"
                  value={email}
                  onUpdate={setEmail}
                />
                <PasswordInput
                  size="l"
                  placeholder="Пароль"
                  value={password}
                  onUpdate={setPassword}
                />
              </Flex>

              <Checkbox
                size="l"
                checked={remember}
                onUpdate={setRemember}
              >
                Запомнить меня
              </Checkbox>

              <Button view="action" size="l" width="max" type="submit">
                Войти
              </Button>
            </Flex>
          </form>
        </Card>
      </main>
    </Provider>
  );
}
