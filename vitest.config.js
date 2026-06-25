import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: false,
      include: [
        'src/components/Card.jsx',
        'src/components/ProductList.jsx',
        'src/components/CartItem.jsx',
        'src/context/CartContext.jsx',
        'src/services/storage/storageService.js',
        'src/screens/Checkout.jsx',
        'src/hooks/useCartActions.jsx',
        'src/hooks/useFormValidation.jsx',
        'src/utils/priceUtils.js',
      ],
      threshold: {
        global: {
          statements: 50,
          branches: 30,
          functions: 40,
          lines: 50,
        },
      },
    },
  },
})
