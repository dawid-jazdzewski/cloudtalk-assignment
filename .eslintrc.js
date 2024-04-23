module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@darraghor/nestjs-typed', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@darraghor/nestjs-typed/all-properties-have-explicit-defined': 'off',
    '@darraghor/nestjs-typed/all-properties-are-whitelisted': 'off',
    '@darraghor/nestjs-typed/injectable-should-be-provided': 'off',
    '@darraghor/nestjs-typed/param-decorator-name-matches-route-param': 'off',
    '@darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/require-await': 'off',
    "@darraghor/nestjs-typed/api-property-returning-array-should-set-array": "off",
    "@darraghor/nestjs-typed/api-property-matches-property-optionality": "off",
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'require-await': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
      },
    ],

    'no-restricted-syntax': [
      'error',
      {
        selector:
          'CallExpression[callee.object.name=configService][callee.property.name=/^(get|getOrThrow)$/]:not(:has([arguments.1] Property[key.name=infer][value.value=true])), CallExpression[callee.object.property.name=configService][callee.property.name=/^(get|getOrThrow)$/]:not(:has([arguments.1] Property[key.name=infer][value.value=true]))',
        message:
          'Add "{ infer: true }" to configService.get() for correct typechecking. Example: configService.get("database.port", { infer: true })',
      },
    ],
  },
};
