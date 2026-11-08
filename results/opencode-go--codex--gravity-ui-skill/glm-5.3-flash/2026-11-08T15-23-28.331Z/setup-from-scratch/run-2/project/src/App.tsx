import {useState} from 'react';
import {Button, Checkbox, Flex, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <main className="page">
      <form
        className="login-card"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Flex direction="column" gap="spacing-4" width="100%">
          <h1 className="login-title">Войти</h1>
          <TextInput
            label="Email"
            placeholder="name@example.com"
            size="l"
            type="email"
            autoComplete="email"
            value={email}
            onUpdate={setEmail}
          />
          <TextInput
            label="Пароль"
            placeholder="Введите пароль"
            size="l"
            type="password"
            autoComplete="current-password"
            value={password}
            onUpdate={setPassword}
          />
          <Checkbox
            checked={rememberMe}
            size="l"
            content="Запомнить меня"
            onUpdate={setRememberMe}
          />
          <Button
            type="submit"
            view="action"
            size="l"
            width="max"
            disabled={!email.trim() || !password.trim()}
          >
            Войти
          </Button>
        </Flex>
      </form>
    </main>
  );
}
