import {Button, Checkbox, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

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
        <Text variant="caption-2" color="secondary" className="eyebrow">
          ЛИЧНЫЙ КАБИНЕТ
        </Text>
        <Text as="h1" variant="header-1" className="login-title" id="login-title">
          С возвращением
        </Text>
        <Text variant="body-2" color="secondary" className="login-description">
          Войдите в аккаунт, чтобы продолжить
        </Text>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field" htmlFor="email">
            <Text variant="body-2" className="field-label">Email</Text>
            <TextInput
              id="email"
              name="email"
              type="email"
              size="l"
              placeholder="name@example.com"
              autoComplete="email"
              className="login-control"
              controlProps={{required: true}}
            />
          </label>

          <label className="field" htmlFor="password">
            <Text variant="body-2" className="field-label">Пароль</Text>
            <PasswordInput
              id="password"
              name="password"
              size="l"
              placeholder="Введите пароль"
              autoComplete="current-password"
              className="login-control"
              controlProps={{required: true}}
            />
          </label>

          <div className="login-options">
            <Checkbox name="remember" size="m">Запомнить меня</Checkbox>
          </div>

          <Button type="submit" view="action" size="l" width="max" className="login-submit">
            Войти
          </Button>
        </form>
        <Text variant="caption-2" color="secondary" className="login-footer">
          Защищённый вход в ваш аккаунт
        </Text>
      </section>
    </main>
  );
}
