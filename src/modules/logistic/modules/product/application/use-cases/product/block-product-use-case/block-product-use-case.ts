import { ModelOutput } from '@modules/core/application/usecases/common'

import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'
import { Inject, Injectable } from '@nestjs/common'
import { ProductMapper } from '../../../mappers'
import { IUnitOfWork } from '@modules/core/domain/repositories'
import { DomainEventMediator } from '@modules/event/domain'

import { ProductModel } from '@modules/logistic/modules/product/domain/models'
import { ProductStatus } from '@modules/logistic/modules/product/domain/enum/product-status.enum'

@Injectable()
export class BlockProductUseCase {
  @Inject('IProductRepository')
  private repo: IProductRepository

  @Inject('IUnitOfWork')
  private uow: IUnitOfWork

  @Inject(DomainEventMediator)
  private eventMediator: DomainEventMediator

  async execute(id: string): Promise<ModelOutput> {
    console.log('inicio do use case', id)
    // let product = await this.repo.findById(id)

    // if (!product) {
    //   return new ModelOutput({
    //     hasError: true,
    //     data: null,
    //     error: {
    //       name: 'product not exists'
    //     }
    //   })
    // }

    const props = {
      id: 'cc2a5ec6-87bc-472e-a9f9-85c4151c9bc9',
      // created_at: 2024-09-06T16:40:22.506Z,
      updated_at: null,

      is_deleted: false,
      deleted_at: null,
      is_blocked: false,
      name: 'Patmi Bawacirh',
      invoiceNumber: 'uwpeefavav',
      description:
        'La fadsozdus le umitolro afe mi fotuwe ruvep afu itoib etvajka lewce cebowi vocef fit ajowa zemip. Efo haper kagemge hakkoama maj umuanioh dicalaure pudabpeh ziel guzpamde duzjofjoz biswiaki.',
      details:
        'Dakuvro catvet vumudusah diw odabe waf zocoddez zezi liwwe zibe sod vohogwu ziubolig alhi becvir wescikbu. Ifiwijrer nusi niig fujipi losowno roti cuhi tefluev joavrev zo rog jo feceptal fopna. Efi gutoze ow nut afuboggiz sifarmit okdambu miav babjig zalfucbul enon gorwozda jifi soafe onmi leden. Beocu pir akioha di jepobej vih cet ticu nagop zel luwap fub pi aldu bugifo.',
      price: 583,
      stockQuantity: 283,
      blockedQuantity: 549,
      supplierId: '778db636-7b06-4b35-acd6-32fef34d8318',
      sku: 'dafb60c8-f4af-4f99-b590-b312cd88dd80',
      images: ['http://ripeb.nu/war'],
      discountedPrice: 2,
      unitPrice: 6550,
      totalAmount: 77537,
      status: ProductStatus.ACTIVE,
      categoryId: '357006da-9bb3-4e2b-8109-5556a1d36014',
      ratings: 5,
      reviewsCount: 9240,
      totalSalesValue: 698463,
      totalUnitsSold: 401017,
      complaintsCount: 999,
      blockForSaleQuantity: undefined,
      minimalInStockQuantityPermited: 786
    }

    const p = new ProductModel(props)
    const productEntity = ProductMapper.fromModelToEntity(p)

    productEntity.blockProduct('loggedUserId')

    productEntity.blockProduct('loggedUserId')
    this.uow.addAggregate(productEntity)
    await this.uow.do(async () => {
      const aggregates = this.uow.getAggregates()
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
