import { useState, type FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, Text, TextInput } from '@gravity-ui/uikit';

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function App() {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleEmailUpdate = (email: string) => {
    setValues((current) => ({ ...current, email }));
    setErrors((current) => ({ ...current, email: undefined }));
  };

  const handlePasswordUpdate = (password: string) => {
    setValues((current) => ({ ...current, password }));
    setErrors((current) => ({ ...current, password: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};

    if (!EMAIL_PATTERN.test(values.email)) {
      nextErrors.email = 'Введите корректный email';
    }
    if (values.password.length < 8) {
      nextErrors.password = 'Пароль должен содержать минимум 8 символов';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log('Вход', values);
    }
  };

  return (
    <main className="page">
      <Card type="container" view="raised" className="login-card">
        <form onSubmit={handleSubmit} noValidate>
          <Flex direction="column" gap="spacing-5">
            <Flex direction="column" gap="spacing-2">
              <Text variant="header-1" as="h1">
                Вход
              </Text>
              <Text variant="body-2" color="secondary">
                Войдите, чтобы продолжить работу с сервисом.
              </Text>
            </Flex>

            <Flex direction="column" gap="spacing-2">
              <Text variant="subheader-1" as="label" htmlFor="email">
                Email
              </Text>
              <TextInput
                id="email"
                name="email"
                size="l"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onUpdate={handleEmailUpdate}
                validationState={errors.email ? 'invalid' : undefined}
                errorMessage={errors.email}
                errorPlacement="outside"
              />

              <Text variant="subheader-1" as="label" htmlFor="password">
                Пароль
              </Text>
              <TextInput
                id="password"
                name="password"
                size="l"
                type="password"
                autoComplete="current-password"
                placeholder="Введите пароль"
                value={values.password}
                onUpdate={handlePasswordUpdate}
                validationState={errors.password ? 'invalid' : undefined}
                errorMessage={errors.password}
                errorPlacement="outside"
              />
            </Flex>

            <Checkbox
              id="remember-me"
              name="rememberMe"
              size="l"
              checked={values.rememberMe}
              onUpdate={(checked) => setValues((current) => ({ ...current, rememberMe: checked }))}
            >
              Запомнить меня
            </Checkbox>

            <Button type="submit" view="action" size="l" width="max">
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
