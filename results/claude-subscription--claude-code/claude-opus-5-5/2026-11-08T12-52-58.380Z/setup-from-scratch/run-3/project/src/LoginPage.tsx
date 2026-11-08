import * as React from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  onSubmit?: (values: LoginValues) => void | Promise<void>;
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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});
  const [loading, setLoading] = React.useState(false);

  const emailId = React.useId();
  const passwordId = React.useId();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = { email: email.trim(), password, remember };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !onSubmit) {
      return;
    }
    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="login-card" view="raised">
      <Flex as="form" direction="column" gap="spacing-5" padding="spacing-6" noValidate onSubmit={handleSubmit}>
        <Text as="h1" variant="header-2" style={{ margin: 0 }}>
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

        <Button type="submit" view="action" size="l" width="max" loading={loading}>
          Войти
        </Button>
      </Flex>
    </Card>
  );
}
