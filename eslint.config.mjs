import babelParser from '@babel/eslint-parser'
import globals from 'globals'

export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        allowImportExportEverywhere: true,
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        module: 'readonly',
        console: 'readonly',
        unescape: 'readonly',
        define: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      curly: 0,
      eqeqeq: 2,
      'wrap-iife': [2, 'any'],
      'no-use-before-define': [2, { functions: false }],
      'new-cap': 2,
      'no-caller': 2,
      'dot-notation': 0,
      'no-eq-null': 2,
      'no-unused-expressions': 0,
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
