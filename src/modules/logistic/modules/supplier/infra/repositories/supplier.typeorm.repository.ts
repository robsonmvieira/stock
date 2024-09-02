import { BaseRepository } from 'src/modules/core/infra'
import { SupplierModel } from '../../domain/models/supplier.model'
import { ISupplierRepository } from '../../domain/repositories'

export class SupplierTypeORMRepository
  extends BaseRepository<SupplierModel>
  implements ISupplierRepository
{
  async findByDocument(document: string): Promise<SupplierModel> {
    return await this.repo.findOne({ where: { document } })
  }
}
