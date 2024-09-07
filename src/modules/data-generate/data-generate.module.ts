import { ProductModule } from '@modules/logistic/modules/product/product.module'
import { Module } from '@nestjs/common'
import { GenerateDumbDataService } from './generate-dumb-data-service/generate-dumb-data.service'
import { DumbDataController } from './dumb-data-controller/dumb-data-controller.controller'
import { SupplierModule } from '@modules/logistic/modules/supplier/supplier.module'
import { LogisticModule } from '@modules/logistic/logistic.module'

@Module({
  imports: [LogisticModule, SupplierModule],
  controllers: [DumbDataController],
  providers: [GenerateDumbDataService],
  exports: []
})
export class DataGenerateModule {}
