import './LoginPage.css';

import { useState, type FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  onSubmit: (values: LoginValues) => void | Promise<void>;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

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
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = { email: email.trim(), password, remember };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError(undefined);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(values);
    } catch {
      setSubmitError('Не удалось войти. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="login-page" view="outlined" size="l">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-6">
          <Text as="h1" variant="header-1">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-4">
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
                placeholder="name@example.com"
                value={email}
                onUpdate={(value) => {
                  setEmail(value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                validationState={errors.email ? 'invalid' : undefined}
                errorMessage={errors.email}
                disabled={loading}
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
                disabled={loading}
              />
            </Flex>

            <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember} disabled={loading}>
              Запомнить меня
            </Checkbox>
          </Flex>

          {submitError && (
            <Text variant="body-1" color="danger" role="alert">
              {submitError}
            </Text>
          )}

          <Button type="submit" view="action" size="l" width="max" loading={loading}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
