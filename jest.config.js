module.exports = {
  preset: 'react-native',
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*fixture*'
  ],
  testMatch: null,
  testRegex: '(/__tests__/.*(\\.|/)(tests|test|spec))\\.tsx?$',
  cacheDirectory: '.jest/cache',
  testPathIgnorePatterns: [
    '/node_modules/',
    'example/'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-|@)?react-native)',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '\\.ttf$': '<rootDir>/__mocks__/fileMock.ts'
  },
};
