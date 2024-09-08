import { ModelOutput } from '@modules/core/application/usecases/common'

import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'
import { Inject, Injectable } from '@nestjs/common'
import { ProductMapper } from '../../../mappers'
import { IUnitOfWork } from '@modules/core/domain/repositories'
import { DomainEventMediator } from '@modules/event/domain'

@Injectable()
export class BlockProductUseCase {
  @Inject('IProductRepository')
  private repo: IProductRepository

  @Inject('IUnitOfWork')
  private uow: IUnitOfWork

  @Inject(DomainEventMediator)
  private eventMediator: DomainEventMediator

  async execute(id: string): Promise<ModelOutput> {
    let product = await this.repo.findById(id)

    if (!product) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          name: 'product not exists'
        }
      })
    }

    if (product.is_blocked) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          name: 'product already blocked'
        }
      })
    }

    const productEntity = ProductMapper.fromModelToEntity(product)

    productEntity.blockProduct('loggedUserId')

    this.uow.addAggregate(productEntity)

    await this.uow.do(async () => {
      const aggregates = this.uow.getAggregates()
      product = ProductMapper.fromEntityToModel(productEntity)
      await this.repo.update(product.id, product)
      for (const aggregate of aggregates) {
        await this.eventMediator.publish(aggregate)
      }
    })
    const aggregates = this.uow.getAggregates()
    for (const aggregate of aggregates) {
      await this.eventMediator.publishIntegrationEvents(aggregate)
    }

    return new ModelOutput({ hasError: false, data: null, error: null })
  }
}
