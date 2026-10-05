import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      gatsby: path.resolve(import.meta.dirname, 'src/__mocks__/gatsby.ts'),
      'gatsby-plugin-image': path.resolve(
        import.meta.dirname,
        'src/__mocks__/gatsby-plugin-image.ts',
      ),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
