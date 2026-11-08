import { useState, type FormEvent } from 'react';
import { Button, Checkbox, Provider, TextInput } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Provider theme="light" lang="ru">
      <main className="login-page">
        <div className="login-card">
          <div className="login-card__art" aria-hidden="true">
            <div className="art-orbit art-orbit--outer" />
            <div className="art-orbit art-orbit--inner" />
            <div className="art-core"><span /></div>
            <span className="art-spark art-spark--one" />
            <span className="art-spark art-spark--two" />
            <span className="art-spark art-spark--three" />
          </div>

          <section className="login-panel" aria-labelledby="login-title">
            <div className="brand-mark" aria-hidden="true"><span /></div>
            <div className="login-heading">
              <p className="eyebrow">РАДЫ ВАС ВИДЕТЬ</p>
              <h1 id="login-title">Войти в аккаунт</h1>
              <p className="login-description">Введите данные, чтобы продолжить</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="field-label" htmlFor="email">Электронная почта</label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  size="l"
                  placeholder="name@example.com"
                  autoComplete="email"
                  controlProps={{ required: true }}
                  value={email}
                  onUpdate={setEmail}
                />
              </div>

              <div className="form-field">
                <label className="field-label" htmlFor="password">Пароль</label>
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  size="l"
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  controlProps={{ required: true }}
                  value={password}
                  onUpdate={setPassword}
                />
              </div>

              <div className="form-options">
                <Checkbox
                  size="m"
                  checked={remember}
                  onUpdate={setRemember}
                >
                  Запомнить меня
                </Checkbox>
              </div>

              <Button className="login-submit" type="submit" view="action" size="l">
                Войти
                <span className="button-arrow" aria-hidden="true">↗</span>
              </Button>

              {submitted && (
                <p className="form-feedback" role="status">
                  Данные заполнены. Подключите обработчик авторизации для входа.
                </p>
              )}
            </form>
            <p className="login-footer">Защищённый вход&nbsp; · &nbsp;Ваши данные в безопасности</p>
          </section>
        </div>
        <p className="page-caption">ПРОСТОЙ И БЕЗОПАСНЫЙ ДОСТУП</p>
      </main>
    </Provider>
  );
}
