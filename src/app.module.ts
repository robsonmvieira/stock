import { Module } from '@nestjs/common'

import { ConfigModule } from './modules/config/config.module'
import { DatabaseModule } from './modules/database/database.module'
import { CacheModule } from './modules/cache/cache.module'
import { SessionModule } from './modules/session/session.module'
import { EncryptModule } from './modules/encrypt/encrypt.module'
import { SharedModule } from './modules/shared/shared.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@modules/shared/auth/auth.guard'
import { EmailModule } from '@modules/email/email.module'
import { RhModule } from '@modules/rh/rh.module'
import { EmployeeModule } from '@modules/rh/modules/employee/employee.module'
import { LogisticModule } from '@modules/logistic/logistic.module'
import { DataGenerateModule } from '@modules/data-generate/data-generate.module'
import { RabbitMqBrokerModule } from '@modules/rabbit-mq-broker/rabbit-mq-broker.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    SharedModule,
    CacheModule,
    EmployeeModule,
    SessionModule,
    EncryptModule,
    EmailModule,
    RhModule,
    LogisticModule,
    DataGenerateModule,
    RabbitMqBrokerModule.forRoot()
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
