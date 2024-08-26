import { Module } from '@nestjs/common'
import { BullModule, BullModuleOptions } from '@nestjs/bull'
import { ConfigModule } from '@modules/config/config.module'
import { ConfigService } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'
import { EmailService } from './handlers/email.service'
import { WelcomeQueueHandlerPublisher } from './handlers/welcome-handler/welcome-handler.service'
import { WelcomeQueueConsummerService } from './handlers/welcome-queue-consummer/welcome-queue-consummer.service'
export const Tokens = {
  EMAIL: Symbol('EMAIL')
}

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get('EMAIL_USERNAME'),
            pass: configService.get('EMAIL_PASSWORD')
          }
        },
        defaults: {
          from: `"${configService.get('EMAIL_NAME')}" <${configService.get(
            'EMAIL_USER'
          )}>`
        }
      })
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService
      ): Promise<BullModuleOptions> => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD')
        }
      })
    }),
    BullModule.registerQueueAsync(
      ...Object.keys(Tokens).map(token => ({
        name: token.toString(),
        imports: [ConfigModule],
        useFactory: async (
          configService: ConfigService
        ): Promise<BullModuleOptions> => ({
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            password: configService.get('REDIS_PASSWORD')
          }
        }),
        inject: [ConfigService]
      }))
    )
  ],
  providers: [
    EmailService,
    WelcomeQueueHandlerPublisher,
    WelcomeQueueConsummerService
  ],
  exports: [EmailService, WelcomeQueueHandlerPublisher]
})
export class EmailModule {}
