import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Gravity UI imports its CSS from inside node_modules; let Vite process it instead of Node.
    server: {
      deps: {
        inline: ['@gravity-ui/uikit'],
      },
    },
  },
});
