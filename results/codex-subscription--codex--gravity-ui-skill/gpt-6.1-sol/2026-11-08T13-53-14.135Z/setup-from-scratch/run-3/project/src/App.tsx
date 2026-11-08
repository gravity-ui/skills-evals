import {useRef, useState, type FormEvent} from 'react';
import {Alert, Button, Checkbox, Flex, PasswordInput, Provider, Text, TextInput} from '@gravity-ui/uikit';

function BrandMark({small = false}: {small?: boolean}) {
  return <span className={`brand-mark${small ? ' brand-mark_small' : ''}`} aria-hidden="true"><span /><span /><span /><span /></span>;
}

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailError = !email.trim() ? 'Введите email' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Введите корректный email' : '';
  const passwordError = !password ? 'Введите пароль' : '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setNotice(false);
    if (emailError) emailRef.current?.focus();
    else if (passwordError) passwordRef.current?.focus();
    else setNotice(true);
  }

  return (
    <Provider theme={theme} lang="ru">
      <div className="page">
        <header className="page-header">
          <Flex alignItems="center" gap="spacing-3" className="brand">
            <BrandMark />
            <Text variant="header-2" className="brand-name">gravity<span className="brand-period">.</span></Text>
          </Flex>
          <Button view="flat-secondary" size="m" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}>
            <span className="theme-symbol" aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
            {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          </Button>
        </header>

        <main className="main">
          <div className="login-card">
            <section className="welcome-panel" aria-label="Ваше рабочее пространство">
              <Flex alignItems="center" gap="spacing-2" className="eyebrow">
                <span className="status-dot" />
                <Text variant="caption-2">ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО</Text>
              </Flex>
              <Text as="h2" variant="display-3" className="welcome-title">Хороший день <br />начинается <br />здесь.</Text>
              <Text as="p" variant="body-2" className="welcome-copy">Всё, что важно для вашей работы.<br />В одном месте. В вашем ритме.</Text>

              <div className="orbit-art" aria-hidden="true">
                <div className="orbit orbit_one" />
                <div className="orbit orbit_two" />
                <div className="orbit orbit_three" />
                <div className="orbit-core"><BrandMark small /></div>
                <span className="satellite satellite_one" />
                <span className="satellite satellite_two" />
                <span className="art-plus art-plus_one">+</span>
                <span className="art-plus art-plus_two">+</span>
              </div>

              <Flex justifyContent="space-between" alignItems="center" className="panel-footer">
                <Text variant="caption-2">Меньше суеты. Больше возможностей.</Text>
                <span aria-hidden="true">↗</span>
              </Flex>
            </section>

            <section className="form-panel" aria-labelledby="login-title">
              <div className="form-content">
                <div className="form-intro">
                  <Text as="div" variant="caption-2" color="secondary" className="form-eyebrow">РАДЫ ВИДЕТЬ ВАС СНОВА</Text>
                  <Text as="h1" id="login-title" variant="display-2" className="login-title">С возвращением</Text>
                  <Text as="p" variant="body-2" color="secondary" className="login-subtitle">Войдите в свой аккаунт, чтобы продолжить.</Text>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <Flex direction="column" gap="spacing-5">
                    <Flex direction="column" gap="spacing-2">
                      <Text as="label" htmlFor="email" variant="body-2" className="field-label">Email</Text>
                      <TextInput id="email" name="email" type="email" size="xl" placeholder="you@example.com" autoComplete="username" value={email} onUpdate={(value) => {setEmail(value); setNotice(false);}} controlRef={emailRef} controlProps={{required: true, spellCheck: false, autoCapitalize: 'none', 'aria-invalid': submitted && !!emailError}} validationState={submitted && emailError ? 'invalid' : undefined} errorMessage={submitted ? emailError : undefined} />
                    </Flex>
                    <Flex direction="column" gap="spacing-2">
                      <Text as="label" htmlFor="password" variant="body-2" className="field-label">Пароль</Text>
                      <PasswordInput id="password" name="password" size="xl" placeholder="Введите пароль" autoComplete="current-password" hideCopyButton showRevealTooltip value={password} onUpdate={(value) => {setPassword(value); setNotice(false);}} controlRef={passwordRef} controlProps={{required: true, 'aria-invalid': submitted && !!passwordError}} validationState={submitted && passwordError ? 'invalid' : undefined} errorMessage={submitted ? passwordError : undefined} />
                    </Flex>
                  </Flex>
                  <div className="remember-row"><Checkbox name="remember" checked={remember} onUpdate={setRemember} size="m">Запомнить меня</Checkbox></div>
                  <Button type="submit" view="action" size="xl" width="max" className="login-button">Войти <span className="button-arrow" aria-hidden="true">→</span></Button>
                  {notice && <div className="form-notice" role="status"><Alert theme="info" title="Сервис входа пока не подключён" message="Форма заполнена. Авторизация станет доступна после подключения сервиса." /></div>}
                </form>

                <Flex alignItems="center" justifyContent="center" gap="spacing-2" className="form-footnote">
                  <span className="footnote-dot" aria-hidden="true" />
                  <Text variant="caption-2" color="secondary">Ваш следующий большой шаг — здесь.</Text>
                </Flex>
              </div>
            </section>
          </div>
        </main>

        <footer className="page-footer">
          <Text variant="caption-2" color="secondary">© 2026 Gravity</Text>
          <Flex alignItems="center" gap="spacing-2"><span className="footer-gravity" aria-hidden="true">✳</span><Text variant="caption-2" color="secondary">Создано с Gravity UI</Text></Flex>
        </footer>
      </div>
    </Provider>
  );
}
