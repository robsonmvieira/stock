import { Module } from '@nestjs/common'
import { EmployeeModule } from './modules/employee/employee.module'
import { ConfigModule } from './modules/config/config.module'
import { DatabaseModule } from './modules/database/database.module'
import { CacheModule } from './cache/cache.module'
import { SessionModule } from './modules/session/session.module'
import { EncryptModule } from './modules/encrypt/encrypt.module'
import { SharedModule } from './modules/shared/shared.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@modules/shared/auth/auth.guard'
import { EmailModule } from '@modules/email/email.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    SharedModule,
    CacheModule,
    EmployeeModule,
    SessionModule,
    EncryptModule,
    EmailModule
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
