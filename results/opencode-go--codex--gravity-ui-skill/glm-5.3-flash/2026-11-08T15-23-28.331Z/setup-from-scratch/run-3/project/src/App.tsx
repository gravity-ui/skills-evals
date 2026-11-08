import {useState} from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@gravity-ui/uikit';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialFormData: FormData = {
  email: '',
  password: '',
  rememberMe: false,
};

export function App() {
  const [form, setForm] = useState<FormData>(initialFormData);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <main className="page">
      <Card type="container" view="raised" size="m" className="login-card">
        <Box margin="spacing-5" width="100%">
          <Flex direction="column" gap="spacing-5">
            <Flex direction="column" gap="spacing-2">
              <Text variant="subheader-2">Вход</Text>
              <Text variant="body-2" color="secondary">
                Введите свои данные, чтобы продолжить
              </Text>
            </Flex>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <Flex direction="column" gap="spacing-5">
                <TextInput
                  type="email"
                  name="email"
                  size="l"
                  placeholder="Email"
                  value={form.email}
                  onUpdate={(email) => setForm((previous) => ({...previous, email}))}
                  autoComplete="email"
                />

                <PasswordInput
                  name="password"
                  size="l"
                  placeholder="Пароль"
                  value={form.password}
                  onUpdate={(password) => setForm((previous) => ({...previous, password}))}
                  autoComplete="current-password"
                />

                <Checkbox
                  size="l"
                  checked={form.rememberMe}
                  onUpdate={(rememberMe) => setForm((previous) => ({...previous, rememberMe}))}
                >
                  Запомнить меня
                </Checkbox>

                <Button type="submit" view="action" size="l" width="max">
                  Войти
                </Button>
              </Flex>
            </form>
          </Flex>
        </Box>
      </Card>
    </main>
  );
}
