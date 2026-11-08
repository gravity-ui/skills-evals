import { Button, Checkbox, TextInput } from '@gravity-ui/uikit';

export function App() {
  return (
    <main className="page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-mark" aria-hidden="true">G</div>
        <p className="eyebrow">РАБОЧЕЕ ПРОСТРАНСТВО</p>
        <h1 id="login-title" className="login-title">С возвращением</h1>
        <p className="login-description">Войдите в аккаунт, чтобы продолжить</p>

        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <div className="form-field">
            <label className="field-label" htmlFor="email">Email</label>
            <TextInput
              id="email"
              name="email"
              type="email"
              size="l"
              autoComplete="email"
              placeholder="name@example.com"
              controlProps={{ required: true }}
            />
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="password">Пароль</label>
            <TextInput
              id="password"
              name="password"
              type="password"
              size="l"
              autoComplete="current-password"
              placeholder="Введите пароль"
              controlProps={{ required: true }}
            />
          </div>

          <Checkbox name="remember" size="l">Запомнить меня</Checkbox>
          <Button type="submit" view="action" size="l" width="max">
            Войти
          </Button>
        </form>

        <p className="login-footnote">Безопасный вход в ваше рабочее пространство</p>
      </section>
    </main>
  );
}
