import { useId, useState, type FormEvent } from 'react';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@gravity-ui/uikit';

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  /** Вызывается с данными формы после успешной клиентской валидации. Ошибка → показывается в Alert. */
  onSubmit?: (values: LoginValues) => Promise<void> | void;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }: LoginValues): FieldErrors {
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

export function LoginPage({ onSubmit }: LoginPageProps) {
  const emailId = useId();
  const passwordId = useId();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
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
      await onSubmit?.(values);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось войти');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card view="raised" width="100%" maxWidth="400px" padding="spacing-8">
      <Flex as="form" direction="column" gap="spacing-5" onSubmit={handleSubmit} noValidate>
        <Text variant="header-1" as="h1" className="login-card__title">
          Вход
        </Text>

        {submitError && <Alert theme="danger" message={submitError} />}

        <Flex direction="column" gap="spacing-1">
          <Text as="label" htmlFor={emailId} variant="subheader-1">
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
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            validationState={errors.email ? 'invalid' : undefined}
            errorMessage={errors.email}
            disabled={loading}
            autoFocus
          />
        </Flex>

        <Flex direction="column" gap="spacing-1">
          <Text as="label" htmlFor={passwordId} variant="subheader-1">
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
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            validationState={errors.password ? 'invalid' : undefined}
            errorMessage={errors.password}
            disabled={loading}
          />
        </Flex>

        <Checkbox
          name="remember"
          size="l"
          checked={remember}
          onUpdate={setRemember}
          disabled={loading}
        >
          Запомнить меня
        </Checkbox>

        <Button type="submit" view="action" size="l" width="max" loading={loading}>
          Войти
        </Button>
      </Flex>
    </Card>
  );
}
