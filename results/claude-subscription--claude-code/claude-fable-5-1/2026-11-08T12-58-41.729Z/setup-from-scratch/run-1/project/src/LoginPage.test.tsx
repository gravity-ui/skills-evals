import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider } from '@gravity-ui/uikit';
import { describe, expect, it } from 'vitest';

import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  const html = renderToStaticMarkup(
    <ThemeProvider theme="light">
      <LoginPage />
    </ThemeProvider>,
  );

  it('renders the heading', () => {
    expect(html).toContain('Вход');
  });

  it('renders email and password fields on Gravity UI controls', () => {
    expect(html).toMatch(/<input(?=[^>]*type="email")(?=[^>]*name="email")(?=[^>]*id="login-email")/);
    expect(html).toMatch(/<label[^>]*for="login-email"[^>]*>Email<\/label>/);
    expect(html).toMatch(
      /<input(?=[^>]*type="password")(?=[^>]*name="password")(?=[^>]*id="login-password")/,
    );
    expect(html).toMatch(/<label[^>]*for="login-password"[^>]*>Пароль<\/label>/);
    expect(html).toContain('g-text-input');
    expect(html).toContain('g-password-input');
  });

  it('renders the "remember me" checkbox', () => {
    expect(html).toMatch(/<input(?=[^>]*type="checkbox")(?=[^>]*name="remember")/);
    expect(html).toContain('Запомнить меня');
    expect(html).toContain('g-checkbox');
  });

  it('renders the submit button', () => {
    expect(html).toMatch(/<button[^>]*type="submit"[^>]*class="[^"]*g-button_view_action/);
    expect(html).toContain('Войти');
  });
});
