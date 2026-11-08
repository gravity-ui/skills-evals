import * as React from 'react';

import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginFormErrors = Partial<Record<'email' | 'password', string>>;

type LoginPageProps = {
  onSubmit?: (values: LoginFormValues) => void;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({email, password}: Pick<LoginFormValues, 'email' | 'password'>): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!email) {
    errors.email = 'Введите email';
  } else if (!EMAIL_PATTERN.test(email)) {
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
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errors, setErrors] = React.useState<LoginFormErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const nextErrors = validate({email: trimmedEmail, password});
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSubmit?.({email: trimmedEmail, password, rememberMe});
    }
  };

  const handleEmailUpdate = (value: string) => {
    setEmail(value);
    setErrors(prev => ({...prev, email: undefined}));
  };

  const handlePasswordUpdate = (value: string) => {
    setPassword(value);
    setErrors(prev => ({...prev, password: undefined}));
  };

  return (
    <Card className="login-card" type="container" view="outlined" size="l">
      <form noValidate onSubmit={handleSubmit}>
        <Flex direction="column" gap="spacing-5" padding="spacing-6">
          <Text as="h1" variant="header-1">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-2">
            <Text as="label" htmlFor="login-email" variant="subheader-1">
              Email
            </Text>
            <TextInput
              id="login-email"
              name="email"
              type="email"
              size="l"
              autoComplete="username"
              placeholder="name@example.com"
              value={email}
              onUpdate={handleEmailUpdate}
              validationState={errors.email ? 'invalid' : undefined}
              errorMessage={errors.email}
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
              onUpdate={handlePasswordUpdate}
              validationState={errors.password ? 'invalid' : undefined}
              errorMessage={errors.password}
            />
          </Flex>

          <Checkbox size="l" checked={rememberMe} onUpdate={setRememberMe}>
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
