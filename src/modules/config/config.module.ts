import { Module } from '@nestjs/common'
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule
} from '@nestjs/config'
import Joi from 'joi'
import { join } from 'path'

type DB_SCHEMA_TYPE = {
  DB_VENDOR: string
  DB_HOST: string
  DB_PORT: number
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_DATABASE: string
  DB_LOGGING: boolean
  DB_AUTO_LOAD_MODELS: boolean
}

export const CONFIG_DB_SCHEMA: Joi.StrictSchemaMap<DB_SCHEMA_TYPE> = {
  DB_VENDOR: Joi.string().required().valid('postgres', 'mysql', 'sqlite'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_LOGGING: Joi.boolean().required(),
  DB_AUTO_LOAD_MODELS: Joi.boolean().default(true)
}

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}) {
    const { envFilePath, ...otherOptions } = options
    return super.forRoot({
      isGlobal: true,

      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath : [envFilePath]),
        join(process.cwd(), 'envs', `.${process.env.NODE_ENV}`),
        join(process.cwd(), 'envs', `.env`)
      ],
      validationSchema: Joi.object({
        ...CONFIG_DB_SCHEMA
      }),
      ...otherOptions
    })
  }
}
