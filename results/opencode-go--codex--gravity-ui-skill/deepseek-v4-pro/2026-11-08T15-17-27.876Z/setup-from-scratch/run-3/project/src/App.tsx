import {useState} from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--g-color-base-background)',
      }}
    >
      <Card view="outlined" style={{width: 400, maxWidth: 'calc(100% - 32px)'}}>
        <Flex direction="column" gap="spacing-4" style={{padding: 'var(--g-spacing-6)'}}>
          <Text variant="header-1">Вход</Text>

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

          <Checkbox
            size="l"
            checked={remember}
            onUpdate={setRemember}
          >
            Запомнить меня
          </Checkbox>

          <Button view="action" size="l" width="max">
            Войти
          </Button>
        </Flex>
      </Card>
    </main>
  );
}
