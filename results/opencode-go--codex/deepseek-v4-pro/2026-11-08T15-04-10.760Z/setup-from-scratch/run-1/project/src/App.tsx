import { useState, type FormEvent } from 'react';
import { Card, Text, TextInput, Checkbox, Button } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: real auth
  };

  return (
    <main className="page">
      <Card type="container" view="raised" className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <Text variant="header-1" className="login-title">
            Вход
          </Text>

          <TextInput
            type="email"
            label="Email"
            placeholder="Введите email"
            value={email}
            onUpdate={setEmail}
            size="l"
          />

          <TextInput
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onUpdate={setPassword}
            size="l"
          />

          <Checkbox
            checked={remember}
            onUpdate={setRemember}
            size="l"
          >
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="l" width="max">
            Войти
          </Button>
        </form>
      </Card>
    </main>
  );
}
