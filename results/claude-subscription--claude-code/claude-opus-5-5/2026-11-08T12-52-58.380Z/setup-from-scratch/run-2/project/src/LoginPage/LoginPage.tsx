import * as React from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

import './LoginPage.css';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
}

type FormErrors = Partial<Record<'email' | 'password', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({email, password}: LoginFormValues): FormErrors {
  const errors: FormErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = 'Введите email';
  } else if (!EMAIL_RE.test(trimmedEmail)) {
    errors.email = 'Некорректный email';
  }

  if (!password) {
    errors.password = 'Введите пароль';
  }

  return errors;
}

export function LoginPage({onSubmit}: LoginPageProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const emailId = React.useId();
  const passwordId = React.useId();
  const titleId = React.useId();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = {email: email.trim(), password, remember};
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card view="raised" size="l" padding="spacing-8" className="login-page__card">
      <form noValidate aria-labelledby={titleId} onSubmit={handleSubmit}>
        <Flex direction="column" gap="spacing-5">
          <Text as="h1" id={titleId} variant="header-1" className="login-page__title">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" htmlFor={emailId} variant="body-1">
              Email
            </Text>
            <TextInput
              id={emailId}
              name="email"
              type="email"
              size="l"
              autoComplete="email"
              placeholder="name@example.com"
              autoFocus
              value={email}
              onUpdate={(value) => {
                setEmail(value);
                setErrors((prev) => ({...prev, email: undefined}));
              }}
              validationState={errors.email ? 'invalid' : undefined}
              errorMessage={errors.email}
              disabled={submitting}
            />
          </Flex>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" htmlFor={passwordId} variant="body-1">
              Пароль
            </Text>
            <PasswordInput
              id={passwordId}
              name="password"
              size="l"
              autoComplete="current-password"
              hideCopyButton
              value={password}
              onUpdate={(value) => {
                setPassword(value);
                setErrors((prev) => ({...prev, password: undefined}));
              }}
              validationState={errors.password ? 'invalid' : undefined}
              errorMessage={errors.password}
              disabled={submitting}
            />
          </Flex>

          <Checkbox
            name="remember"
            size="l"
            checked={remember}
            onUpdate={setRemember}
            disabled={submitting}
          >
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="l" width="max" loading={submitting}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
