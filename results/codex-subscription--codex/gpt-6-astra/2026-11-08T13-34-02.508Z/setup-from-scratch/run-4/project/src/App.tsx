import { useRef, useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Icon,
  Modal,
  TextInput,
} from "@gravity-ui/uikit";
import {
  ArrowRight,
  ArrowRightToSquare,
  CircleQuestion,
  Eye,
  EyeSlash,
  Globe,
  Sparkles,
  Lock,
  ShieldCheck,
  Xmark,
} from "@gravity-ui/icons";

function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`brand-mark${large ? " brand-mark_large" : ""}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(false);
  const [dialog, setDialog] = useState<"help" | "password" | null>(null);
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
    <div className="app-shell">
      <header className="header">
        <a className="brand" href="./" aria-label="Gravity — главная">
          <BrandMark />
          <span>
            gravity<span className="brand-ui">ui</span>
          </span>
        </a>
        <Button
          view="flat"
          size="m"
          className="help-button"
          onClick={() => setDialog("help")}
        >
          <Icon data={CircleQuestion} size={16} />
          Нужна помощь?
        </Button>
      </header>

      <main className="main">
        <section className="welcome" aria-labelledby="welcome-title">
          <div className="welcome-copy">
            <span className="eyebrow">
              <span />
              ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО
            </span>
            <h1 id="welcome-title">
              Всё начинается
              <br />с простого входа.
            </h1>
            <p>
              Меньше лишнего. Больше возможностей.
              <br />
              Возвращайтесь к тому, что важно.
            </p>
          </div>
          <div className="illustration" aria-hidden="true">
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-middle" />
            <div className="orbit orbit-inner" />
            <span className="orbit-dot dot-one" />
            <span className="orbit-dot dot-two" />
            <span className="orbit-dot dot-three" />
            <div className="floating-tile tile-top">
              <span className="tile-grid">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="floating-tile tile-bottom">
              <Icon data={Lock} size={24} />
            </div>
            <div className="main-tile">
              <BrandMark large />
            </div>
            <div className="connection-card">
              <span className="connection-check">
                <Icon data={ShieldCheck} size={19} />
              </span>
              <div>
                <strong>Всё на своём месте</strong>
                <span>Вы в своём пространстве</span>
              </div>
              <span className="connection-dot" />
            </div>
            <span className="sparkle sparkle-one">
              <Icon data={Sparkles} size={19} />
            </span>
            <span className="sparkle sparkle-two">
              <Icon data={Sparkles} size={14} />
            </span>
          </div>
          <div className="welcome-bottom">
            <span className="bottom-line" />
            <p>Простые инструменты для больших идей.</p>
            <span className="slide-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
        </section>

        <section className="login-section" aria-labelledby="login-title">
          <div className="login-content">
            <div className="login-icon">
              <Icon data={ArrowRightToSquare} size={24} />
            </div>
            <h2 id="login-title">С возвращением</h2>
            <p className="login-description">
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
                  placeholder="you@example.com"
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
                  }}
                />
              </div>
              <div className="field password-field">
                <div className="field-heading">
                  <label htmlFor="password">Пароль</label>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => setDialog("password")}
                  >
                    Забыли пароль?
                  </button>
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type={visible ? "text" : "password"}
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
                  controlProps={{ required: true }}
                  endContent={
                    <Button
                      view="flat"
                      size="m"
                      className="password-toggle"
                      onClick={() => setVisible(!visible)}
                      aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
                      title={visible ? "Скрыть пароль" : "Показать пароль"}
                      selected={visible}
                    >
                      <Icon data={visible ? EyeSlash : Eye} size={18} />
                    </Button>
                  }
                />
              </div>
              <Checkbox
                checked={remember}
                onUpdate={setRemember}
                size="m"
                name="remember"
              >
                Запомнить меня
              </Checkbox>
              <Button
                className="submit-button"
                view="action"
                size="xl"
                type="submit"
                width="max"
              >
                Войти
                <Icon data={ArrowRight} size={18} />
              </Button>
              {notice && (
                <div className="form-notice" role="status">
                  <Alert
                    theme="info"
                    title="Форма готова к подключению"
                    message="Сервис авторизации пока не подключён. Данные не отправлены."
                  />
                </div>
              )}
            </form>
            <div className="secure-note">
              <Icon data={Lock} size={14} />
              <span>Ваше пространство. Только для вас.</span>
            </div>
          </div>
          <div className="powered-by">
            <span>Создано с</span>
            <span className="mini-gravity">
              <BrandMark />
              Gravity UI
            </span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Gravity UI</span>
        <span className="footer-caption">Хорошая работа начинается здесь.</span>
        <span className="language">
          <Icon data={Globe} size={13} /> Русский
        </span>
      </footer>
      <Modal
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
        aria-labelledby="dialog-title"
      >
        <div className="info-dialog">
          <Button
            className="dialog-close"
            view="flat"
            onClick={() => setDialog(null)}
            aria-label="Закрыть"
          >
            <Icon data={Xmark} />
          </Button>
          <div className="login-icon">
            <Icon
              data={dialog === "password" ? Lock : CircleQuestion}
              size={24}
            />
          </div>
          <h2 id="dialog-title">
            {dialog === "password"
              ? "Восстановление доступа"
              : "Помощь со входом"}
          </h2>
          <p>
            {dialog === "password"
              ? "Чтобы восстановить пароль, обратитесь к администратору вашего рабочего пространства. Самостоятельное восстановление станет доступно после подключения сервиса авторизации."
              : "Введите email и пароль вашего рабочего пространства. Если у вас ещё нет учётной записи или возникли проблемы со входом, обратитесь к администратору."}
          </p>
          <Button view="action" size="l" onClick={() => setDialog(null)}>
            Понятно
          </Button>
        </div>
      </Modal>
    </div>
  );
}
