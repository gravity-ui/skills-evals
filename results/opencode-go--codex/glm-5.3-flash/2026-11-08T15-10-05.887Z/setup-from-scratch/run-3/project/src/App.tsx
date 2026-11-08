import React from 'react';
import { Button, Checkbox, TextInput } from '@gravity-ui/uikit';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type FormErrors = Partial<Record<keyof Pick<LoginForm, 'email' | 'password'>, string>>;

function validateForm(form: LoginForm): FormErrors {
  const errors: FormErrors = {};

  if (!EMAIL_PATTERN.test(form.email)) {
    errors.email = 'Укажите корректный email';
  }

  if (form.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов';
  }

  return errors;
}

export function App() {
  const [form, setForm] = React.useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log('signIn', form);
    }
  };

  return (
    <main className="page">
      <form className="login-form" noValidate onSubmit={handleSubmit}>
        <h1 className="login-form__title">Вход</h1>

        <TextInput
          label="Email"
          name="email"
          placeholder="user@example.com"
          type="email"
          autoComplete="email"
          value={form.email}
          validationState={errors.email ? 'invalid' : undefined}
          errorMessage={errors.email}
          onUpdate={(email) => {
            setForm((current) => ({ ...current, email }));
            setErrors((current) => ({ ...current, email: undefined }));
          }}
        />

        <TextInput
          label="Пароль"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          validationState={errors.password ? 'invalid' : undefined}
          errorMessage={errors.password}
          onUpdate={(password) => {
            setForm((current) => ({ ...current, password }));
            setErrors((current) => ({ ...current, password: undefined }));
          }}
        />

        <Checkbox
          name="rememberMe"
          checked={form.rememberMe}
          onChange={(event) => {
            setForm((current) => ({ ...current, rememberMe: event.target.checked }));
          }}
        >
          Запомнить меня
        </Checkbox>

        <Button type="submit" view="action" size="l" width="max">
          Войти
        </Button>
      </form>
    </main>
  );
}
