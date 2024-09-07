import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { RabbitMQMessageBroker } from '@modules/shared/infra/repositories'
import { DynamicModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export class RabbitMqBrokerModule {
  static forRoot(): DynamicModule {
    return {
      module: RabbitMqBrokerModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          useFactory: (configService: ConfigService) => ({
            uri: configService.get('RABBITMQ_URI')
          }),
          inject: [ConfigService]
        })
      ],
      global: true,
      exports: [RabbitMQModule]
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: RabbitMqBrokerModule,
      providers: [
        {
          provide: 'IMessageBroker',
          useFactory: (ammql: AmqpConnection) =>
            new RabbitMQMessageBroker(ammql),
          inject: [AmqpConnection]
        }
      ],
      exports: ['IMessageBroker']
    }
  }
}
