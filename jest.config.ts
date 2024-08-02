import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  rootDir: './src',
  collectCoverageFrom: [
    '<rootDir>/modules/**/*.ts',
    '!<rootDir>/modules/**/index.ts',
    '!<rootDir>/modules/**/*.fake-builder.ts',
    '!<rootDir>/modules/**/*.module.ts',
    '!<rootDir>/modules/**/*.exception.ts'
  ],

  transform: {
    '^.+\\.(t|j)s$': '@swc/jest'
  }
}

export default config
