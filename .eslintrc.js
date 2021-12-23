module.exports = {
  parser: 'babel-eslint',
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
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
  },
  settings: {
    'import/resolver': {
      alias: [['Skyact', 'lib/Skyact']],
    },
  },
};
