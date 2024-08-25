import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { ConfigModule } from '@modules/config/config.module'
import { ConfigService } from '@nestjs/config'

const Tokens = {
  EMAIL: Symbol('EMAIL')
}

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT')
        }
      })
    }),
    BullModule.registerQueueAsync(
      ...Object.keys(Tokens).map(token => ({
        name: token.toString(),
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          connection: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            password: configService.get('REDIS_PASSWORD')
          }
        }),
        inject: [ConfigService]
      }))
    )
  ]
})
export class EmailModule {}
