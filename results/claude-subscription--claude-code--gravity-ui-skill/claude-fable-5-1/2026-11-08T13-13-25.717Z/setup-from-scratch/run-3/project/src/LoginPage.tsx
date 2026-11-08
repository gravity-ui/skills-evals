import * as React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@gravity-ui/uikit';

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginPageProps {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginFormValues): FieldErrors {
  const errors: FieldErrors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = 'Введите email';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Некорректный email';
  }

  if (!values.password) {
    errors.password = 'Введите пароль';
  }

  return errors;
}

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values: LoginFormValues = { email: email.trim(), password, rememberMe };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError(null);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit?.(values);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Не удалось войти. Попробуйте ещё раз.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card view="outlined" className="login-card">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-6" padding="spacing-6">
          <Flex direction="column" gap="spacing-1">
            <Text variant="header-2" as="h1">
              Вход
            </Text>
            <Text variant="body-1" color="secondary">
              Введите данные учётной записи, чтобы продолжить
            </Text>
          </Flex>

          <Flex direction="column" gap="spacing-4">
            <Flex direction="column" gap="spacing-1">
              <Text variant="body-1" as="label" htmlFor="login-email">
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
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                validationState={errors.email ? 'invalid' : undefined}
                errorMessage={errors.email}
                disabled={loading}
              />
            </Flex>

            <Flex direction="column" gap="spacing-1">
              <Text variant="body-1" as="label" htmlFor="login-password">
                Пароль
              </Text>
              <PasswordInput
                id="login-password"
                name="password"
                size="l"
                autoComplete="current-password"
                placeholder="Введите пароль"
                value={password}
                onUpdate={(value) => {
                  setPassword(value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                validationState={errors.password ? 'invalid' : undefined}
                errorMessage={errors.password}
                hideCopyButton
                disabled={loading}
              />
            </Flex>

            <Checkbox
              size="l"
              name="rememberMe"
              checked={rememberMe}
              onUpdate={setRememberMe}
              disabled={loading}
            >
              Запомнить меня
            </Checkbox>
          </Flex>

          {submitError ? (
            <Text variant="body-1" color="danger" role="alert">
              {submitError}
            </Text>
          ) : null}

          <Button type="submit" view="action" size="l" width="max" loading={loading}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
