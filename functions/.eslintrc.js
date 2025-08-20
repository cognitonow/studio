// functions/.eslintrc.js
module.exports = {
  parserOptions: {
    project: './tsconfig.dev.json', // Relative path to tsconfig.dev.json within the functions directory
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
  },
};
