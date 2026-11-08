import * as React from 'react';
import {Alert, Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  onSubmit: (values: LoginValues) => Promise<void> | void;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({email, password}: LoginValues): FieldErrors {
  const errors: FieldErrors = {};
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

export function LoginForm({onSubmit}: LoginFormProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = {email: email.trim(), password, remember};
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError(null);
    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(values);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось войти');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card view="outlined" width="100%" maxWidth="400px" padding={{s: 'spacing-6', m: 'spacing-8'}}>
      <Flex as="form" direction="column" gap="spacing-5" noValidate onSubmit={handleSubmit}>
        <Flex direction="column" gap="spacing-1">
          <Text variant="header-1">Вход</Text>
          <Text color="secondary">Войдите в свой аккаунт</Text>
        </Flex>

        {submitError && <Alert theme="danger" message={submitError} />}

        <Flex direction="column" gap="spacing-2">
          <Text as="label" htmlFor="login-email" variant="subheader-1">
            Email
          </Text>
          <TextInput
            id="login-email"
            name="email"
            type="email"
            size="l"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onUpdate={(value) => {
              setEmail(value);
              if (errors.email) setErrors((prev) => ({...prev, email: undefined}));
            }}
            validationState={errors.email ? 'invalid' : undefined}
            errorMessage={errors.email}
            disabled={loading}
          />
        </Flex>

        <Flex direction="column" gap="spacing-2">
          <Text as="label" htmlFor="login-password" variant="subheader-1">
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
              if (errors.password) setErrors((prev) => ({...prev, password: undefined}));
            }}
            validationState={errors.password ? 'invalid' : undefined}
            errorMessage={errors.password}
            disabled={loading}
          />
        </Flex>

        <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember} disabled={loading}>
          Запомнить меня
        </Checkbox>

        <Button type="submit" view="action" size="l" width="max" loading={loading}>
          Войти
        </Button>
      </Flex>
    </Card>
  );
}
