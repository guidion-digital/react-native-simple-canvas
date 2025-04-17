// For some reason the global setup doesn't work anymore. This properly enforces the timezone.
process.env.TZ = 'Europe/Amsterdam';

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
  transformIgnorePatterns: [
    // eslint-disable-next-line @stylistic/max-len
    'node_modules/(?!(jest-|@)?react-native|@ronradtke/react-native-markdown-display|victory-*|@shopify/react-native-skia|d3-.*|internmap|@notifee/react-native)',
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
