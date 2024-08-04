import { DataSource } from 'typeorm'
import * as path from 'path'
import { config } from 'dotenv'
import * as fs from 'fs'
import { Model } from 'src/modules/core/domain/entities/model'

config({ path: './envs/.env' }) // Carrega as variáveis de ambiente do arquivo .env

const rootDir = path.resolve(__dirname, './src')

const entities = []

function readModelsDir(dir) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.resolve(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      readModelsDir(filePath)
    } else if (file.endsWith('.model.ts') || file.endsWith('.model.js')) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const entityModule = require(filePath)
        Object.values(entityModule).forEach(entity => {
          if (
            typeof entity === 'function' &&
            entity.prototype instanceof Model &&
            entity !== Model &&
            entity.prototype.constructor.name !== 'Model'
          ) {
            entities.push(entity)
          }
        })
      } catch (error) {
        console.error(`Error loading entity from file ${filePath}: `, error)
      }
    }
  })
}

readModelsDir(rootDir)

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities,
  migrations: [path.join(rootDir, 'migrations', '*{.ts,.js}')],
  synchronize: process.env.NODE_ENV !== 'production'
})

export default AppDataSource
