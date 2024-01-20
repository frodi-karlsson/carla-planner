module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'xo',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      extends: [
        'xo-typescript',
      ],
      files: [
        '*.ts',
        '*.tsx',
      ],
      rules: {
        semi: [
          'error',
          'never',
        ],
        '@typescript-eslint/semi': [
          'error',
          'never',
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: 'off',
    semi: [
      'error',
      'never',
    ],
    '@typescript-eslint/semi': [
      'error',
      'never',
    ],
    '@typescript-eslint/indent': [
      'error',
      2,
    ],
  },
}
