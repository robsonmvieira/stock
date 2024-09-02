import { IRepository } from 'src/modules/core/domain/repositories'
import { SupplierModel } from '../models/supplier.model'

export interface ISupplierRepository extends IRepository<SupplierModel> {
  findByDocument(document: string): Promise<SupplierModel>
}
