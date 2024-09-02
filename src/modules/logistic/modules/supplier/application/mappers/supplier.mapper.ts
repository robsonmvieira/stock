import { Supplier } from '../../domain/entities'
import { SupplierModel } from '../../domain/models'
import { CreateSupplierDtoProps } from '../use-cases/create-supplier-use-case/dto'
import { SupplierOutput } from '../use-cases/list-supplier-use-case/dto/supplier.output'

export class SupplierMapper {
  static fromDTOToEntity(command: CreateSupplierDtoProps) {
    return Supplier.create(command)
  }

  static fromEntityToModel(entity: Supplier) {
    return new SupplierModel({
      id: entity.id.id,
      name: entity.name,
      lastName: entity.lastName,
      email: entity.email.value,
      phone: entity.phone,
      document: entity.document.value,
      addresses: entity.addresses.map(address => address.value),
      products: entity.products.map(product => product),
      isActive: entity.isActive,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
      is_deleted: entity.is_deleted,
      is_blocked: entity.is_blocked
    })
  }

  static fromModelToOutput(model: SupplierModel): SupplierOutput {
    return {
      id: model.id,
      name: model.name,
      lastName: model.lastName,
      email: model.email,
      phone: model.phone,
      document: model.document,
      addresses: [...model.addresses],
      createdAt: model.created_at,
      updatedAt: model.updated_at,
      isActive: model.isActive
    }
  }
}
