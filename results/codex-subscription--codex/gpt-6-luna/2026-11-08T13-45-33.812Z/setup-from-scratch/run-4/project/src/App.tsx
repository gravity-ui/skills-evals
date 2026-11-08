import { useState } from 'react';
import { Button, Checkbox, TextInput } from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="login-page">
      <section className="brand-panel" aria-label="Aster">
        <div className="brand-panel__glow" />
        <div className="brand-panel__grid" />
        <div className="brand-panel__content">
          <a className="brand" href="#" aria-label="Aster — главная">
            <span className="brand__mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span>aster</span>
          </a>
          <div className="brand-message">
            <span className="eyebrow"><i /> WORKSPACE, В КОТОРОМ ЕСТЬ МЕСТО ИДЕЯМ</span>
            <h1>Всё важное<br />собрано <em>в одном</em><br />месте.</h1>
            <p>Продолжайте с того места, где остановились. Ваши проекты уже ждут.</p>
          </div>
          <div className="brand-panel__bottom">
            <div className="orbit" aria-hidden="true">
              <span className="orbit__ring orbit__ring--one" />
              <span className="orbit__ring orbit__ring--two" />
              <span className="orbit__core" />
              <span className="orbit__dot orbit__dot--one" />
              <span className="orbit__dot orbit__dot--two" />
              <span className="orbit__dot orbit__dot--three" />
            </div>
            <span>Создавайте. Сотрудничайте. Двигайтесь дальше.</span>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="mobile-brand brand" aria-label="Aster">
          <span className="brand__mark" aria-hidden="true"><span /><span /><span /><span /></span>
          <span>aster</span>
        </div>
        <div className="login-card">
          <div className="login-card__intro">
            <span className="login-card__kicker">РАДЫ ВАС ВИДЕТЬ</span>
            <h2>С возвращением</h2>
            <p>Войдите в аккаунт, чтобы продолжить.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="field__label" htmlFor="email">Электронная почта</label>
              <TextInput
                id="email"
                name="email"
                type="email"
                size="xl"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onUpdate={setEmail}
                controlProps={{ required: true }}
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">Пароль</label>
              <TextInput
                id="password"
                name="password"
                type="password"
                size="xl"
                autoComplete="current-password"
                placeholder="Введите пароль"
                value={password}
                onUpdate={setPassword}
                controlProps={{ required: true }}
              />
            </div>

            <div className="form-options">
              <Checkbox size="m" checked={remember} onUpdate={setRemember}>
                Запомнить меня
              </Checkbox>
            </div>

            <Button className="submit-button" type="submit" view="action" size="xl" width="max">
              Войти
              <span className="submit-button__arrow" aria-hidden="true">↗</span>
            </Button>
          </form>

          <div className="login-card__footer">
            <span className="secure-indicator"><span aria-hidden="true">✳</span> Защищённое соединение</span>
            <span className="footer-dot" aria-hidden="true" />
            <span>© 2026 Aster</span>
          </div>
        </div>
        <div className="form-panel__footnote">Продолжая, вы соглашаетесь с <a href="#terms">условиями использования</a></div>
      </section>
    </main>
  );
}
