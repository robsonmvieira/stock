import { Module } from '@nestjs/common'
import { EmployeeModule } from './modules/employee/employee.module'
import { ConfigModule } from './modules/config/config.module'
import { DatabaseModule } from './modules/database/database.module'
import { CacheModule } from './cache/cache.module'
import { SessionModule } from './modules/session/session.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CacheModule,
    EmployeeModule,
    SessionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
