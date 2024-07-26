import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  rootDir: './src',

  transform: {
    '^.+\\.(t|j)s$': '@swc/jest'
  }
}

export default config
