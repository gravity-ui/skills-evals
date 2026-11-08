import {useRef, useState, type FormEvent} from 'react';
import {Button, Checkbox, Text, TextInput} from '@gravity-ui/uikit';

type SignInValues = {email: string; password: string; rememberMe: boolean};
type AppProps = {onSignIn?: (values: SignInValues) => Promise<void>};

export function App({onSignIn}: AppProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailError = !email.trim()
    ? 'Введите email'
    : emailRef.current?.validity.typeMismatch
      ? 'Введите корректный email'
      : '';
  const passwordError = password ? '' : 'Введите пароль';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setAttempted(true);
    setMessage('');
    if (emailError || passwordError) {
      (emailError ? emailRef : passwordRef).current?.focus();
      return;
    }
    if (!onSignIn) {
      setMessage('Вход пока недоступен. Попробуйте позже.');
      return;
    }
    setLoading(true);
    try {
      await onSignIn({email: email.trim(), password, rememberMe});
    } catch {
      setMessage('Не удалось войти. Проверьте данные и попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-intro">
          <div className="brand-mark" aria-hidden="true">g.</div>
          <Text as="h1" variant="header-2" id="login-title">Добро пожаловать</Text>
          <Text as="p" variant="body-2" color="secondary">
            Войдите, чтобы продолжить работу
          </Text>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate aria-busy={loading}>
          <div className="form-field">
            <Text as="label" htmlFor="email" variant="body-2">Email</Text>
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
              onUpdate={(value) => {setEmail(value); setMessage('');}}
              disabled={loading}
              validationState={attempted && emailError ? 'invalid' : undefined}
              errorMessage={attempted ? emailError : undefined}
            />
          </div>
          <div className="form-field">
            <Text as="label" htmlFor="password" variant="body-2">Пароль</Text>
            <TextInput
              id="password"
              name="password"
              type="password"
              size="xl"
              placeholder="Введите пароль"
              autoComplete="current-password"
              controlRef={passwordRef}
              controlProps={{required: true}}
              value={password}
              onUpdate={(value) => {setPassword(value); setMessage('');}}
              disabled={loading}
              validationState={attempted && passwordError ? 'invalid' : undefined}
              errorMessage={attempted ? passwordError : undefined}
            />
          </div>
          <Checkbox name="rememberMe" size="l" checked={rememberMe} onUpdate={setRememberMe} disabled={loading}>
            Запомнить меня
          </Checkbox>
          <Button type="submit" view="action" size="xl" width="max" loading={loading}>
            Войти
          </Button>
          {message && <Text as="p" variant="body-2" color="danger" role="alert">{message}</Text>}
        </form>
      </section>
    </main>
  );
}
