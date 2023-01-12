export default {
  roots: ['<rootDir>/test'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/src/(.*)': '<rootDir>/src/$1',
    '@/test/(.*)': '<rootDir>/test/$1',
  },
};
