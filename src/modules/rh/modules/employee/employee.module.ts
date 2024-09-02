import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { EmployeeTypeORMRepository } from './infra'
import { EmployeeModel } from './domain/models'
import {
  CreateEmployeeUseCase,
  GetInfoUseCase
} from './application/use-cases/employee'
import { DatabaseModule } from 'src/modules/database/database.module'
import { CacheModule } from 'src/modules/cache/cache.module'
import { EmployeeController } from './application/controllers/employee.controller'
import { EncryptModule } from '@modules/encrypt/encrypt.module'

@Module({
  imports: [DatabaseModule, CacheModule, EncryptModule],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'IEmployeeRepository',
      useFactory: (data: DataSource) =>
        new EmployeeTypeORMRepository(data.getRepository(EmployeeModel)),
      inject: ['dbConnectionTypeOrm']
    },
    CreateEmployeeUseCase,
    GetInfoUseCase
  ],
  exports: ['IEmployeeRepository']
})
export class EmployeeModule {}
