module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.(js|ts|tsx)',
    '<rootDir>/src/pages/**/*.(js|ts|tsx)',
    '<rootDir>/src/hooks/**/*.(js|ts|tsx)',
  ],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
