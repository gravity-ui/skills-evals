import { useState } from 'react';

import {
  Button,
  Card,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
  ThemeProvider,
} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: подключить реальную авторизацию
    console.log({ email, password, remember });
  };

  return (
    <ThemeProvider theme="light">
      <main className="page">
        <Card className="login-card" type="container" size="l">
          <form className="login-form" onSubmit={handleSubmit}>
            <Text variant="header-2">Вход</Text>

            <TextInput
              label="Email"
              type="email"
              size="l"
              placeholder="you@example.com"
              value={email}
              onUpdate={setEmail}
            />

            <PasswordInput
              label="Пароль"
              size="l"
              placeholder="Введите пароль"
              value={password}
              onUpdate={setPassword}
            />

            <Checkbox
              content="Запомнить меня"
              size="l"
              checked={remember}
              onUpdate={setRemember}
            />

            <Button view="action" size="l" width="max" type="submit">
              Войти
            </Button>
          </form>
        </Card>
      </main>
    </ThemeProvider>
  );
}
