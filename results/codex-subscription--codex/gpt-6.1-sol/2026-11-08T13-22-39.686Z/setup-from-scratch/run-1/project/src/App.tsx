import {useRef, useState, type FormEvent} from 'react';
import {Alert, Button, Checkbox, Icon, PasswordInput, TextInput} from '@gravity-ui/uikit';
import {ArrowRight, Lock, ShieldCheck} from '@gravity-ui/icons';

function GravityMark({className = ''}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M10 8.5 27.5 4l8.5 17.5L19 36 4 24.5 10 8.5Z" fill="currentColor" />
      <path d="m13 14 11-3 5 10-10 8-8-6.5L13 14Z" fill="var(--mark-cutout, #f8c631)" />
      <path d="m17 17 6-1 2 5-5.5 4-4-3L17 17Z" fill="currentColor" />
    </svg>
  );
}

function OrbitIllustration() {
  return (
    <div className="orbit-illustration" aria-hidden="true">
      <div className="orbit orbit-outer" /><div className="orbit orbit-middle" /><div className="orbit orbit-inner" />
      <div className="orbit-axis" />
      <div className="planet planet-top" /><div className="planet planet-small" /><div className="planet planet-bottom" />
      <div className="star star-one">+</div><div className="star star-two">+</div>
      <div className="gravity-core"><GravityMark /></div>
      <div className="orbit-caption"><span /> Всё на своих орбитах</div>
    </div>
  );
}

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!email.trim()) nextErrors.email = 'Введите email';
    else if (!emailRef.current?.validity.valid) nextErrors.email = 'Введите корректный email';
    if (!password) nextErrors.password = 'Введите пароль';
    setErrors(nextErrors);
    setSubmitted(false);
    if (nextErrors.email) emailRef.current?.focus();
    else if (nextErrors.password) passwordRef.current?.focus();
    else setSubmitted(true);
  }

  return (
    <main className="login-page">
      <section className="brand-panel" aria-label="Gravity — ваше рабочее пространство">
        <a className="brand" href="./" aria-label="Gravity — главная">
          <span className="brand-icon"><GravityMark /></span>
          <span>gravity<span className="brand-dot">.</span></span>
        </a>
        <div className="brand-content">
          <div className="eyebrow"><span /> ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО</div>
          <h2>Всё важное.<br />В одном месте.</h2>
          <p>Меньше суеты. Больше возможностей.<br />Войдите и продолжайте с того, на чём остановились.</p>
          <OrbitIllustration />
        </div>
        <div className="brand-bottom"><span className="small-line" /> Пространство для больших идей</div>
      </section>
      <section className="form-panel" aria-labelledby="login-title">
        <div className="top-note"><span className="status-dot" /> Хороший день, чтобы начать</div>
        <div className="login-content">
          <div className="welcome-icon"><Icon data={Lock} size={23} /></div>
          <div className="login-heading">
            <span className="section-label">РАДЫ ВАС ВИДЕТЬ</span>
            <h1 id="login-title">С возвращением</h1>
            <p>Войдите в свой аккаунт, чтобы продолжить.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate className="login-form">
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <TextInput id="email" name="email" type="email" size="xl" placeholder="you@example.com" autoComplete="username"
                value={email} controlRef={emailRef}
                controlProps={{required: true, spellCheck: false, 'aria-required': true, 'aria-describedby': errors.email ? 'email-error' : undefined}}
                validationState={errors.email ? 'invalid' : undefined}
                onUpdate={(value) => {setEmail(value); setErrors((current) => ({...current, email: undefined})); setSubmitted(false);}}
              />
              {errors.email && <span className="field-error" id="email-error" role="alert">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="password">Пароль</label>
              <PasswordInput id="password" name="password" size="xl" placeholder="Введите пароль" autoComplete="current-password" hideCopyButton
                value={password} controlRef={passwordRef}
                controlProps={{required: true, 'aria-required': true, 'aria-describedby': errors.password ? 'password-error' : undefined}}
                validationState={errors.password ? 'invalid' : undefined}
                onUpdate={(value) => {setPassword(value); setErrors((current) => ({...current, password: undefined})); setSubmitted(false);}}
              />
              {errors.password && <span className="field-error" id="password-error" role="alert">{errors.password}</span>}
            </div>
            <Checkbox name="remember" checked={remember} onUpdate={setRemember} size="l">Запомнить меня</Checkbox>
            <Button className="login-button" view="action" size="xl" width="max" type="submit">Войти <Icon data={ArrowRight} size={18} /></Button>
            {submitted && <div role="status"><Alert theme="info" title="Сервис входа ещё не подключён" message="Ваши данные не отправлены. Вход станет доступен после подключения сервиса авторизации." /></div>}
          </form>
          <div className="secure-note"><Icon data={ShieldCheck} size={16} /><span>Ваше пространство. Только для вас.</span></div>
        </div>
        <footer className="page-footer"><span>© {new Date().getFullYear()} Gravity</span><span className="language"><span aria-hidden="true">◎</span> Русский</span></footer>
      </section>
    </main>
  );
}
