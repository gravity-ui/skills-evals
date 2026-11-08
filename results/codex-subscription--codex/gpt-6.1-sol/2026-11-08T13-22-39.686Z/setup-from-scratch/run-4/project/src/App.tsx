import {useRef, useState, type FormEvent} from 'react';
import {Button, Checkbox, Icon, Modal, PasswordInput, TextInput} from '@gravity-ui/uikit';
import {ArrowRight, ArrowUpRight, CircleQuestion, Lock, PlanetEarth, Xmark} from '@gravity-ui/icons';

function GravityMark({small = false}: {small?: boolean}) {
  return <svg width={small ? 22 : 34} height={small ? 22 : 34} viewBox="0 0 34 34" fill="none" aria-hidden="true">
    <rect width="34" height="34" rx="11" fill="#FFCF22" />
    <path d="M11 10h6v6h6v8H11V10Z" fill="#222" /><path d="M20 10h3v3h-3z" fill="#222" />
  </svg>;
}

function OrbitIllustration() {
  return <svg className="orbit-art" viewBox="0 0 480 360" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ring" x1="130" y1="60" x2="310" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#FFF09A" /><stop offset=".3" stopColor="#FFDA32" /><stop offset=".66" stopColor="#FDC10D" /><stop offset="1" stopColor="#DE9700" /></linearGradient>
      <linearGradient id="edge" x1="200" y1="100" x2="260" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#FFED7B" /><stop offset="1" stopColor="#E7A600" /></linearGradient>
      <radialGradient id="sphere" cx=".3" cy=".2" r=".8"><stop stopColor="#777A7D" /><stop offset=".45" stopColor="#35383B" /><stop offset="1" stopColor="#151719" /></radialGradient>
      <filter id="shadow" x="-60%" y="-60%" width="220%" height="240%"><feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#756b42" floodOpacity=".13" /></filter>
      <filter id="blur"><feGaussianBlur stdDeviation="12" /></filter>
    </defs>
    <ellipse cx="243" cy="306" rx="114" ry="12" fill="#7B714B" opacity=".1" filter="url(#blur)" />
    <ellipse cx="243" cy="184" rx="202" ry="76" transform="rotate(-28 243 184)" stroke="#D8D7CE" strokeDasharray="3 5" />
    <ellipse cx="242" cy="182" rx="185" ry="125" transform="rotate(28 242 182)" stroke="#DEDED5" />
    <circle cx="400" cy="199" r="5" fill="#B8B9B0" /><circle cx="139" cy="72" r="4" fill="#D4BC60" />
    <g transform="rotate(-34 244 184)" filter="url(#shadow)">
      <ellipse cx="244" cy="193" rx="127" ry="92" stroke="#DFA200" strokeWidth="43" />
      <ellipse cx="244" cy="183" rx="127" ry="92" stroke="url(#ring)" strokeWidth="44" />
      <ellipse cx="244" cy="181" rx="106" ry="71" stroke="url(#edge)" strokeWidth="2" />
      <path d="M108 173c6-45 63-80 127-81" stroke="#FFF1A8" strokeWidth="2" strokeLinecap="round" opacity=".7" />
    </g>
    <circle cx="330" cy="85" r="35" fill="url(#sphere)" filter="url(#shadow)" />
    <g transform="translate(56 98) rotate(-12 33 33)" filter="url(#shadow)">
      <rect width="68" height="68" rx="19" fill="white" /><rect x=".5" y=".5" width="67" height="67" rx="18.5" stroke="#EAEAE5" />
      <rect x="19" y="33" width="7" height="17" rx="2" fill="#303335" /><rect x="31" y="24" width="7" height="26" rx="2" fill="#303335" /><rect x="43" y="17" width="7" height="33" rx="2" fill="#FFCE28" />
    </g>
    <g transform="translate(346 246) rotate(12 29 29)" filter="url(#shadow)">
      <rect width="59" height="59" rx="17" fill="white" /><rect x=".5" y=".5" width="58" height="58" rx="16.5" stroke="#EAEAE5" />
      <rect x="17" y="17" width="10" height="10" rx="3" fill="#FFCF25" /><rect x="32" y="17" width="10" height="10" rx="3" fill="#353738" /><rect x="17" y="32" width="10" height="10" rx="3" fill="#353738" /><rect x="32" y="32" width="10" height="10" rx="3" fill="#353738" />
    </g>
    <path d="m105 251 4 11 11 4-11 4-4 11-4-11-11-4 11-4 4-11Z" fill="#353738" />
    <path d="m389 107 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" fill="#BEBFB4" /><circle cx="282" cy="318" r="3" fill="#D6BA53" />
  </svg>;
}

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(false);
  const [dialog, setDialog] = useState<'help' | 'password' | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailError = !email.trim() ? 'Введите email' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Проверьте адрес электронной почты' : '';
  const passwordError = !password ? 'Введите пароль' : '';
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitted(true); setNotice(false);
    if (emailError) return emailRef.current?.focus();
    if (passwordError) return passwordRef.current?.focus();
    setNotice(true);
  }
  return <div className="page">
    <header className="site-header">
      <a className="brand" href="/" aria-label="Gravity — главная"><GravityMark /><span>gravity<span className="brand-ui">ui</span></span></a>
      <Button view="flat-secondary" size="m" onClick={() => setDialog('help')}><Icon data={CircleQuestion} size={16} /><span>Нужна помощь?</span></Button>
    </header>
    <main className="main">
      <div className="login-card">
        <section className="form-panel" aria-labelledby="login-title">
          <div className="welcome-icon"><Icon data={ArrowRight} size={24} /></div>
          <h1 id="login-title">С возвращением</h1><p className="form-subtitle">Войдите в своё рабочее пространство</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field"><label htmlFor="email">Email</label>
              <TextInput id="email" name="email" type="email" size="xl" placeholder="you@example.com" autoComplete="username" value={email} controlRef={emailRef} onUpdate={value => {setEmail(value); setNotice(false);}} validationState={submitted && emailError ? 'invalid' : undefined} errorMessage={submitted ? emailError : undefined} controlProps={{required: true, spellCheck: false, autoCapitalize: 'none'}} />
            </div>
            <div className="field password-field"><label htmlFor="password">Пароль</label>
              <PasswordInput id="password" name="password" size="xl" placeholder="Введите пароль" autoComplete="current-password" value={password} controlRef={passwordRef} onUpdate={value => {setPassword(value); setNotice(false);}} hideCopyButton validationState={submitted && passwordError ? 'invalid' : undefined} errorMessage={submitted ? passwordError : undefined} controlProps={{required: true}} />
            </div>
            <div className="form-options"><Checkbox checked={remember} onUpdate={setRemember} size="m" name="remember">Запомнить меня</Checkbox><button className="text-button" type="button" onClick={() => setDialog('password')}>Забыли пароль?</button></div>
            <Button className="login-button" type="submit" view="action" size="xl" width="max"><span>Войти</span><Icon data={ArrowRight} size={18} /></Button>
            {notice && <div className="form-notice" role="status">Сервис авторизации пока не подключён. Вход станет доступен после его настройки.</div>}
          </form>
          <div className="access-note"><span>Ещё нет аккаунта?</span><button className="text-button" onClick={() => setDialog('help')}>Свяжитесь с администратором <Icon data={ArrowUpRight} size={13} /></button></div>
        </section>
        <aside className="story-panel" aria-label="Ваше рабочее пространство">
          <div className="story-label"><span className="label-dot" />ПРОСТРАНСТВО ВОЗМОЖНОСТЕЙ</div>
          <OrbitIllustration />
          <div className="story-copy"><h2>Всё нужное.<br />На вашей орбите.</h2><p>Идеи, инструменты и команда — в одном<br className="desktop-break" /> пространстве. Осталось только войти.</p></div>
          <div className="story-bottom"><span className="mini-brand"><GravityMark small /> Сделано с Gravity UI</span><span className="story-dots" aria-hidden="true"><i /><i /><i /></span></div>
        </aside>
      </div>
      <div className="security-note"><Icon data={Lock} size={13} /><span>Ваше пространство начинается с безопасного входа</span></div>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Gravity UI</span><a href="https://gravity-ui.com" target="_blank" rel="noreferrer">Интерфейсы, которые притягивают <Icon data={ArrowUpRight} size={13} /></a><span className="locale"><Icon data={PlanetEarth} size={14} /> Русский</span></footer>
    <Modal open={dialog !== null} onOpenChange={open => {if (!open) setDialog(null);}} aria-labelledby="dialog-title" contentClassName="help-modal">
      <Button className="modal-close" view="flat" aria-label="Закрыть" onClick={() => setDialog(null)}><Icon data={Xmark} size={18} /></Button>
      <div className="welcome-icon"><Icon data={dialog === 'password' ? Lock : CircleQuestion} size={24} /></div>
      <h2 id="dialog-title">{dialog === 'password' ? 'Восстановление доступа' : 'Помощь со входом'}</h2>
      <p>{dialog === 'password' ? 'Чтобы сбросить пароль, обратитесь к администратору вашего рабочего пространства. Он поможет восстановить доступ к аккаунту.' : 'Для доступа к пространству нужен рабочий аккаунт. Обратитесь к администратору вашей организации, чтобы получить приглашение или помощь со входом.'}</p>
      <Button view="action" size="l" width="max" onClick={() => setDialog(null)}>Понятно</Button>
    </Modal>
  </div>;
}
