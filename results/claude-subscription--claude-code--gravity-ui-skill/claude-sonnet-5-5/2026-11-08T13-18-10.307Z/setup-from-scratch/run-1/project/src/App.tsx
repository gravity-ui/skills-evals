import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';
import {useState} from 'react';
import type {FormEvent} from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = !email
    ? 'Введите email'
    : !EMAIL_PATTERN.test(email)
      ? 'Некорректный email'
      : undefined;
  const passwordError = password ? undefined : 'Введите пароль';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (emailError || passwordError) {
      return;
    }

    // TODO: подключить реальный запрос авторизации
    console.info('Sign in', {email, rememberMe});
  };

  return (
    <main className="page">
      <Card className="login-card" type="container" view="outlined">
        <form noValidate onSubmit={handleSubmit}>
          <Flex direction="column" gap="spacing-5">
            <Text variant="header-1">Вход</Text>

            <Flex direction="column" gap="spacing-4">
              <TextInput
                size="xl"
                type="email"
                name="email"
                label="Email"
                placeholder="name@example.com"
                autoComplete="username"
                value={email}
                onUpdate={setEmail}
                validationState={submitted && emailError ? 'invalid' : undefined}
                errorMessage={submitted ? emailError : undefined}
              />
              <PasswordInput
                size="xl"
                name="password"
                label="Пароль"
                placeholder="Введите пароль"
                autoComplete="current-password"
                value={password}
                onUpdate={setPassword}
                hideCopyButton
                validationState={submitted && passwordError ? 'invalid' : undefined}
                errorMessage={submitted ? passwordError : undefined}
              />
              <Checkbox size="l" checked={rememberMe} onUpdate={setRememberMe}>
                Запомнить меня
              </Checkbox>
            </Flex>

            <Button type="submit" view="action" size="xl" width="max">
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
