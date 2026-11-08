import { useState, type FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginPageProps {
  onSubmit: (values: LoginValues) => void;
}

type Errors = Partial<Record<'email' | 'password', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }: LoginValues): Errors {
  const errors: Errors = {};
  if (!email.trim()) errors.email = 'Введите email';
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'Некорректный email';
  if (!password) errors.password = 'Введите пароль';
  return errors;
}

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = { email: email.trim(), password, remember };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onSubmit(values);
  };

  return (
    <Card view="raised" className="login-card">
      <form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-4">
          <Text as="h1" variant="header-1" className="login-title">
            Вход
          </Text>

          <TextInput
            type="email"
            size="l"
            name="email"
            label="Email"
            placeholder="name@example.com"
            autoComplete="email"
            autoFocus
            value={email}
            onUpdate={(value) => {
              setEmail(value);
              if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
            }}
            validationState={errors.email ? 'invalid' : undefined}
            errorMessage={errors.email}
          />

          <PasswordInput
            size="l"
            name="password"
            label="Пароль"
            autoComplete="current-password"
            hideCopyButton
            value={password}
            onUpdate={(value) => {
              setPassword(value);
              if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
            }}
            validationState={errors.password ? 'invalid' : undefined}
            errorMessage={errors.password}
          />

          <Checkbox size="l" name="remember" checked={remember} onUpdate={setRemember}>
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="l" width="max">
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
