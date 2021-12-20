module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js', '**/vendor/*.js'],
  rules: {
    'linebreak-style': 0,
    'eol-last': 0,
    'operator-linebreak': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'class-methods-use-this': 0,
    'prefer-destructuring': 0,
    'no-prototype-builtins': 0,
    'consistent-return': 0,
    'no-continue': 0,
  },
};
