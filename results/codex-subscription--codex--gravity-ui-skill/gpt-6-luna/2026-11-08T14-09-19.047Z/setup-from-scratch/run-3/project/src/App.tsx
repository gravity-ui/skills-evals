import {Button, Checkbox, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  return (
    <main className="page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <Text id="login-title" variant="header-2" className="login-title">
          Вход в аккаунт
        </Text>
        <Text variant="body-2" color="secondary" className="login-description">
          Введите данные, чтобы продолжить работу
        </Text>

        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <label className="field">
            <Text variant="body-2" className="field-label">
              Email
            </Text>
            <TextInput
              type="email"
              name="email"
              size="l"
              placeholder="name@example.com"
              autoComplete="email"
              controlProps={{required: true}}
            />
          </label>

          <label className="field">
            <Text variant="body-2" className="field-label">
              Пароль
            </Text>
            <TextInput
              type="password"
              name="password"
              size="l"
              placeholder="Введите пароль"
              autoComplete="current-password"
              controlProps={{required: true}}
            />
          </label>

          <Checkbox name="remember" size="l">
            Запомнить меня
          </Checkbox>

          <Button type="submit" view="action" size="l" width="max">
            Войти
          </Button>
        </form>

        <div className="login-footer">
          <span className="status-dot" aria-hidden="true" />
          <Text variant="caption-1" color="secondary">
            Безопасное подключение
          </Text>
        </div>
      </section>
      <Text variant="caption-1" color="secondary" className="page-caption">
        © 2026 · Личный кабинет
      </Text>
    </main>
  );
}
