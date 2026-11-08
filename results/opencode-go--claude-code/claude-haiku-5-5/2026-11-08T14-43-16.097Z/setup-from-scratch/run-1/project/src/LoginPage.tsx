import {useState} from 'react';
import type {FormEvent} from 'react';

import {Button, Card, Checkbox, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Отправки на сервер пока нет: форма только собирает данные.
    event.preventDefault();
  }

  return (
    <Card className="login-card" size="l">
      <form className="login-form" onSubmit={handleSubmit}>
        <Text as="h1" variant="header-2">
          Вход
        </Text>

        <div className="login-field">
          <label className="login-field__label" htmlFor="login-email">
            Email
          </label>
          <TextInput
            id="login-email"
            name="email"
            type="email"
            size="l"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onUpdate={setEmail}
            controlProps={{required: true}}
          />
        </div>

        <div className="login-field">
          <label className="login-field__label" htmlFor="login-password">
            Пароль
          </label>
          <PasswordInput
            id="login-password"
            name="password"
            size="l"
            autoComplete="current-password"
            value={password}
            onUpdate={setPassword}
            hideCopyButton
            controlProps={{required: true}}
          />
        </div>

        <Checkbox size="l" checked={rememberMe} onUpdate={setRememberMe}>
          Запомнить меня
        </Checkbox>

        <Button type="submit" view="action" size="l" width="max">
          Войти
        </Button>
      </form>
    </Card>
  );
}
