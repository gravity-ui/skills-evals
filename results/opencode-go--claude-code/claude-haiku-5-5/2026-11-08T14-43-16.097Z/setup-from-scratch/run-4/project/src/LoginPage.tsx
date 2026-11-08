import {useState} from 'react';
import type {FormEvent} from 'react';

import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginPageProps {
  onSubmit?: (values: LoginValues) => void;
}

export function LoginPage({onSubmit}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.({email, password, rememberMe});
  };

  return (
    <Card className="login-card" view="outlined" size="l">
      <form className="login-form" onSubmit={handleSubmit}>
        <Flex direction="column" gap="spacing-6">
          <Text as="h1" variant="header-2">
            Вход
          </Text>

          <Flex direction="column" gap="spacing-4">
            <Flex direction="column" gap="spacing-1">
              <Text as="label" htmlFor="login-email" variant="subheader-1">
                Email
              </Text>
              <TextInput
                id="login-email"
                type="email"
                size="l"
                placeholder="name@example.com"
                autoComplete="username"
                value={email}
                onUpdate={setEmail}
                controlProps={{required: true}}
              />
            </Flex>

            <Flex direction="column" gap="spacing-1">
              <Text as="label" htmlFor="login-password" variant="subheader-1">
                Пароль
              </Text>
              <PasswordInput
                id="login-password"
                size="l"
                autoComplete="current-password"
                value={password}
                onUpdate={setPassword}
                hideCopyButton
                controlProps={{required: true}}
              />
            </Flex>
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
