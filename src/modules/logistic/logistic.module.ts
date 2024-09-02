import { Module } from '@nestjs/common'

import { SupplierModule } from './modules/supplier/supplier.module'

import { ProductModule } from './modules/product/product.module'

@Module({
  imports: [SupplierModule, ProductModule]
})
export class LogisticModule {}
