import { Inject, Injectable } from '@nestjs/common'
import { ISupplierRepository } from '../../../domain/repositories'
import { ModelOutput } from '@modules/core/application/usecases/common'
import { CreateSupplierDtoProps, CreateSupplierDtoPropsValidator } from './dto'
import { SupplierMapper } from '../../mappers/supplier.mapper'

@Injectable()
export class CreateSupplierUseCase {
  @Inject('ISupplierRepository')
  private repo: ISupplierRepository

  async execute(data: CreateSupplierDtoProps): Promise<ModelOutput> {
    const validate = CreateSupplierDtoPropsValidator.validate(data)
    if (Object.keys(validate).length !== 0) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: validate
      })
    }

    const supplier = await this.repo.findByDocument(data.document)
    if (supplier) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          document: 'document already exists'
        }
      })
    }

    const entity = SupplierMapper.fromDTOToEntity(data)

    if (entity.notification.hasError()) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: entity.notification.errors
      })
    }

    const model = SupplierMapper.fromEntityToModel(entity)

    await this.repo.save(model)

    return new ModelOutput({
      hasError: false,
      data: null,
      error: null
    })
  }
}
