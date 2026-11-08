import React, {useState} from 'react';
import type {FormEvent} from 'react';
import {Button, Checkbox, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
  };

  return (
    <main className="page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Вход</h1>
        <TextInput
          value={email}
          onUpdate={(value) => setEmail(value)}
          placeholder="Электронная почта"
          type="email"
          name="email"
          autoComplete="email"
          size="l"
        />
        <TextInput
          value={password}
          onUpdate={(value) => setPassword(value)}
          placeholder="Пароль"
          type="password"
          name="password"
          autoComplete="current-password"
          size="l"
        />
        <Checkbox
          checked={rememberMe}
          onUpdate={(checked) => setRememberMe(Boolean(checked))}
          size="l"
          content="Запомнить меня"
        />
        <Button type="submit" view="action" size="l" width="max" loading={isSubmitting}>
          Войти
        </Button>
      </form>
    </main>
  );
}
