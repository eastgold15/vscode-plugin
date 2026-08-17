import dedent from "ts-dedent";

export function getESLintConfig() {
  return dedent`
    import eslint from '@eslint/js';
    tseslint from 'typescript-eslint';
    eslintPluginReact from 'eslint-plugin-react';
    eslintPluginReactHooks from 'eslint-plugin-react-hooks';

    export default [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
          parser: tseslint.parser,
          parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
        plugins: {
          react: eslintPluginReact,
          'react-hooks': eslintPluginReactHooks,
        },
        rules: {
          ...eslintPluginReact.configs.recommended.rules,
          ...eslintPluginReactHooks.configs.recommended.rules,
          'react/react-in-jsx-scope': 'off',
        },
        settings: {
          react: {
            version: 'detect',
          },
        },
      },
      {
        files: ['extension/**/*.ts'],
        languageOptions: {
          globals: {
            module: 'readonly',
            require: 'readonly',
            __dirname: 'readonly',
          },
        },
      },
    ];
  `;
}
