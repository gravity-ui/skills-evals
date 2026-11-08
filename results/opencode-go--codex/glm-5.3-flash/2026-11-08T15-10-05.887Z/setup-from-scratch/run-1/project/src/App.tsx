import { useState } from 'react';
import { Button, Checkbox, Flex, PasswordInput, TextInput, Text } from '@gravity-ui/uikit';

type FormState = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type FormErrors = {
  email?: string;
  password?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function App() {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <Field extends keyof FormState>(field: Field, value: FormState[Field]) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }));
    setErrors((previousErrors) => ({ ...previousErrors, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!formState.email.trim()) {
      nextErrors.email = 'Введите email';
    } else if (!EMAIL_PATTERN.test(formState.email.trim())) {
      nextErrors.email = 'Введите корректный email';
    }

    if (!formState.password) {
      nextErrors.password = 'Введите пароль';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
  };

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="spacing-4" width="100%">
          <Text variant="header-2" as="h1">
            Вход
          </Text>

          <TextInput
            label="Email"
            type="email"
            name="email"
            value={formState.email}
            onUpdate={(value) => updateField('email', value)}
            validationState={errors.email ? 'invalid' : undefined}
            errorMessage={errors.email}
            autoComplete="email"

          />

          <PasswordInput
            label="Пароль"
            name="password"
            value={formState.password}
            onUpdate={(value) => updateField('password', value)}
            validationState={errors.password ? 'invalid' : undefined}
            errorMessage={errors.password}
            autoComplete="current-password"

          />

          <Checkbox
            checked={formState.rememberMe}
            onUpdate={(checked) => updateField('rememberMe', checked)}
            size="l"
          >
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="l" width="max" loading={isSubmitting}>
            Войти
          </Button>
        </Flex>
      </form>
    </main>
  );
}
