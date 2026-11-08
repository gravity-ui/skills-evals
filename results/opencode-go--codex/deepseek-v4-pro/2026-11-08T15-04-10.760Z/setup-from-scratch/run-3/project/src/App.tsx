import { useState, type FormEvent } from 'react';

import { Button, Card, Checkbox, TextInput } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="page">
      <Card view="raised" size="l" style={{ width: 400 }}>
        <form onSubmit={handleSubmit} style={{ padding: 32 }}>
          <h2 style={{ margin: '0 0 24px', textAlign: 'center' }}>Вход</h2>

          <div style={{ marginBottom: 16 }}>
            <TextInput
              label="Email"
              type="email"
              size="l"
              value={email}
              onUpdate={setEmail}
              placeholder="email@example.com"
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <TextInput
              label="Пароль"
              type="password"
              size="l"
              value={password}
              onUpdate={setPassword}
              placeholder="••••••••"
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <Checkbox
              size="l"
              checked={remember}
              onUpdate={setRemember}
            >
              Запомнить меня
            </Checkbox>
          </div>

          <Button view="action" size="l" width="max" type="submit">
            Войти
          </Button>
        </form>
      </Card>
    </main>
  );
}
