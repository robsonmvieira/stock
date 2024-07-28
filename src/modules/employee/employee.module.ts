import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { EmployeeTypeORMRepository } from './infra'
import { EmployeeModel } from './domain/models'
import { CreateEmployeeUsecase } from './application/use-cases/employee'

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'IEmployeeRepository',
      useFactory: (data: DataSource) => {
        new EmployeeTypeORMRepository(data.getRepository(EmployeeModel))
      }
    },
    CreateEmployeeUsecase
  ]
})
export class EmployeeModule {}
