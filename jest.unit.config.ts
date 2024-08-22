import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: false,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',
  testMatch: ['**/*.spec.ts'], // Apenas testes unitários
  rootDir: './src',
  collectCoverageFrom: [
    '<rootDir>/modules/**/*.ts',
    '!<rootDir>/modules/**/index.ts',
    '!<rootDir>/modules/**/*.fake-builder.ts',
    '!<rootDir>/modules/**/*.module.ts',
    '!<rootDir>/modules/**/*.exception.ts',
    '!<rootDir>/modules/shared/**/*',
    '!<rootDir>/modules/**/application/usecases/**/dto/*'
  ],

  transform: {
    '^.+\\.(t|j)s$': '@swc/jest'
  }
}

export default config
