import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { EmployeeTypeORMRepository } from './infra'
import { EmployeeModel } from './domain/models'
import { CreateEmployeeUseCase } from './application/use-cases/employee'
import { DatabaseModule } from '@modules/database/database.module'
import { CacheModule } from 'src/cache/cache.module'
import { EmployeeController } from './application/controllers/employee.controller'

@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'IEmployeeRepository',
      useFactory: (data: DataSource) => {
        new EmployeeTypeORMRepository(data.getRepository(EmployeeModel))
      }
    },
    CreateEmployeeUseCase
  ]
})
export class EmployeeModule {}
