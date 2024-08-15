module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  globals: {},
  plugins: ['prettier'],
  extends: [
    '@slothkit/eslint-config',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'prettier/prettier': 1,
    'no-undefined': 0,
    'no-continue': 0,
    'import/extensions': 0,
  },
  overrides: [
    {
      files: ['*.{test,spec}.ts{,x}'],
      rules: {
        'import/no-extraneous-dependencies': [1, { packageDir: './' }],
      },
    },
  ],
}
