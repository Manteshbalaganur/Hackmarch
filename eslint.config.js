import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022, // Latest ECMA version for modern JS features
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }], // Ignore unused args with _
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'eqeqeq': ['error', 'always'], // Enforce === over ==
      'no-console': ['warn'], // Warn on console.log (remove before prod)
      'react/prop-types': 'off', // If you're not using PropTypes
    },
  },
];