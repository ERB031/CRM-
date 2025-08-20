// eslint.config.js
const js = require('@eslint/js')
const globals = require('globals')
const ts = require('typescript-eslint')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')

module.exports = [
  // Ignore build artifacts, configs, and generated files
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/*.json',
      'next-env.d.ts',
      'eslint.config.js'
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript recommended (non type-checked)
  ...ts.configs.recommended,

  // TS/JS + React for source files
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react, 'react-hooks': reactHooks },
    settings: {
      // New JSX runtime (no need to import React manually)
      react: { version: 'detect', jsxRuntime: 'automatic' },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Don’t require `import React` in TSX
      'react/react-in-jsx-scope': 'off',
      // Don’t flag TS-only identifiers like ReactNode
      'no-undef': 'off',
      // Don’t complain about Next’s generated triple-slash refs
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Allow require() in this config file itself
  {
    files: ['eslint.config.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
]
