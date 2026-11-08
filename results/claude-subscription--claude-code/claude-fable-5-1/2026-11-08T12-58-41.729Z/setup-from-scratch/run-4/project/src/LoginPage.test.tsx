import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider } from '@gravity-ui/uikit';
import { describe, expect, it } from 'vitest';

import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders email, password, remember-me checkbox and submit button on Gravity UI', () => {
    const html = renderToStaticMarkup(
      <ThemeProvider theme="light">
        <LoginPage />
      </ThemeProvider>,
    );

    expect(html).toContain('type="email"');
    expect(html).toContain('type="password"');
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('Запомнить меня');
    expect(html).toContain('type="submit"');
    expect(html).toContain('Войти');
    // Gravity UI class prefix proves the components come from the design system
    expect(html).toContain('g-text-input');
    expect(html).toContain('g-checkbox');
    expect(html).toContain('g-button');
    expect(html).toContain('g-card');
  });
});
