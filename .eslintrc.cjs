module.exports = {
  root: true,
  globals: {},
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['prettier'],
  extends: [
    '@slothkit/eslint-config/typescript',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 1,
    'import/no-extraneous-dependencies': 0,
  },
}