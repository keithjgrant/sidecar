module.exports = {
  extends: [
    'eslint:recommended', // extending recommended config and config derived from eslint-config-prettier
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react', 'import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '6',
    sourceType: 'module',
  },
  rules: {
    'no-shadow': 'warn',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^h$',
      },
    ],
    'object-curly-spacing': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    // 'react/react-in-jsx-scope': false,
  },
  globals: {
    document: true,
    window: true,
    location,
    localStorage: true,
    setTimeout: true,
    clearTimeout: true,
    setInterval: true,
    clearInterval: true,
    Promise: true,
    fetch: true,
    process: true,
    require: true,
    module: true,
    Set: true,
    console: true,
    __dirname: true,
    exports: true,
    Image: true,
    URL,
    navigator: true,
  },
};
