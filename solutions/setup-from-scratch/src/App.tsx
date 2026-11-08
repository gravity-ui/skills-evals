import { useState } from 'react';
import { Button, Card, Checkbox, Flex, Text, TextInput } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  return (
    <main className="page">
      <Card view="outlined" style={{ padding: 'var(--g-spacing-6)', width: 360 }}>
        <Flex as="form" direction="column" gap={4} onSubmit={(e) => e.preventDefault()}>
          <Text variant="header-1">Вход</Text>
          <TextInput label="Email" type="email" value={email} onUpdate={setEmail} />
          <TextInput label="Пароль" type="password" value={password} onUpdate={setPassword} />
          <Checkbox checked={remember} onUpdate={setRemember} content="Запомнить меня" />
          <Button view="action" size="l" type="submit" width="max">Войти</Button>
        </Flex>
      </Card>
    </main>
  );
}
