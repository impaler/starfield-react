// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  roots: ['src', 'example'],
  setupFiles: ['jest-canvas-mock'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '!**/__e2e__/**/*.[jt]s?(x)',
  ],
}
