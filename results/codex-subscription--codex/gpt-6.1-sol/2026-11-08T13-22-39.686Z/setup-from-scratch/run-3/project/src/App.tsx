import {useRef, useState, type FormEvent} from 'react';
import {ArrowRight, ArrowUpRight, Envelope, Lock} from '@gravity-ui/icons';
import {Alert, Button, Checkbox, Icon, PasswordInput, TextInput} from '@gravity-ui/uikit';

function GravityMark({className = ''}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 4v32M4 20h32M8.7 8.7l22.6 22.6M8.7 31.3 31.3 8.7" stroke="currentColor" strokeWidth="7" />
    </svg>
  );
}

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
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
    setShowNotice(false);
    if (emailError) {
      emailRef.current?.focus();
      return;
    }
    if (passwordError) {
      passwordRef.current?.focus();
      return;
    }
    // Connect the authentication API here; never persist the password in the browser.
    setShowNotice(true);
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand" aria-label="Gravity">
          <span className="brand-mark"><GravityMark /></span>
          <span className="brand-name">gravity<span className="brand-dot">.</span></span>
        </div>
        <span className="header-caption">Пространство ваших возможностей</span>
      </header>

      <main className="main-content">
        <div className="login-card">
          <section className="form-panel" aria-labelledby="login-title">
            <div className="form-content">
              <div className="eyebrow"><span /> С ВОЗВРАЩЕНИЕМ</div>
              <h1 id="login-title">Вход в аккаунт</h1>
              <p className="form-description">Ваши идеи и проекты уже ждут вас.</p>

              <form noValidate onSubmit={handleSubmit} className="login-form">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    size="xl"
                    placeholder="you@example.com"
                    autoComplete="username"
                    controlRef={emailRef}
                    controlProps={{required: true, spellCheck: false, autoCapitalize: 'none'}}
                    value={email}
                    onUpdate={(value) => {setEmail(value); setShowNotice(false);}}
                    validationState={submitted && emailError ? 'invalid' : undefined}
                    errorMessage={submitted ? emailError : undefined}
                    startContent={<span className="input-icon"><Icon data={Envelope} size={18} /></span>}
                  />
                </div>

                <div className="field">
                  <label htmlFor="password">Пароль</label>
                  <PasswordInput
                    id="password"
                    name="password"
                    size="xl"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    hideCopyButton
                    showRevealTooltip
                    controlRef={passwordRef}
                    controlProps={{required: true}}
                    value={password}
                    onUpdate={(value) => {setPassword(value); setShowNotice(false);}}
                    validationState={submitted && passwordError ? 'invalid' : undefined}
                    errorMessage={submitted ? passwordError : undefined}
                    startContent={<span className="input-icon"><Icon data={Lock} size={18} /></span>}
                  />
                </div>

                <Checkbox name="remember" size="l" checked={remember} onUpdate={setRemember}>
                  Запомнить меня
                </Checkbox>

                <Button className="submit-button" type="submit" view="action" size="xl" width="max">
                  <span className="submit-label">Войти <Icon data={ArrowRight} size={18} /></span>
                </Button>
                {showNotice && (
                  <div className="login-notice" role="status">
                    <Alert theme="info" message="Данные проверены. Для входа необходимо подключить сервис авторизации." />
                  </div>
                )}
              </form>

              <div className="form-note"><Icon data={Lock} size={14} /><span>Ваше личное пространство. Ваши возможности.</span></div>
            </div>
          </section>

          <aside className="visual-panel" aria-label="Притяжение ваших идей">
            <div className="visual-topline"><span className="small-asterisk">✳</span> НАЧНИТЕ С ГЛАВНОГО</div>
            <div className="orbit-art" aria-hidden="true">
              <div className="orbit orbit-outer" />
              <div className="orbit orbit-middle" />
              <div className="orbit orbit-inner" />
              <span className="orbit-dot dot-one" />
              <span className="orbit-dot dot-two" />
              <span className="orbit-dot dot-three" />
              <span className="tiny-cross cross-one">+</span>
              <span className="tiny-cross cross-two">+</span>
              <div className="satellite satellite-purple"><span /></div>
              <div className="satellite satellite-white"><GravityMark /></div>
              <div className="gravity-sphere"><GravityMark /></div>
              <div className="sphere-shadow" />
            </div>
            <div className="visual-copy">
              <span className="visual-kicker">ИДЕИ. ЛЮДИ. ВОЗМОЖНОСТИ.</span>
              <h2>Всё, что важно.<br />На одной орбите.</h2>
              <p>Место, где ваши планы обретают форму,<br className="desktop-break" /> а каждый день начинается с нового.</p>
            </div>
            <div className="visual-bottom"><span className="visual-bottom-line" /><span>СОЗДАВАЙТЕ БОЛЬШЕ</span><ArrowUpRight width={17} height={17} /></div>
          </aside>
        </div>
        <p className="welcome-note">Хорошие идеи начинаются с простого шага.</p>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Gravity</span>
        <a href="https://gravity-ui.com/" target="_blank" rel="noreferrer">Сделано с Gravity UI <Icon data={ArrowUpRight} size={13} /></a>
      </footer>
    </div>
  );
}
