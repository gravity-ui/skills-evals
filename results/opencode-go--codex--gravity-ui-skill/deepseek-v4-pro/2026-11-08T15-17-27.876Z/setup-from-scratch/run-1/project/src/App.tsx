import {useState} from 'react';
import {
  Flex,
  Card,
  TextInput,
  Checkbox,
  Button,
  Text,
} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Flex
      as="main"
      justifyContent="center"
      alignItems="center"
      style={{minHeight: '100vh'}}
    >
      <Card
        type="container"
        view="raised"
        size="l"
        style={{width: 400, maxWidth: '100%'}}
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="spacing-5">
            <Text variant="header-1">Вход</Text>

            <TextInput
              size="l"
              type="email"
              placeholder="Email"
              value={email}
              onUpdate={setEmail}
            />

            <TextInput
              size="l"
              type="password"
              placeholder="Пароль"
              value={password}
              onUpdate={setPassword}
            />

            <Checkbox
              size="l"
              checked={remember}
              onUpdate={setRemember}
            >
              Запомнить меня
            </Checkbox>

            <Button
              type="submit"
              view="action"
              size="l"
              width="max"
            >
              Войти
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
}
