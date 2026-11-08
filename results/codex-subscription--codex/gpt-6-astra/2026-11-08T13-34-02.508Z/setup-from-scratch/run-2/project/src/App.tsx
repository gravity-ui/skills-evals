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
  ArrowUpRight,
  CircleQuestion,
  Eye,
  EyeSlash,
  Lock,
  ShieldCheck,
} from "@gravity-ui/icons";

function GravityMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 5 35 31H5L20 5Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="m14 20 7 11h14"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrbitArtwork() {
  return (
    <div className="orbit-art" aria-hidden="true">
      <svg className="orbits" viewBox="0 0 560 400" fill="none">
        <ellipse
          cx="280"
          cy="205"
          rx="236"
          ry="119"
          transform="rotate(-28 280 205)"
        />
        <ellipse
          cx="280"
          cy="205"
          rx="236"
          ry="119"
          transform="rotate(28 280 205)"
        />
        <ellipse
          cx="280"
          cy="205"
          rx="205"
          ry="148"
          transform="rotate(-65 280 205)"
        />
        <circle className="orbit-point" cx="80" cy="139" r="5" />
        <circle className="orbit-point" cx="450" cy="315" r="4" />
        <circle className="orbit-point yellow-point" cx="362" cy="49" r="7" />
      </svg>
      <div className="floating-tile tile-small">
        <svg viewBox="0 0 32 32">
          <rect x="5" y="5" width="8" height="8" rx="2" />
          <rect x="19" y="5" width="8" height="8" rx="2" />
          <rect x="5" y="19" width="8" height="8" rx="2" />
          <rect x="19" y="19" width="8" height="8" rx="2" />
        </svg>
      </div>
      <div className="gravity-cube">
        <GravityMark />
      </div>
      <div className="floating-tile tile-check">
        <Icon data={ShieldCheck} size={30} />
      </div>
      <span className="art-spark spark-one">+</span>
      <span className="art-spark spark-two">+</span>
    </div>
  );
}

const dialogContent = {
  help: {
    title: "Помощь со входом",
    text: "Для входа используйте рабочий email и пароль. Если у вас ещё нет аккаунта или возникли проблемы с доступом, обратитесь к администратору вашего рабочего пространства.",
  },
  password: {
    title: "Восстановление доступа",
    text: "Чтобы сбросить пароль, обратитесь к администратору вашего рабочего пространства. Автоматическое восстановление станет доступно после подключения сервиса авторизации.",
  },
  privacy: {
    title: "Конфиденциальность",
    text: "Эта страница не отправляет ваши данные на сервер. Пароль не сохраняется в браузере. Если выбрать «Запомнить меня», локально сохранится только настройка чекбокса. Правила обработки данных будут доступны после подключения сервиса авторизации.",
  },
};

export function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(() => {
    try {
      return localStorage.getItem("gravity-remember") === "true";
    } catch {
      return false;
    }
  });
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(false);
  const [dialog, setDialog] = useState<keyof typeof dialogContent | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailError = !email.trim()
    ? "Введите email"
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? "Введите корректный email"
      : "";
  const passwordError = !password ? "Введите пароль" : "";

  function handleSubmit(event: FormEvent) {
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
    <main className="login-page">
      <section
        className="brand-panel"
        aria-label="Gravity — ваше рабочее пространство"
      >
        <a href="./" className="brand" aria-label="Gravity — главная">
          <span className="brand-icon">
            <GravityMark />
          </span>
          <span>
            gravity<span className="brand-period">.</span>
          </span>
        </a>
        <div className="brand-story">
          <div className="eyebrow">
            <span className="status-dot" /> ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО
          </div>
          <h1>
            Всё начинается
            <br />с вашего входа<span className="yellow-period">.</span>
          </h1>
          <p className="brand-description">
            Идеи, люди и инструменты.
            <br />
            Всё, что нужно для работы, — в одном месте.
          </p>
          <OrbitArtwork />
          <div className="brand-caption">
            <span className="caption-line" />
            <span>Меньше расстояний. Больше возможностей.</span>
          </div>
        </div>
        <div className="brand-footer">
          <span>© {new Date().getFullYear()} Gravity</span>
          <span>Создано для совместной работы</span>
        </div>
      </section>

      <section className="form-panel" aria-label="Вход в аккаунт">
        <header className="form-header">
          <Button
            view="flat-secondary"
            size="m"
            onClick={() => setDialog("help")}
          >
            <Icon data={CircleQuestion} size={16} />
            <span>Нужна помощь?</span>
            <Icon data={ArrowUpRight} size={14} />
          </Button>
        </header>
        <div className="form-content">
          <div className="welcome-icon">
            <Icon data={ArrowRight} size={24} />
          </div>
          <div className="form-heading">
            <h2>С возвращением</h2>
            <p>Войдите, чтобы продолжить работу.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <TextInput
                id="email"
                name="email"
                type="email"
                size="xl"
                placeholder="you@company.com"
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
                  "aria-invalid": submitted && Boolean(emailError),
                }}
              />
            </div>
            <div className="form-field password-field">
              <div className="field-label-row">
                <label htmlFor="password">Пароль</label>
                <button
                  className="text-link forgot-link"
                  type="button"
                  onClick={() => setDialog("password")}
                >
                  Забыли пароль?
                </button>
              </div>
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
                  "aria-invalid": submitted && Boolean(passwordError),
                }}
                endContent={
                  <Button
                    view="flat-secondary"
                    size="m"
                    type="button"
                    aria-label={
                      showPassword ? "Скрыть пароль" : "Показать пароль"
                    }
                    selected={showPassword}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    <Icon data={showPassword ? EyeSlash : Eye} size={18} />
                  </Button>
                }
              />
            </div>
            <Checkbox
              className="remember-checkbox"
              size="l"
              checked={remember}
              onUpdate={(value) => {
                setRemember(value);
                try {
                  localStorage.setItem("gravity-remember", String(value));
                } catch {
                  /* Storage can be unavailable in private browsing. */
                }
              }}
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
              <span>Войти</span>
              <Icon data={ArrowRight} size={18} />
            </Button>
            {notice && (
              <div className="submit-notice" role="status">
                <Alert
                  theme="info"
                  title="Сервис входа пока не подключён"
                  message="Данные проверены, но войти пока нельзя. Обратитесь к администратору рабочего пространства."
                />
              </div>
            )}
          </form>
          <div className="access-note">
            <span>Ещё нет аккаунта?</span>
            <p>Обратитесь к администратору вашего пространства.</p>
          </div>
          <div className="secure-note">
            <Icon data={Lock} size={14} />
            <span>Ваше пространство. Только для своих.</span>
          </div>
        </div>
        <footer className="form-footer">
          <button className="text-link" onClick={() => setDialog("privacy")}>
            Конфиденциальность
          </button>
          <span className="powered-by">
            На базе{" "}
            <a href="https://gravity-ui.com/" target="_blank" rel="noreferrer">
              Gravity UI <Icon data={ArrowUpRight} size={12} />
            </a>
          </span>
        </footer>
      </section>
      <Modal
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
        aria-labelledby="dialog-title"
      >
        <div className="info-dialog">
          <h2 id="dialog-title">{dialog && dialogContent[dialog].title}</h2>
          <p>{dialog && dialogContent[dialog].text}</p>
          <Button view="action" size="l" onClick={() => setDialog(null)}>
            Понятно
          </Button>
        </div>
      </Modal>
    </main>
  );
}
