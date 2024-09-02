import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { SupplierTypeORMRepository } from './infra'
import { SupplierModel } from './domain/models'
import { DatabaseModule } from '@modules/database/database.module'
import { SupplierController } from './application/controllers/supplier/supplier.controller'
import {
  CreateSupplierUseCase,
  DeleteSupplierUseCase,
  GetByIdSupplierUseCase,
  ListSupplierUseCase,
  UpdateSupplierUseCase
} from './application/use-cases'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'ISupplierRepository',
      useFactory: (data: DataSource) =>
        new SupplierTypeORMRepository(data.getRepository(SupplierModel)),
      inject: ['dbConnectionTypeOrm']
    },
    ListSupplierUseCase,
    CreateSupplierUseCase,
    GetByIdSupplierUseCase,
    UpdateSupplierUseCase,
    DeleteSupplierUseCase
  ],
  exports: ['ISupplierRepository'],
  controllers: [SupplierController]
})
export class SupplierModule {}
