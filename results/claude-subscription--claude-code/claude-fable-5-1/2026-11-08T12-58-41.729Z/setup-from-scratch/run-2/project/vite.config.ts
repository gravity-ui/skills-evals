import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // uikit компоненты импортируют свой CSS; инлайним пакет, чтобы vitest обработал эти импорты.
    server: { deps: { inline: [/@gravity-ui\/uikit/] } },
  },
});
