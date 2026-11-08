import { useState, type FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  /** Вызывается после успешной клиентской валидации формы. */
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginFormValues): FieldErrors {
  const errors: FieldErrors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = 'Введите email';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Некорректный email';
  }

  if (!values.password) {
    errors.password = 'Введите пароль';
  }

  return errors;
}

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values: LoginFormValues = { email: email.trim(), password, remember };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit?.(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card type="container" view="raised" size="l" className="login-card">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="1">
            <Text as="h1" variant="header-2">
              Вход
            </Text>
            <Text color="secondary">Введите данные учётной записи</Text>
          </Flex>

          <Flex direction="column" gap="3">
            <Flex direction="column" gap="1">
              <Text as="label" variant="body-1" htmlFor="login-email">
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
              />
            </Flex>

            <Flex direction="column" gap="1">
              <Text as="label" variant="body-1" htmlFor="login-password">
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
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                validationState={errors.password ? 'invalid' : undefined}
                errorMessage={errors.password}
              />
            </Flex>

            <Checkbox
              size="l"
              name="remember"
              checked={remember}
              onUpdate={setRemember}
            >
              Запомнить меня
            </Checkbox>
          </Flex>

          <Button type="submit" view="action" size="l" width="max" loading={submitting}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
