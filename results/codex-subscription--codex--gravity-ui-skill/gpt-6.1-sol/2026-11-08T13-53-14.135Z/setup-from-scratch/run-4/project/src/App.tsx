import {useRef, useState, type FormEvent} from 'react';
import {ArrowRight, ArrowUpRight, Moon, Sun} from '@gravity-ui/icons';
import {Alert, Button, Checkbox, Flex, Icon, PasswordInput, Provider, Text, TextInput} from '@gravity-ui/uikit';

function readRememberedEmail() {
  try { return localStorage.getItem('gravity.remembered-email') || ''; }
  catch { return ''; }
}

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [email, setEmail] = useState(readRememberedEmail);
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(() => Boolean(readRememberedEmail()));
  const [submitted, setSubmitted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailError = !email.trim()
    ? 'Введите email'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? 'Укажите корректный email'
      : '';
  const passwordError = !password ? 'Введите пароль' : '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setShowNotice(false);
    if (emailError || passwordError) {
      (emailError ? emailRef : passwordRef).current?.focus();
      return;
    }
    try {
      if (remember) localStorage.setItem('gravity.remembered-email', email.trim());
      else localStorage.removeItem('gravity.remembered-email');
    } catch { /* The form remains usable when browser storage is unavailable. */ }
    setShowNotice(true);
  }

  return (
    <Provider theme={theme} lang="ru">
      <div className="page">
        <header className="page-header">
          <Flex alignItems="center" gap="spacing-3" className="brand">
            <span className="brand-symbol" aria-hidden="true"><span /></span>
            <Text variant="header-1" className="brand-name">gravity.</Text>
          </Flex>
          <Flex alignItems="center" gap="spacing-5">
            <Text variant="body-1" color="secondary" className="header-caption">Ваше рабочее пространство</Text>
            <Button view="outlined" size="l" className="theme-button"
              aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
              title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              <Icon data={theme === 'light' ? Moon : Sun} size={18} />
            </Button>
          </Flex>
        </header>

        <main className="main-content">
          <div className="login-shell">
            <section className="welcome-panel" aria-label="Добро пожаловать в Gravity">
              <Flex alignItems="center" gap="spacing-2" className="welcome-eyebrow">
                <span className="status-dot" />
                <Text variant="caption-2">МЕСТО ДЛЯ ВАШИХ ИДЕЙ</Text>
              </Flex>
              <Text as="h2" variant="display-2" className="welcome-title">Всё важное.<br />В одном месте<span className="title-dot">.</span></Text>
              <Text as="p" variant="body-2" color="complementary" className="welcome-description">
                Ваши проекты, команда и новые возможности.<br className="desktop-break" /> Войдите, чтобы продолжить.
              </Text>
              <div className="orbit-art" aria-hidden="true">
                <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
                <div className="orbit-axis" /><div className="planet" />
                <span className="satellite satellite-one" /><span className="satellite satellite-two" />
                <span className="art-spark spark-one">✳</span><span className="art-spark spark-two">+</span><span className="art-dot" />
              </div>
              <Flex alignItems="center" gap="spacing-3" className="welcome-footer">
                <span className="mini-mark" aria-hidden="true">✳</span>
                <Text variant="body-1">Меньше рутины. Больше возможностей.</Text>
              </Flex>
            </section>

            <section className="form-panel" aria-labelledby="login-title">
              <div className="form-content">
                <Text as="div" variant="caption-2" color="secondary" className="form-eyebrow">РАДЫ ВАС ВИДЕТЬ</Text>
                <Text as="h1" variant="display-1" id="login-title" className="login-title">С возвращением</Text>
                <Text as="p" variant="body-2" color="secondary" className="login-description">Войдите в свой аккаунт, чтобы продолжить.</Text>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="field">
                    <Text as="label" htmlFor="email" variant="body-2" className="field-label">Email</Text>
                    <TextInput id="email" name="email" type="email" size="xl" placeholder="you@example.com"
                      autoComplete="username" value={email} controlRef={emailRef}
                      controlProps={{required: true, spellCheck: false, 'aria-required': true}}
                      onUpdate={(value) => {setEmail(value); setShowNotice(false);}}
                      validationState={submitted && emailError ? 'invalid' : undefined}
                      errorMessage={submitted ? emailError : undefined} />
                  </div>
                  <div className="field password-field">
                    <Text as="label" htmlFor="password" variant="body-2" className="field-label">Пароль</Text>
                    <PasswordInput id="password" name="password" size="xl" placeholder="Введите пароль"
                      autoComplete="current-password" hideCopyButton value={password} controlRef={passwordRef}
                      controlProps={{required: true, 'aria-required': true}}
                      onUpdate={(value) => {setPassword(value); setShowNotice(false);}}
                      validationState={submitted && passwordError ? 'invalid' : undefined}
                      errorMessage={submitted ? passwordError : undefined} />
                  </div>
                  <Checkbox checked={remember} size="l" className="remember-checkbox" onUpdate={(checked) => {
                    setRemember(checked);
                    if (!checked) {
                      try {localStorage.removeItem('gravity.remembered-email');} catch { /* Storage is optional. */ }
                    }
                  }}>Запомнить меня</Checkbox>
                  <Button type="submit" view="action" size="xl" width="max" className="login-button">
                    <span>Войти</span><Icon data={ArrowRight} size={18} />
                  </Button>
                  {showNotice && <div className="form-notice" role="status">
                    <Alert theme="info" title="Вход пока недоступен" message="Авторизация ещё не подключена. Ваши данные не отправлены." />
                  </div>}
                </form>
                <div className="form-bottom">
                  <span className="form-bottom-line" />
                  <Text variant="body-1" color="secondary">Один аккаунт — все ваши проекты</Text>
                </div>
              </div>
            </section>
          </div>
          <Text as="p" variant="caption-2" color="secondary" className="under-card">Хорошая работа начинается здесь.</Text>
        </main>

        <footer className="page-footer">
          <Text variant="body-1" color="secondary">© {new Date().getFullYear()} Gravity</Text>
          <a className="gravity-link" href="https://gravity-ui.com" target="_blank" rel="noreferrer">
            <Text variant="body-1">Сделано с Gravity UI</Text><Icon data={ArrowUpRight} size={14} />
          </a>
        </footer>
      </div>
    </Provider>
  );
}
