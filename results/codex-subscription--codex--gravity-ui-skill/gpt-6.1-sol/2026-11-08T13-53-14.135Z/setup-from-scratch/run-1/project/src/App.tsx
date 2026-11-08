import {useRef, useState, type FormEvent} from 'react';
import {Alert, Button, Checkbox, Text, TextInput} from '@gravity-ui/uikit';

function BrandMark() {
  return (
    <svg width="30" height="32" viewBox="0 0 30 32" fill="none" aria-hidden="true">
      <path d="M15 1 29 26H1L15 1Z" fill="currentColor" />
      <circle cx="23" cy="24" r="7" className="brand-mark-accent" />
    </svg>
  );
}

function OrbitArtwork() {
  return (
    <svg className="orbit-artwork" viewBox="0 0 520 440" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="planet" cx="0.32" cy="0.24" r="0.8">
          <stop className="planet-light" />
          <stop offset="0.6" className="planet-mid" />
          <stop offset="1" className="planet-dark" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="220" r="189" className="orbit-guide" />
      <circle cx="260" cy="220" r="143" className="orbit-guide orbit-guide-dashed" />
      <path d="M49 220h422M260 9v422" className="orbit-guide orbit-guide-axis" />
      <ellipse cx="260" cy="220" rx="218" ry="83" transform="rotate(-36 260 220)" className="orbit-back" />
      <circle cx="260" cy="220" r="113" fill="url(#planet)" />
      <path d="M83.6 348.2c27 37.1 127.8 9.7 225.1-61s154.5-158.2 127.7-195.3" className="orbit-front" />
      <circle cx="383" cy="77" r="8" className="orbit-dot" />
      <circle cx="91" cy="305" r="5" className="orbit-small-dot" />
      <path d="M417 312v18m-9-9h18" className="orbit-spark" />
      <path d="M109 105v12m-6-6h12" className="orbit-spark" />
    </svg>
  );
}

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailError = !email.trim()
    ? 'Введите email'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? 'Введите корректный email'
      : '';
  const passwordError = password ? '' : 'Введите пароль';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setNotice(false);
    if (emailError) {
      emailRef.current?.focus();
    } else if (passwordError) {
      passwordRef.current?.focus();
    } else {
      setNotice(true);
    }
  }

  return (
    <main className="login-page">
      <section className="login-side" aria-labelledby="login-title">
        <header className="brand">
          <BrandMark />
          <span className="brand-name">gravity<span className="brand-period">.</span></span>
        </header>

        <div className="form-area">
          <div className="login-content">
            <Text as="p" variant="caption-2" className="eyebrow">С ВОЗВРАЩЕНИЕМ</Text>
            <Text as="h1" variant="display-2" id="login-title" className="login-title">Войдите в аккаунт</Text>
            <Text as="p" variant="body-2" color="secondary" className="login-description">
              Ваше рабочее пространство уже ждёт вас.
            </Text>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <Text as="label" htmlFor="email" variant="body-2" className="field-label">Email</Text>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  size="xl"
                  placeholder="you@company.com"
                  autoComplete="username"
                  value={email}
                  onUpdate={(value) => {setEmail(value); setNotice(false);}}
                  controlRef={emailRef}
                  controlProps={{required: true, spellCheck: false, autoCapitalize: 'none'}}
                  validationState={submitted && emailError ? 'invalid' : undefined}
                  errorMessage={submitted ? emailError : undefined}
                />
              </div>
              <div className="field">
                <Text as="label" htmlFor="password" variant="body-2" className="field-label">Пароль</Text>
                <TextInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  size="xl"
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  value={password}
                  onUpdate={(value) => {setPassword(value); setNotice(false);}}
                  controlRef={passwordRef}
                  controlProps={{required: true}}
                  validationState={submitted && passwordError ? 'invalid' : undefined}
                  errorMessage={submitted ? passwordError : undefined}
                  endContent={
                    <Button
                      view="flat-secondary"
                      size="m"
                      type="button"
                      className="password-toggle"
                      aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                      aria-pressed={showPassword}
                      title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                        {showPassword && <path d="m4 3 16 18" stroke="currentColor" strokeWidth="1.6" />}
                      </svg>
                    </Button>
                  }
                />
              </div>
              <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember} className="remember-checkbox">
                Запомнить меня
              </Checkbox>
              <Button type="submit" view="action" size="xl" width="max" className="submit-button">
                Войти <span className="submit-arrow" aria-hidden="true">↗</span>
              </Button>
              {notice && (
                <div role="status">
                  <Alert theme="info" message="Сервис авторизации пока не подключён. Вход станет доступен после его настройки." />
                </div>
              )}
            </form>
            <div className="form-note">
              <span className="note-line" />
              <Text variant="caption-2" color="secondary" className="form-note-text">Место, где начинается ваша работа</Text>
              <span className="note-line" />
            </div>
          </div>
        </div>

        <footer className="login-footer">
          <Text variant="caption-2" color="secondary">© {new Date().getFullYear()} Gravity</Text>
          <span className="powered-by"><span className="status-dot" />На базе Gravity UI</span>
        </footer>
      </section>

      <section className="welcome-side" aria-label="Ваше рабочее пространство">
        <div className="welcome-topline">
          <span className="welcome-badge"><span className="status-dot" />Всё важное — в одном месте</span>
          <span className="decorative-arrow" aria-hidden="true">↗</span>
        </div>
        <div className="welcome-body">
          <div className="artwork-container"><OrbitArtwork /></div>
          <div className="welcome-copy">
            <Text as="h2" variant="display-4" className="welcome-title">Ваши идеи.<br />Новая орбита.</Text>
            <Text as="p" variant="body-3" className="welcome-description">Меньше рутины. Больше возможностей.<br />Войдите и сосредоточьтесь на главном.</Text>
          </div>
        </div>
        <div className="welcome-footer">
          <Text variant="caption-2" className="welcome-footer-label">ПРОСТРАНСТВО ДЛЯ ВАШИХ ВОЗМОЖНОСТЕЙ</Text>
          <span className="slide-markers" aria-hidden="true"><i /><i /><i /></span>
        </div>
      </section>
    </main>
  );
}
