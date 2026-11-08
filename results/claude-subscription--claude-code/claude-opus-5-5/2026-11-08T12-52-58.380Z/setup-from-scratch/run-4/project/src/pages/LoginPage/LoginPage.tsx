import { useState, type FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

import './LoginPage.css';

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  onSubmit: (values: LoginValues) => void | Promise<void>;
}

type Errors = Partial<Record<'email' | 'password', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }: LoginValues): Errors {
  const errors: Errors = {};
  if (!email.trim()) {
    errors.email = 'Введите email';
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = 'Некорректный email';
  }
  if (!password) {
    errors.password = 'Введите пароль';
  }
  return errors;
}

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = { email: email.trim(), password, remember };
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
    <Card className="login-card" view="raised" size="l">
      <form noValidate onSubmit={handleSubmit}>
        <Flex direction="column" gap="spacing-5">
          <Text as="h1" variant="header-1" className="login-card__title">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" htmlFor="login-email" variant="body-1">
              Email
            </Text>
            <TextInput
              id="login-email"
              name="email"
              type="email"
              size="l"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onUpdate={(value) => {
                setEmail(value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              validationState={errors.email ? 'invalid' : undefined}
              errorMessage={errors.email}
            />
          </Flex>

          <Flex direction="column" gap="spacing-1">
            <Text as="label" htmlFor="login-password" variant="body-1">
              Пароль
            </Text>
            <PasswordInput
              id="login-password"
              name="password"
              size="l"
              autoComplete="current-password"
              hideCopyButton
              value={password}
              onUpdate={(value) => {
                setPassword(value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              validationState={errors.password ? 'invalid' : undefined}
              errorMessage={errors.password}
            />
          </Flex>

          <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember}>
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
