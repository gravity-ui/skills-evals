import {useRef, useState, type FormEvent} from 'react';
import {Button, Checkbox, Flex, PasswordInput, Provider, Text, TextInput} from '@gravity-ui/uikit';

function GravityMark({className = ''}: {className?: string}) {
  return (
    <span className={`gravity-mark ${className}`} aria-hidden="true">
      <span /><span /><span /><span />
    </span>
  );
}

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailError = !email.trim()
    ? 'Введите email'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? 'Проверьте адрес электронной почты'
      : '';
  const passwordError = !password ? 'Введите пароль' : '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setMessage('');
    if (emailError) {
      emailRef.current?.focus();
      return;
    }
    if (passwordError) {
      passwordRef.current?.focus();
      return;
    }
    setMessage('Данные заполнены. Для входа необходимо подключить сервер авторизации.');
  }

  return (
    <Provider theme={theme} lang="ru">
      <Flex direction="column" className="page">
        <Flex as="header" className="page-header">
          <Flex className="brand" aria-label="Gravity">
            <GravityMark />
            <Text variant="header-1" className="brand-name">gravity</Text>
            <Text variant="caption-2" className="brand-tag">workspace</Text>
          </Flex>
          <Button
            view="flat-secondary"
            size="m"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
          >
            <span className="theme-symbol" aria-hidden="true" />
            {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          </Button>
        </Flex>

        <main className="main">
          <section className="login-shell" aria-labelledby="login-title">
            <Flex direction="column" className="login-panel">
              <Text variant="caption-2" color="secondary" className="eyebrow">РАБОЧЕЕ ПРОСТРАНСТВО</Text>
              <Flex direction="column" className="form-heading">
                <Text as="h1" variant="display-1" id="login-title">С возвращением</Text>
                <Text as="p" variant="body-2" color="secondary">Войдите, чтобы продолжить работу.</Text>
              </Flex>

              <form onSubmit={handleSubmit} noValidate className="login-form">
                <Flex direction="column" className="field">
                  <Text as="label" htmlFor="email" variant="body-2">Email</Text>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    size="xl"
                    placeholder="you@example.com"
                    autoComplete="username"
                    value={email}
                    onUpdate={(value) => {setEmail(value); setMessage('');}}
                    controlRef={emailRef}
                    controlProps={{required: true, 'aria-required': true, spellCheck: false}}
                    validationState={submitted && emailError ? 'invalid' : undefined}
                    errorMessage={submitted ? emailError : undefined}
                  />
                </Flex>

                <Flex direction="column" className="field">
                  <Text as="label" htmlFor="password" variant="body-2">Пароль</Text>
                  <PasswordInput
                    id="password"
                    name="password"
                    size="xl"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    hideCopyButton
                    showRevealTooltip
                    value={password}
                    onUpdate={(value) => {setPassword(value); setMessage('');}}
                    controlRef={passwordRef}
                    controlProps={{required: true, 'aria-required': true}}
                    validationState={submitted && passwordError ? 'invalid' : undefined}
                    errorMessage={submitted ? passwordError : undefined}
                  />
                </Flex>

                <Checkbox checked={remember} onUpdate={setRemember} size="m" className="remember">
                  Запомнить меня
                </Checkbox>

                <Button type="submit" view="action" size="xl" width="max" className="submit-button">Войти</Button>
                {message && <Text as="p" variant="body-1" className="form-message" role="status">{message}</Text>}
              </form>

              <Flex className="secure-note">
                <span className="secure-dot" aria-hidden="true" />
                <Text variant="caption-2" color="secondary">Ваше пространство. Ваши возможности.</Text>
              </Flex>
            </Flex>

            <Flex direction="column" className="welcome-panel" aria-hidden="true">
              <Text variant="caption-2" className="welcome-label"><span className="little-star">✳</span> МЕНЬШЕ ЛИШНЕГО. БОЛЬШЕ ВАЖНОГО.</Text>
              <div className="orbital-art">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit orbit-three" />
                <span className="orbit-dot dot-one" />
                <span className="orbit-dot dot-two" />
                <span className="orbit-dot dot-three" />
                <div className="art-tile"><GravityMark className="art-mark" /></div>
                <span className="art-spark spark-one">+</span>
                <span className="art-spark spark-two">+</span>
              </div>
              <Flex direction="column" className="welcome-copy">
                <Text as="p" variant="display-1">Всё, что нужно.<br />В одном пространстве.</Text>
                <Text as="p" variant="body-2" color="secondary">Соберите идеи, задачи и команду вместе.<br />А мы позаботимся о деталях.</Text>
              </Flex>
              <Flex className="welcome-bottom">
                <span className="panel-dots"><i /><i /><i /></span>
                <Text variant="caption-1" color="secondary">Создано для вашей работы</Text>
              </Flex>
            </Flex>
          </section>
          <Text variant="caption-2" color="secondary" className="under-card">Немного порядка для больших идей.</Text>
        </main>

        <Flex as="footer" className="page-footer">
          <Text variant="caption-2" color="secondary">© {new Date().getFullYear()} Gravity</Text>
          <Text variant="caption-2" color="secondary">Сделано с Gravity UI <span className="footer-dot">●</span></Text>
        </Flex>
      </Flex>
    </Provider>
  );
}
