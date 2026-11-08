import { useState, type FormEvent } from 'react';
import { Button, Checkbox, PasswordInput, TextInput, ThemeProvider } from '@gravity-ui/uikit';

export function App() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Authentication is provided by the host application.
    event.preventDefault();
  };

  return (
    <ThemeProvider theme="light">
      <main className="login-page">
        <div className="login-shell">
          <section className="brand-panel" aria-label="О продукте">
            <div className="brand-panel__top">
              <div className="brand-lockup">
                <span className="brand-mark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span className="brand-name">orbit</span>
              </div>
              <span className="brand-edition">WORKSPACE</span>
            </div>

            <div className="brand-panel__content">
              <div className="orbit-art" aria-hidden="true">
                <div className="orbit-art__ring orbit-art__ring--one" />
                <div className="orbit-art__ring orbit-art__ring--two" />
                <div className="orbit-art__ring orbit-art__ring--three" />
                <div className="orbit-art__core" />
                <span className="orbit-art__spark orbit-art__spark--one" />
                <span className="orbit-art__spark orbit-art__spark--two" />
                <span className="orbit-art__spark orbit-art__spark--three" />
              </div>
              <p className="eyebrow">ОДНО ПРОСТРАНСТВО ДЛЯ ВАШИХ ИДЕЙ</p>
              <h1>Всё важное<br />начинается здесь.</h1>
              <p className="brand-description">Работайте над проектами, делитесь идеями и двигайтесь к цели вместе.</p>
            </div>

            <div className="brand-panel__bottom">
              <span className="status-dot" />
              <span>Ваше рабочее пространство</span>
              <span className="brand-panel__version">№ 01</span>
            </div>
          </section>

          <section className="form-panel" aria-labelledby="login-heading">
            <div className="mobile-brand">
              <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
              <span className="brand-name">orbit</span>
            </div>
            <div className="login-form-wrap">
              <div className="form-heading">
                <span className="form-kicker">С возвращением</span>
                <h2 id="login-heading">Войти в аккаунт</h2>
                <p>Введите данные, чтобы продолжить работу.</p>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="field-group">
                  <label className="field-label" htmlFor="email">Электронная почта</label>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    size="l"
                    placeholder="name@company.ru"
                    autoComplete="email"
                    controlProps={{ required: true }}
                  />
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="password">Пароль</label>
                  <PasswordInput
                    id="password"
                    name="password"
                    size="l"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    controlProps={{ required: true }}
                    hideCopyButton
                  />
                </div>

                <div className="form-options">
                  <Checkbox
                    size="l"
                    checked={rememberMe}
                    onUpdate={setRememberMe}
                  >
                    Запомнить меня
                  </Checkbox>
                  <a className="text-link" href="#forgot-password">Забыли пароль?</a>
                </div>

                <Button className="submit-button" type="submit" view="action" size="l" width="max">
                  Войти
                  <span className="button-arrow" aria-hidden="true">↗</span>
                </Button>
              </form>

              <div className="form-footer">
                <span>Нет аккаунта?</span>
                <a className="text-link" href="#create-account">Создать аккаунт</a>
              </div>
            </div>
            <div className="security-note">
              <span className="lock-icon" aria-hidden="true" />
              <span>Защищённое соединение</span>
              <span className="security-note__copyright">© Orbit 2026</span>
            </div>
          </section>
        </div>
      </main>
    </ThemeProvider>
  );
}
