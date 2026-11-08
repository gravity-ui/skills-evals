import {useRef, useState, type FormEvent} from 'react';
import {Alert, Button, Checkbox, Provider, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailError = !email.trim()
    ? 'Введите email'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? 'Введите email в формате name@example.com'
      : '';
  const passwordError = password.length === 0 ? 'Введите пароль' : '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setShowNotice(false);
    if (emailError) {
      emailRef.current?.focus();
      return;
    }
    if (passwordError) {
      passwordRef.current?.focus();
      return;
    }
    // Connect the authentication API here, passing email, password and remember.
    // Credentials are never persisted or logged by this presentation layer.
    setShowNotice(true);
  }

  return (
    <Provider theme={theme} lang="ru">
      <div className="login-page">
        <header className="page-header">
          <div className="brand" aria-label="Gravity">
            <span className="brand-symbol" aria-hidden="true"><span /></span>
            <Text variant="header-1">gravity</Text>
          </div>
          <Button view="flat-secondary" size="m"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}>
            {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          </Button>
        </header>
        <main className="login-main">
          <div className="login-content">
            <div className="welcome-label">
              <span className="welcome-dot" aria-hidden="true" />
              <Text variant="caption-2" color="secondary">ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО</Text>
            </div>
            <section className="login-card" aria-labelledby="login-title">
              <div className="card-heading">
                <div className="welcome-mark" aria-hidden="true">g<span>•</span></div>
                <Text as="h1" variant="header-2" id="login-title">С возвращением</Text>
                <Text as="p" variant="body-2" color="secondary">Войдите, чтобы продолжить работу</Text>
              </div>
              <form onSubmit={handleSubmit} noValidate className="login-form">
                <div className="form-field">
                  <Text as="label" htmlFor="email" variant="body-2">Email</Text>
                  <TextInput id="email" name="email" type="email" size="xl"
                    placeholder="name@example.com" autoComplete="username"
                    value={email} controlRef={emailRef}
                    controlProps={{required: true, spellCheck: false, autoCapitalize: 'none', 'aria-invalid': submitted && !!emailError}}
                    onUpdate={(value) => {setEmail(value); setShowNotice(false);}}
                    validationState={submitted && emailError ? 'invalid' : undefined}
                    errorMessage={submitted ? emailError : undefined} />
                </div>
                <div className="form-field">
                  <Text as="label" htmlFor="password" variant="body-2">Пароль</Text>
                  <TextInput id="password" name="password" type={showPassword ? 'text' : 'password'} size="xl"
                    placeholder="Введите пароль" autoComplete="current-password"
                    value={password} controlRef={passwordRef}
                    controlProps={{required: true, 'aria-invalid': submitted && !!passwordError}}
                    onUpdate={(value) => {setPassword(value); setShowNotice(false);}}
                    validationState={submitted && passwordError ? 'invalid' : undefined}
                    errorMessage={submitted ? passwordError : undefined}
                    endContent={
                      <Button type="button" size="s" view="flat-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        aria-pressed={showPassword} className="password-toggle">
                        {showPassword ? 'Скрыть' : 'Показать'}
                      </Button>
                    } />
                </div>
                <Checkbox name="remember" checked={remember} onUpdate={setRemember} size="l">Запомнить меня</Checkbox>
                <Button type="submit" view="action" size="xl" width="max" className="submit-button">Войти</Button>
                {showNotice && (
                  <div role="status">
                    <Alert theme="info" title="Вход пока недоступен" message="Сервис авторизации ещё не подключён. Попробуйте позже." />
                  </div>
                )}
              </form>
              <div className="card-footer">
                <span className="footer-dot" aria-hidden="true" />
                <Text variant="caption-2" color="secondary">Всё необходимое — в одном пространстве</Text>
              </div>
            </section>
            <Text as="p" variant="body-1" color="secondary" className="welcome-note">Меньше рутины. Больше возможностей.</Text>
          </div>
        </main>
        <footer className="page-footer">
          <Text variant="caption-2" color="secondary">© {new Date().getFullYear()} Gravity</Text>
          <Text variant="caption-2" color="secondary">Создано с Gravity UI</Text>
        </footer>
      </div>
    </Provider>
  );
}
