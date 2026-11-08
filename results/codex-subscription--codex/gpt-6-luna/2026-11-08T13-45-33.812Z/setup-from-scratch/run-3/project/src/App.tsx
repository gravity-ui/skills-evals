import {useState, type FormEvent} from 'react';
import {Button, Checkbox, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

function OrbitMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="15.25" />
      <ellipse cx="20" cy="20" rx="7.25" ry="15.25" transform="rotate(45 20 20)" />
      <circle className="brand-mark__core" cx="20" cy="20" r="3.25" />
    </svg>
  );
}

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Форма готова к подключению авторизации.');
  }

  return (
    <main className="page">
      <div className="page__glow page__glow--top" />
      <div className="page__glow page__glow--bottom" />

      <div className="auth-layout">
        <section className="auth-card" aria-labelledby="login-title">
          <header className="auth-card__header">
            <a className="brand" href="#" aria-label="На главную">
              <OrbitMark />
              <span className="brand__name">orbit<span>space</span></span>
            </a>
            <span className="secure-label"><span className="secure-label__dot" /> Защищённый вход</span>
          </header>

          <div className="auth-card__intro">
            <Text variant="overline-1" className="eyebrow">ЛИЧНЫЙ КАБИНЕТ</Text>
            <Text as="h1" variant="display-2" className="auth-title" id="login-title">С возвращением</Text>
            <Text variant="body-2" className="auth-subtitle">Войдите, чтобы продолжить работу</Text>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label" htmlFor="email">Электронная почта</label>
              <TextInput
                id="email"
                size="xl"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onUpdate={setEmail}
                hasClear
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="password">Пароль</label>
              <PasswordInput
                id="password"
                size="xl"
                autoComplete="current-password"
                placeholder="Введите пароль"
                value={password}
                onUpdate={setPassword}
                hideCopyButton
                required
              />
            </div>

            <div className="form-options">
              <Checkbox size="l" checked={remember} onUpdate={setRemember}>Запомнить меня</Checkbox>
              <a className="text-link" href="#forgot-password">Забыли пароль?</a>
            </div>

            <Button className="login-button" type="submit" view="action" size="xl" width="max">
              Войти
              <svg className="button-arrow" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4.25 10h11.5M10.5 4.75 15.75 10l-5.25 5.25" />
              </svg>
            </Button>
            {message && <p className="form-message" role="status">{message}</p>}
          </form>

          <footer className="auth-card__footer">
            <span>Нет аккаунта?</span>
            <a className="text-link" href="#sign-up">Создать аккаунт</a>
          </footer>
        </section>

        <aside className="side-note" aria-label="Информация о сервисе">
          <div className="side-note__line" />
          <p>Всё важное<br />собрано <span>в одном месте.</span></p>
          <div className="side-note__meta"><span>Пространство для ваших идей</span><span>01 — 03</span></div>
        </aside>
      </div>

      <div className="page-footer"><span>© 2026 orbitspace</span><a href="#privacy">Конфиденциальность</a></div>
    </main>
  );
}
