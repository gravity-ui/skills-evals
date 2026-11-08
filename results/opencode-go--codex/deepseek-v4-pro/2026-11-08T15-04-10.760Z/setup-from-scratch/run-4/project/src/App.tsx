import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Text,
  TextInput,
} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <main className="page">
      <Card className="login-card" view="filled" size="l">
        <Text variant="header-1" as="h1" className="login-title">
          Вход
        </Text>

        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            // handle login
          }}
        >
          <TextInput
            type="email"
            label="Email"
            value={email}
            onUpdate={setEmail}
            placeholder="you@example.com"
            size="l"
          />

          <TextInput
            type="password"
            label="Пароль"
            value={password}
            onUpdate={setPassword}
            placeholder="Введите пароль"
            size="l"
          />

          <Checkbox
            size="l"
            checked={rememberMe}
            onUpdate={setRememberMe}
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
