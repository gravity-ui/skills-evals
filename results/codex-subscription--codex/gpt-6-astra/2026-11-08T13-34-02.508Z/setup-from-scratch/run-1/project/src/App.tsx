import {useRef, useState, type FormEvent} from 'react';
import {Alert, Button, Checkbox, Icon, PasswordInput, TextInput} from '@gravity-ui/uikit';
import {ArrowRight, ArrowUpRight, CircleCheck, Lock, Sparkles} from '@gravity-ui/icons';

function GravityMark({small = false}: {small?: boolean}) {
  return <span className={`gravity-mark${small ? ' gravity-mark_small' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 32 32" fill="none"><path d="M8 10.5 16 6l8 4.5v10L16 25l-8-4.5v-10Z" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round"/><path d="m8 10.5 8 4.7 8-4.7M16 15v10" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round"/></svg>
  </span>;
}

function OrbitalArtwork() {
  return <svg className="orbital-art" viewBox="0 0 620 540" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="planet" cx="0" cy="0" r="1" gradientTransform="translate(262 190) rotate(52) scale(270)">
        <stop stopColor="#f0ffae"/><stop offset=".22" stopColor="#d2e68c"/><stop offset=".53" stopColor="#a1b668"/><stop offset=".8" stopColor="#647b3c"/><stop offset="1" stopColor="#344c24"/>
      </radialGradient>
      <linearGradient id="orbit" x1="90" y1="170" x2="530" y2="410"><stop stopColor="#617743"/><stop offset=".5" stopColor="#8c9e65"/><stop offset="1" stopColor="#435c2c"/></linearGradient>
      <radialGradient id="satellite" cx=".3" cy=".2" r=".8"><stop stopColor="#fcffe9"/><stop offset=".5" stopColor="#e4eecb"/><stop offset="1" stopColor="#869965"/></radialGradient>
      <filter id="shadow"><feGaussianBlur stdDeviation="15"/></filter>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".13"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter>
      <clipPath id="planet-clip"><circle cx="310" cy="266" r="133"/></clipPath>
    </defs>
    <ellipse cx="326" cy="441" rx="133" ry="15" fill="#526a30" opacity=".14" filter="url(#shadow)"/>
    <g stroke="#8d9e70" strokeWidth=".8" opacity=".3">
      <circle cx="310" cy="266" r="211"/><circle cx="310" cy="266" r="252" strokeDasharray="2 6"/>
      <path d="M310 4v31m0 462v31M48 266h31m462 0h31"/>
    </g>
    <ellipse cx="310" cy="266" rx="248" ry="89" transform="rotate(-33 310 266)" stroke="url(#orbit)" strokeWidth="1.2"/>
    <ellipse cx="310" cy="266" rx="223" ry="95" transform="rotate(37 310 266)" stroke="#8e9e72" strokeWidth=".9"/>
    <circle cx="310" cy="266" r="133" fill="url(#planet)"/>
    <g clipPath="url(#planet-clip)"><circle cx="310" cy="266" r="133" fill="url(#planet)" filter="url(#grain)"/></g>
    <path d="M102 401c27 40 142 13 257-62S554 174 518 131" stroke="url(#orbit)" strokeWidth="1.4"/>
    <path d="M132 132c-29 35 25 113 122 186s201 104 234 71" stroke="#8e9e72" strokeWidth=".9"/>
    <circle cx="496" cy="165" r="21" fill="url(#satellite)"/>
    <circle cx="145" cy="378" r="9" fill="#526738"/>
    <circle cx="215" cy="77" r="3.5" fill="#7b8d57"/>
    <path d="M487 360v16m-8-8h16M123 198v10m-5-5h10" stroke="#71844f" strokeWidth="1.2"/>
  </svg>;
}

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailError = !email.trim() ? 'Введите email' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Введите корректный email' : '';
  const passwordError = !password ? 'Введите пароль' : '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setUnavailable(false);
    if (emailError) { emailRef.current?.focus(); return; }
    if (passwordError) { passwordRef.current?.focus(); return; }
    // Connect the project's authentication service here when it is available.
    // Never store credentials or simulate a successful authentication.
    setUnavailable(true);
  }

  return <main className="page">
    <section className="login-side" aria-label="Вход в аккаунт">
      <header className="brand"><GravityMark/><span>gravity<span className="brand-ui">ui</span></span></header>
      <div className="form-area">
        <div className="welcome-symbol" aria-hidden="true"><Icon data={ArrowUpRight} size={25}/></div>
        <div className="eyebrow">С ВОЗВРАЩЕНИЕМ</div>
        <h1>Войдите в аккаунт</h1>
        <p className="intro">Всё, что нужно для работы.<br/>В одном пространстве.</p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <TextInput id="email" name="email" type="email" size="xl" placeholder="name@company.ru" autoComplete="username" value={email} controlRef={emailRef} onUpdate={(value) => {setEmail(value); setUnavailable(false);}} validationState={attempted && emailError ? 'invalid' : undefined} errorMessage={attempted ? emailError : undefined} controlProps={{required: true, spellCheck: false, autoCapitalize: 'none'}}/>
          </div>
          <div className="field password-field">
            <label htmlFor="password">Пароль</label>
            <PasswordInput id="password" name="password" size="xl" placeholder="Введите пароль" autoComplete="current-password" hideCopyButton value={password} controlRef={passwordRef} onUpdate={(value) => {setPassword(value); setUnavailable(false);}} validationState={attempted && passwordError ? 'invalid' : undefined} errorMessage={attempted ? passwordError : undefined} controlProps={{required: true}}/>
          </div>
          <Checkbox size="m" checked={remember} onUpdate={setRemember} name="remember">Запомнить меня</Checkbox>
          {unavailable && <div className="login-notice" role="alert"><Alert theme="warning" title="Вход пока недоступен" message="Пожалуйста, попробуйте позже."/></div>}
          <Button className="login-button" type="submit" view="action" size="xl" width="max"><span>Войти</span><Icon data={ArrowRight} size={18}/></Button>
        </form>
        <div className="form-note"><Icon data={Lock} size={14}/><span>Ваше личное пространство для больших идей</span></div>
      </div>
      <footer className="login-footer"><span>© {new Date().getFullYear()} Gravity UI</span><span className="made-with"><span className="status-dot"/>Создано с Gravity UI</span></footer>
    </section>
    <aside className="visual-side" aria-label="Ваше пространство возможностей">
      <div className="visual-top"><span className="space-label"><Icon data={Sparkles} size={14}/>ПРОСТРАНСТВО ВОЗМОЖНОСТЕЙ</span><span className="visual-coordinate">G / 01</span></div>
      <div className="art-container"><OrbitalArtwork/></div>
      <div className="visual-copy"><span className="visual-kicker">ПРИТЯЖЕНИЕ ХОРОШИХ ИДЕЙ</span><h2>Всё начинается<br/>с одного входа<span>.</span></h2><p>Возвращайтесь к важному. Создавайте новое.<br/>Ваш следующий шаг — здесь.</p></div>
      <div className="visual-footer"><span><Icon data={CircleCheck} size={16}/>Просто. Удобно. В вашем ритме.</span><span className="footer-star" aria-hidden="true">✳</span></div>
    </aside>
  </main>;
}
