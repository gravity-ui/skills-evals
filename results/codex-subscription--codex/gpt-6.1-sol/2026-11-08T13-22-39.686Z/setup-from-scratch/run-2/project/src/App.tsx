import {useRef, useState, type FormEvent} from 'react';
import {Alert, Button, Checkbox, Icon, PasswordInput, TextInput} from '@gravity-ui/uikit';
import {ArrowRight, ArrowUpRight, Envelope, Lock} from '@gravity-ui/icons';

function GravityMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect width="34" height="34" rx="11" fill="#FFCC00" />
      <path d="M23 12.5a8 8 0 1 0 .2 9.1M23.5 17h-7" stroke="#202124" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="25" cy="9" r="3" fill="#202124" />
    </svg>
  );
}

function OrbitIllustration() {
  return (
    <svg className="orbit-illustration" viewBox="0 0 500 380" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="planet" cx=".32" cy=".25" r=".8">
          <stop stopColor="#FFF5A3" /><stop offset=".48" stopColor="#FFDA32" /><stop offset="1" stopColor="#EDB500" />
        </radialGradient>
        <radialGradient id="moon" cx=".3" cy=".22" r=".85">
          <stop stopColor="#626465" /><stop offset="1" stopColor="#202224" />
        </radialGradient>
        <linearGradient id="orbit" x1="80" y1="80" x2="440" y2="310" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A99B5A" stopOpacity=".2" /><stop offset=".5" stopColor="#A99B5A" stopOpacity=".7" /><stop offset="1" stopColor="#A99B5A" stopOpacity=".2" />
        </linearGradient>
      </defs>
      <g stroke="url(#orbit)">
        <ellipse cx="250" cy="191" rx="213" ry="79" transform="rotate(-30 250 191)" />
        <ellipse cx="250" cy="191" rx="180" ry="110" transform="rotate(39 250 191)" />
        <ellipse cx="250" cy="191" rx="108" ry="166" transform="rotate(25 250 191)" />
      </g>
      <circle cx="250" cy="191" r="91" fill="url(#planet)" />
      <path d="M66 228c13 40 112 24 222-40s189-133 169-154" transform="translate(0 36)" stroke="#9A8A44" strokeOpacity=".65" />
      <circle cx="107" cy="261" r="24" fill="url(#moon)" />
      <circle cx="393" cy="105" r="13" fill="#FFCE23" />
      <circle cx="338" cy="320" r="5" fill="#B5A76D" />
      <circle cx="152" cy="74" r="3" fill="#B5A76D" />
      <path d="M376 232v14m-7-7h14M84 124v10m-5-5h10M292 44v10m-5-5h10" stroke="#8B815A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailError = !email.trim() ? 'Введите email'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Проверьте адрес email' : '';
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
    <div className="page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Gravity — главная">
          <GravityMark /><span>gravity<span className="brand-dot">.</span></span>
        </a>
        <span className="header-caption">Ваше рабочее пространство</span>
      </header>

      <main className="main-content">
        <div className="login-card">
          <section className="login-panel" aria-labelledby="login-title">
            <div className="login-content">
              <div className="welcome-icon"><Icon data={ArrowRight} size={23} /></div>
              <h1 id="login-title">С возвращением!</h1>
              <p className="intro">Войдите, чтобы продолжить работу.</p>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <TextInput
                    id="email" name="email" type="email" size="xl" placeholder="you@example.com"
                    autoComplete="username" controlRef={emailRef} value={email}
                    onUpdate={(value) => {setEmail(value); setNotice(false);}}
                    startContent={<Icon data={Envelope} size={18} />}
                    validationState={submitted && emailError ? 'invalid' : undefined}
                    errorMessage={submitted ? emailError : undefined}
                    controlProps={{required: true, spellCheck: false, 'aria-required': true}}
                  />
                </div>
                <div className="form-field password-field">
                  <label htmlFor="password">Пароль</label>
                  <PasswordInput
                    id="password" name="password" size="xl" placeholder="Введите пароль"
                    autoComplete="current-password" controlRef={passwordRef} hideCopyButton showRevealTooltip
                    value={password} onUpdate={(value) => {setPassword(value); setNotice(false);}}
                    startContent={<Icon data={Lock} size={18} />}
                    validationState={submitted && passwordError ? 'invalid' : undefined}
                    errorMessage={submitted ? passwordError : undefined}
                    controlProps={{required: true, 'aria-required': true}}
                  />
                </div>
                <Checkbox className="remember-checkbox" size="m" name="remember" checked={remember} onUpdate={setRemember}>
                  Запомнить меня
                </Checkbox>
                <Button className="login-button" view="action" size="xl" type="submit" width="max">
                  <span className="login-button-content">Войти<Icon data={ArrowRight} size={18} /></span>
                </Button>
                {notice && <div className="form-notice" role="status">
                  <Alert theme="info" title="Вход пока недоступен" message="Сервис авторизации ещё не подключён." />
                </div>}
              </form>
              <div className="secure-note"><Icon data={Lock} size={13} /><span>Ваше пространство. Только для вас.</span></div>
            </div>
          </section>

          <aside className="story-panel" aria-label="Добро пожаловать в Gravity">
            <div className="story-eyebrow"><span className="eyebrow-dot" />МЕНЬШЕ РУТИНЫ. БОЛЬШЕ ВОЗМОЖНОСТЕЙ.</div>
            <OrbitIllustration />
            <div className="story-content">
              <span className="story-kicker">Всё начинается с притяжения</span>
              <h2>Идеи обретают силу,<br />когда мы вместе.</h2>
              <p>Люди, инструменты и вдохновение —<br />в одном рабочем пространстве.</p>
            </div>
            <div className="story-bottom"><span className="story-line" /><span>Пространство для большего</span><span className="small-star">✳</span></div>
          </aside>
        </div>
        <p className="under-card">Хорошая работа начинается с простого входа.</p>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Gravity</span>
        <a href="https://gravity-ui.com/" target="_blank" rel="noreferrer">Создано с Gravity UI<Icon data={ArrowUpRight} size={14} /></a>
      </footer>
    </div>
  );
}
