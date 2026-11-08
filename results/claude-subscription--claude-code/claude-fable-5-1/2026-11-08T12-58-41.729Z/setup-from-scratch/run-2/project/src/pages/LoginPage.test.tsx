import { renderToString } from 'react-dom/server';
import { Provider } from '@gravity-ui/uikit';
import { describe, expect, it } from 'vitest';

import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders email, password, remember-me checkbox and submit button', () => {
    const html = renderToString(
      <Provider theme="light" lang="ru">
        <LoginPage />
      </Provider>,
    );

    expect(html).toContain('<form');
    expect(html).toMatch(/<input[^>]*type="email"[^>]*id="login-email"/);
    expect(html).toMatch(/<input[^>]*type="password"[^>]*id="login-password"/);
    expect(html).toMatch(/<input[^>]*name="remember"[^>]*type="checkbox"/);
    expect(html).toContain('Запомнить меня');
    expect(html).toMatch(/<button[^>]*type="submit"[^>]*>[\s\S]*Войти/);
    expect(html).toContain('g-text-input');
    expect(html).toContain('g-button_view_action');
  });
});
