import { useState } from 'react';

import { Button, Checkbox, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Здесь будет логика авторизации
  };

  return (
    <main className="page">
      <form className="login-card" onSubmit={handleSubmit}>
        <Text variant="header-1">Вход</Text>
        <TextInput
          type="email"
          size="l"
          placeholder="Электронная почта"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
        <PasswordInput
          size="l"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          hideRevealButton={false}
        />
        <Checkbox size="l" checked={rememberMe} onUpdate={setRememberMe}>
          Запомнить меня
        </Checkbox>
        <Button view="action" size="l" width="max" type="submit">
          Войти
        </Button>
      </form>
    </main>
  );
}
