import { useState } from 'react';
import { Button, Checkbox, Flex, PasswordInput, TextInput } from '@gravity-ui/uikit';

import './App.css';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <Flex direction="column" gap="5">
          <h1 className="login-title">Вход</h1>
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            controlProps={{ required: true }}
          />
          <PasswordInput
            name="password"
            label="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            controlProps={{ required: true }}
          />
          <Checkbox name="rememberMe" checked={rememberMe} onUpdate={setRememberMe}>
            Запомнить меня
          </Checkbox>
          <Button type="submit" view="action" size="l">
            Войти
          </Button>
        </Flex>
      </form>
    </main>
  );
}
