import { useRef, useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Icon,
  Provider,
  TextInput,
} from "@gravity-ui/uikit";
import {
  ArrowRight,
  ArrowRightToSquare,
  ArrowUpRight,
  Eye,
  EyeSlash,
  Lock,
  Moon,
  Sun,
} from "@gravity-ui/icons";

function GravityMark({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`gravity-mark${small ? " gravity-mark-small" : ""}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </span>
  );
}

export function App() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailError = !email.trim()
    ? "Введите email"
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? "Введите корректный email"
      : "";
  const passwordError = !password ? "Введите пароль" : "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setNotice(false);
    if (emailError) {
      emailRef.current?.focus();
      return;
    }
    if (passwordError) {
      passwordRef.current?.focus();
      return;
    }
    setNotice(true);
  }

  return (
    <Provider theme={dark ? "dark" : "light"} lang="ru">
      <div className={`page${dark ? " page-dark" : ""}`}>
        <header className="header">
          <a className="brand" href="./" aria-label="Gravity — главная">
            <GravityMark />
            <span>
              gravity<span className="brand-ui">ui</span>
            </span>
          </a>
          <div className="header-right">
            <span className="account-label">Личный кабинет</span>
            <span className="header-divider" />
            <Button
              view="flat"
              size="l"
              onClick={() => setDark(!dark)}
              aria-label={
                dark ? "Включить светлую тему" : "Включить тёмную тему"
              }
              title={dark ? "Светлая тема" : "Тёмная тема"}
            >
              <Icon data={dark ? Sun : Moon} size={18} />
            </Button>
          </div>
        </header>

        <main className="main">
          <section className="login-card" aria-labelledby="login-title">
            <aside className="welcome-panel">
              <div className="welcome-top">
                <span className="welcome-eyebrow">
                  <span className="status-dot" /> МЕСТО ДЛЯ ВАШИХ ИДЕЙ
                </span>
                <h2>
                  Всё начинается
                  <br />с простого входа.
                </h2>
                <p>
                  Ваши проекты, инструменты и команда.
                  <br />В одном пространстве.
                </p>
              </div>
              <div className="orbit-art" aria-hidden="true">
                <div className="art-grid" />
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit orbit-three" />
                <div className="planet">
                  <div className="planet-light" />
                  <GravityMark />
                </div>
                <div className="satellite satellite-one">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="satellite satellite-two">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="orbit-dot dot-one" />
                <div className="orbit-dot dot-two" />
                <div className="tiny-star star-one">✦</div>
                <div className="tiny-star star-two">✦</div>
              </div>
              <div className="welcome-bottom">
                <span className="mini-symbol">✳</span>
                <span>Меньше сложностей. Больше возможностей.</span>
              </div>
            </aside>

            <div className="form-panel">
              <div className="login-icon">
                <Icon data={ArrowRightToSquare} size={22} />
              </div>
              <h1 id="login-title">С возвращением</h1>
              <p className="form-description">
                Войдите, чтобы продолжить работу.
              </p>
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    size="xl"
                    placeholder="name@example.com"
                    autoComplete="username"
                    value={email}
                    controlRef={emailRef}
                    onUpdate={(value) => {
                      setEmail(value);
                      setNotice(false);
                    }}
                    validationState={
                      submitted && emailError ? "invalid" : undefined
                    }
                    errorMessage={submitted ? emailError : undefined}
                    controlProps={{
                      required: true,
                      spellCheck: false,
                      autoCapitalize: "none",
                      "aria-invalid": submitted && !!emailError,
                    }}
                  />
                </div>
                <div className="field password-field">
                  <label htmlFor="password">Пароль</label>
                  <TextInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    size="xl"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    value={password}
                    controlRef={passwordRef}
                    onUpdate={(value) => {
                      setPassword(value);
                      setNotice(false);
                    }}
                    validationState={
                      submitted && passwordError ? "invalid" : undefined
                    }
                    errorMessage={submitted ? passwordError : undefined}
                    controlProps={{
                      required: true,
                      "aria-invalid": submitted && !!passwordError,
                    }}
                    endContent={
                      <Button
                        type="button"
                        view="flat"
                        size="m"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Скрыть пароль" : "Показать пароль"
                        }
                        aria-pressed={showPassword}
                      >
                        <Icon data={showPassword ? EyeSlash : Eye} size={18} />
                      </Button>
                    }
                  />
                </div>
                <div className="form-options">
                  <Checkbox
                    size="m"
                    name="remember"
                    checked={remember}
                    onUpdate={setRemember}
                  >
                    Запомнить меня
                  </Checkbox>
                </div>
                <Button
                  type="submit"
                  view="action"
                  size="xl"
                  width="max"
                  className="submit-button"
                >
                  <span>Войти</span>
                  <Icon data={ArrowRight} size={18} />
                </Button>
                {notice && (
                  <div className="form-notice" role="status">
                    <Alert
                      theme="info"
                      title="Форма готова к подключению"
                      message="Сервис авторизации ещё не подключён. Вход пока недоступен."
                    />
                  </div>
                )}
              </form>
              <div className="security-note">
                <Icon data={Lock} size={14} />
                <span>Ваше пространство начинается здесь</span>
              </div>
            </div>
          </section>
          <p className="below-card">Простые инструменты для больших идей.</p>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Gravity UI</span>
          <a href="https://gravity-ui.com" target="_blank" rel="noreferrer">
            Создано на Gravity UI <Icon data={ArrowUpRight} size={14} />
          </a>
          <span className="footer-language">
            <span aria-hidden="true">◎</span> Русский
          </span>
        </footer>
      </div>
    </Provider>
  );
}
