import { useState } from 'react';
import { Button, Card, Checkbox, Text, TextInput } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <main className="page">
      <Card className="login-card" view="raised" size="l">
        <Text variant="header-2" as="h1">
          Вход
        </Text>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextInput
            type="email"
            size="l"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onUpdate={setEmail}
            autoComplete="email"
          />
          <TextInput
            type="password"
            size="l"
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onUpdate={setPassword}
            autoComplete="current-password"
          />
          <Checkbox
            size="l"
            content="Запомнить меня"
            checked={rememberMe}
            onUpdate={setRememberMe}
          />
          <Button type="submit" view="action" size="l" width="max">
            Войти
          </Button>
        </form>
      </Card>
    </main>
  );
}
