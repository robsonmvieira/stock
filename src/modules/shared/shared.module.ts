import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { UnitOfWorkTypeORM } from './infra/repositories'
import { DatabaseModule } from '@modules/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'IUnitOfWork',
      useFactory: (data: DataSource) => new UnitOfWorkTypeORM(data),
      inject: ['dbConnectionTypeOrm']
    }
  ],
  exports: ['IUnitOfWork']
})
export class SharedModule {}
