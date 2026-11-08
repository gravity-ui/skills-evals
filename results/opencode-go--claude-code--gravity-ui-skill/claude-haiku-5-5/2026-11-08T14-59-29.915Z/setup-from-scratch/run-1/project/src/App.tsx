import {useState} from 'react';
import type {FormEvent} from 'react';
import {Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Отправка на сервер пока не подключена: здесь появится запрос входа.
  }

  return (
    <main className="page">
      <Card view="outlined" size="l" className="login-card">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="spacing-5">
            <Text as="h1" variant="header-2">
              Вход
            </Text>

            <Flex direction="column" gap="spacing-2">
              <Text as="label" htmlFor="login-email" variant="body-2" color="secondary">
                Email
              </Text>
              <TextInput
                id="login-email"
                type="email"
                size="l"
                placeholder="name@example.com"
                autoComplete="email"
                controlProps={{required: true}}
                value={email}
                onUpdate={setEmail}
              />
            </Flex>

            <Flex direction="column" gap="spacing-2">
              <Text as="label" htmlFor="login-password" variant="body-2" color="secondary">
                Пароль
              </Text>
              <PasswordInput
                id="login-password"
                size="l"
                autoComplete="current-password"
                controlProps={{required: true}}
                value={password}
                onUpdate={setPassword}
              />
            </Flex>

            <Checkbox size="l" checked={remember} onUpdate={setRemember}>
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
