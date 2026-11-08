import {LoginForm, type LoginValues} from './LoginForm';

// TODO: replace with a real authentication request.
async function login(values: LoginValues) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  console.info('Login submitted', {email: values.email, remember: values.remember});
}

export function App() {
  return (
    <main className="page">
      <LoginForm onSubmit={login} />
    </main>
  );
}
