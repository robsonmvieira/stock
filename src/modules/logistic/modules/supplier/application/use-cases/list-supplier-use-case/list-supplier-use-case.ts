import { Inject, Injectable } from '@nestjs/common'
import { ISupplierRepository } from '../../../domain/repositories'
import { ModelCollectionOutput } from '@modules/core/application/usecases/common'
import { SupplierMapper } from '../../mappers/supplier.mapper'
import { SupplierOutput } from './dto/supplier.output'

@Injectable()
export class ListSupplierUseCase {
  @Inject('ISupplierRepository')
  private repo: ISupplierRepository

  async execute(): Promise<ModelCollectionOutput<SupplierOutput>> {
    const suppliers = await this.repo.findAll()

    return new ModelCollectionOutput({
      hasError: false,
      data: suppliers.map(supplier =>
        SupplierMapper.fromModelToOutput(supplier)
      ),
      error: null
    })
  }
}
