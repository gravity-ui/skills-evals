import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput } from '@gravity-ui/uikit';

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginPageProps {
  /** Вызывается при отправке формы с валидными данными */
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailError = !email.trim()
    ? 'Введите email'
    : !EMAIL_RE.test(email.trim())
      ? 'Некорректный email'
      : undefined;
  const passwordError = !password ? 'Введите пароль' : undefined;
  const showEmailError = submitted && emailError;
  const showPasswordError = submitted && passwordError;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (emailError || passwordError) return;

    setLoading(true);
    try {
      await onSubmit?.({ email: email.trim(), password, rememberMe });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card type="container" view="raised" size="l" className="login-card">
      <form onSubmit={handleSubmit} noValidate aria-labelledby="login-title">
        <Flex direction="column" gap="spacing-4">
          <Text as="h1" variant="header-2" id="login-title">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-3">
            <Flex direction="column" gap="spacing-1">
              <Text as="label" variant="body-1" color="secondary" htmlFor="login-email">
                Email
              </Text>
              <TextInput
                id="login-email"
                name="email"
                type="email"
                size="l"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onUpdate={setEmail}
                validationState={showEmailError ? 'invalid' : undefined}
                errorMessage={showEmailError ? emailError : undefined}
                hasClear
              />
            </Flex>

            <Flex direction="column" gap="spacing-1">
              <Text as="label" variant="body-1" color="secondary" htmlFor="login-password">
                Пароль
              </Text>
              <PasswordInput
                id="login-password"
                name="password"
                size="l"
                autoComplete="current-password"
                placeholder="Введите пароль"
                value={password}
                onUpdate={setPassword}
                validationState={showPasswordError ? 'invalid' : undefined}
                errorMessage={showPasswordError ? passwordError : undefined}
                hideCopyButton
              />
            </Flex>
          </Flex>

          <Checkbox
            name="rememberMe"
            size="l"
            checked={rememberMe}
            onUpdate={setRememberMe}
            content="Запомнить меня"
          />

          <Button type="submit" view="action" size="l" width="max" loading={loading}>
            Войти
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
