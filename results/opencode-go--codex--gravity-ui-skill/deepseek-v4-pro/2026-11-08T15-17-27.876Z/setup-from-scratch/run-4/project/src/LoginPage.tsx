import {
  Box,
  Button,
  Card,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
} from '@gravity-ui/uikit';
import { useState } from 'react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div className="login-page">
      <Card view="raised" size="l">
        <Box padding="spacing-8">
          <Text variant="header-1">Вход</Text>

          <Box marginBlockStart="spacing-6">
            <TextInput
              label="Email"
              type="email"
              size="l"
              value={email}
              onUpdate={(v) => setEmail(v)}
              placeholder="you@example.com"
            />
          </Box>

          <Box marginBlockStart="spacing-4">
            <PasswordInput
              label="Пароль"
              size="l"
              value={password}
              onUpdate={(v) => setPassword(v)}
              placeholder="Введите пароль"
            />
          </Box>

          <Box marginBlockStart="spacing-4">
            <Checkbox
              size="l"
              checked={remember}
              onUpdate={(checked) => setRemember(checked)}
            >
              Запомнить меня
            </Checkbox>
          </Box>

          <Box marginBlockStart="spacing-6">
            <Button view="action" size="l" width="max">
              Войти
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  );
}
