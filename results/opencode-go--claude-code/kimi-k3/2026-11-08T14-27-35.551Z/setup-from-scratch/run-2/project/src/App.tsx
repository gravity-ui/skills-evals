import {useState} from 'react';
import {Button, Card, Checkbox, Text, TextInput} from '@gravity-ui/uikit';
import {Envelope, Lock} from '@gravity-ui/icons';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Вход:', {email, password, rememberMe});
  };

  return (
    <main className="page">
      <Card className="login-card" view="raised" size="l">
        <form className="login-form" onSubmit={handleSubmit}>
          <Text variant="header-2">Вход в аккаунт</Text>

          <TextInput
            size="l"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onUpdate={setEmail}
            startContent={<Envelope width={16} height={16} />}
            autoComplete="email"
            controlProps={{required: true}}
          />

          <TextInput
            size="l"
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onUpdate={setPassword}
            startContent={<Lock width={16} height={16} />}
            autoComplete="current-password"
            controlProps={{required: true}}
          />

          <Checkbox
            size="l"
            checked={rememberMe}
            onUpdate={setRememberMe}
            content="Запомнить меня"
          />

          <Button view="action" size="l" type="submit" width="max">
            Войти
          </Button>
        </form>
      </Card>
    </main>
  );
}
