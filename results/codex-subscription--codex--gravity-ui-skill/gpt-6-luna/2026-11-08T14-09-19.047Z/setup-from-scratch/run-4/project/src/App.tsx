import {Button, Checkbox, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="login-heading">
          <Text className="login-eyebrow" variant="caption-2" color="secondary">
            ЛИЧНЫЙ КАБИНЕТ
          </Text>
          <Text as="h1" className="login-title" id="login-title" variant="header-2">
            С возвращением
          </Text>
          <Text className="login-description" variant="body-2" color="secondary">
            Войдите в свой аккаунт, чтобы продолжить
          </Text>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <TextInput
            autoComplete="email"
            className="login-input"
            label="Электронная почта"
            name="email"
            placeholder="name@example.com"
            size="l"
            type="email"
          />
          <TextInput
            autoComplete="current-password"
            className="login-input"
            label="Пароль"
            name="password"
            placeholder="Введите пароль"
            size="l"
            type="password"
          />

          <Checkbox className="remember-checkbox" content="Запомнить меня" size="m" />

          <Button className="submit-button" size="l" type="submit" view="action" width="max">
            Войти
          </Button>
        </form>
      </section>
    </main>
  );
}
