// eslint-disable-next-line no-undef
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '^@config(.*)$': '<rootDir>/src/config$1',
    '^@modules(.*)$': '<rootDir>/src/main/modules$1',
    '^@external(.*)$': '<rootDir>/src/main/external$1',
    '^@utils(.*)$': '<rootDir>/src/main/utils$1'
  }
}
