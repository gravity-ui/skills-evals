import { useState } from 'react';
import type { FormEvent } from 'react';

import { Button, Checkbox, TextInput } from '@gravity-ui/uikit';

type FormErrors = {
  email?: string;
  password?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: { email: string; password: string }): FormErrors {
  const errors: FormErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Введите email';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Введите корректный email';
  }

  if (!values.password) {
    errors.password = 'Введите пароль';
  }

  return errors;
}

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate({ email, password });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log({ email, password, rememberMe });
    }
  };

  return (
    <main className="page">
      <form className="login-card" noValidate onSubmit={handleSubmit}>
        <h1 className="login-card__title">Вход</h1>

        <div className="login-card__field">
          <label className="login-card__label" htmlFor="email">
            Email
          </label>
          <TextInput
            errorPlacement="outside"
            errorMessage={errors.email}
            id="email"
            name="email"
            placeholder="name@example.com"
            size="l"
            type="email"
            validationState={errors.email ? 'invalid' : undefined}
            value={email}
            autoComplete="email"
            onUpdate={setEmail}
          />
        </div>

        <div className="login-card__field">
          <label className="login-card__label" htmlFor="password">
            Пароль
          </label>
          <TextInput
            errorPlacement="outside"
            errorMessage={errors.password}
            id="password"
            name="password"
            placeholder="Введите пароль"
            size="l"
            type="password"
            validationState={errors.password ? 'invalid' : undefined}
            value={password}
            autoComplete="current-password"
            onUpdate={setPassword}
          />
        </div>

        <Checkbox checked={rememberMe} size="l" onUpdate={setRememberMe}>
          Запомнить меня
        </Checkbox>

        <Button type="submit" size="l" view="action" width="max">
          Войти
        </Button>
      </form>
    </main>
  );
}
