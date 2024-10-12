//eslint.config.js
import js from '@eslint/js'

export default [
  {
    ... js.configs.recommended,
    ignores: ['node_modules', 'dist', 'public'],
    env: {
      es6: true,
    },
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.cts', '**/*.mts'],
    rules: {},
    ignores: ['node_modules/'],
  },
]
