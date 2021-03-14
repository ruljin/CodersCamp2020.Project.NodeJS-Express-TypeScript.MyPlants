module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'airbnb-base'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'comma-dangle': ['error', 'never'],
    'no-console': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'array-callback-return': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['server'],
        extensions: ['.ts']
      }
    }
  }
};
