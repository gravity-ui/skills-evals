import { useState } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, TextInput, Text } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <main className="page">
      <Card type="container" view="raised" size="l" style={{ width: 384 }}>
        <Flex direction="column" gap="spacing-4">
          <Text variant="header-1">Вход</Text>
          <Flex direction="column" gap="spacing-3">
            <TextInput
              type="email"
              label="Email"
              placeholder="Введите email"
              value={email}
              onUpdate={setEmail}
              size="l"
            />
            <PasswordInput
              label="Пароль"
              placeholder="Введите пароль"
              value={password}
              onUpdate={setPassword}
              size="l"
            />
          </Flex>
          <Checkbox
            size="l"
            checked={remember}
            onUpdate={setRemember}
            content="Запомнить меня"
          />
          <Button view="action" size="l" width="max">
            Войти
          </Button>
        </Flex>
      </Card>
    </main>
  );
}
