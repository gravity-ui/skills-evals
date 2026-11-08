import {useRef, useState, type FormEvent} from 'react';
import {Button, Card, Checkbox, PasswordInput, Text, TextInput} from '@gravity-ui/uikit';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailError = !email.trim()
    ? 'Введите email'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? 'Введите корректный email, например name@example.com'
      : '';
  const passwordError = password ? '' : 'Введите пароль';

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

    // Connect the authentication API here, passing email, password and rememberMe.
    // Credentials must never be persisted in browser storage.
    setMessage('Вход пока недоступен. Пожалуйста, попробуйте позже.');
  }

  return (
    <main className="page">
      <div className="login-layout">
        <div className="brand" aria-label="Gravity">
          <span className="brand-mark" aria-hidden="true">g.</span>
          <Text variant="subheader-3">gravity</Text>
        </div>

        <Card className="login-card" view="outlined">
          <div className="login-heading">
            <Text as="h1" variant="header-2" id="login-title">С возвращением</Text>
            <Text as="p" variant="body-2" color="secondary">
              Войдите в свой аккаунт, чтобы продолжить.
            </Text>
          </div>

          <form className="login-form" aria-labelledby="login-title" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <Text as="label" htmlFor="email" variant="body-2">Email</Text>
              <TextInput
                id="email"
                name="email"
                type="email"
                size="xl"
                placeholder="name@example.com"
                autoComplete="username"
                value={email}
                onUpdate={(value) => {setEmail(value); setMessage('');}}
                controlRef={emailRef}
                controlProps={{required: true, spellCheck: false, autoCapitalize: 'none'}}
                validationState={submitted && emailError ? 'invalid' : undefined}
                errorMessage={submitted ? emailError : undefined}
              />
            </div>

            <div className="form-field">
              <Text as="label" htmlFor="password" variant="body-2">Пароль</Text>
              <PasswordInput
                id="password"
                name="password"
                size="xl"
                placeholder="Введите пароль"
                autoComplete="current-password"
                hideCopyButton
                value={password}
                onUpdate={(value) => {setPassword(value); setMessage('');}}
                controlRef={passwordRef}
                controlProps={{required: true}}
                validationState={submitted && passwordError ? 'invalid' : undefined}
                errorMessage={submitted ? passwordError : undefined}
              />
            </div>

            <Checkbox name="rememberMe" size="l" checked={rememberMe} onUpdate={setRememberMe}>
              Запомнить меня
            </Checkbox>

            <Button type="submit" view="action" size="xl" width="max">Войти</Button>

            {message && (
              <Text as="p" variant="body-2" color="secondary" className="form-message" role="status">
                {message}
              </Text>
            )}
          </form>
        </Card>

        <Text as="p" variant="caption-2" color="hint" className="login-footer">
          Ваше рабочее пространство начинается здесь.
        </Text>
      </div>
    </main>
  );
}
