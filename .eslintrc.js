module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '17.0',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['react', 'react-hooks', 'import'],
  rules: {
    'no-debugger': 0,
    'no-console': 1,
    'new-cap': 0,
    strict: 1,
    eqeqeq: ['error', 'smart'],
    camelcase: 1,
    semi: ['error', 'always'],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-prototype-builtins': 0,
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-unexpected-multiline': 'warn',
    'eol-last': 0,
    quotes: [1, 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'prefer-const': 1,
    'react/prop-types': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-pascal-case': 2,
    'react/jsx-no-duplicate-props': 2,
    'import/named': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'no-unused-vars': 0,
  },
};
