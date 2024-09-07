import {
  CategoryMapper,
  ProductMapper
} from '@modules/logistic/modules/product/application/mappers'
import { Product } from '@modules/logistic/modules/product/domain/entities'
import { Category } from '@modules/logistic/modules/product/domain/entities/category.entity'
import { ProductModel } from '@modules/logistic/modules/product/domain/models'
import {
  ICategoryRepository,
  IProductRepository
} from '@modules/logistic/modules/product/domain/repositories'
import { SupplierMapper } from '@modules/logistic/modules/supplier/application/mappers/supplier.mapper'
import { Supplier } from '@modules/logistic/modules/supplier/domain/entities'
import { ISupplierRepository } from '@modules/logistic/modules/supplier/domain/repositories'
// import { ISupplierRepository } from '@modules/logistic/modules/supplier/domain/repositories'
import { Get, Inject, Injectable } from '@nestjs/common'

Injectable()
export class GenerateDumbDataService {
  @Inject('ICategoryRepository')
  private categoryRepo: ICategoryRepository

  @Inject('IProductRepository')
  private productRepo: IProductRepository

  @Inject('ISupplierRepository')
  private supplierRepo: ISupplierRepository
  @Get()
  async execute() {
    // category
    const categoryFake = Category.fake()
    // const data = categoryFake.aCategory().build()
    const categories: Category[] = categoryFake.theCategories(20).build()
    const categoriesIds = categories.map(c => c.toJSON().id)

    // prepare to save
    const categoriesModel = categories.map(c =>
      CategoryMapper.fromEntityToModel(c)
    )

    // supplier
    const supplierFake = Supplier.fake()
    // const supplier = supplierFake.aSupplier().build()
    // console.log(supplier.toJSON())

    const suppliers: Supplier[] = supplierFake.theSuppliers(20).build()
    const suppliersIds = suppliers.map(c => c.toJSON().id)

    // prepate to save
    const suppliersModel = suppliers.map(s =>
      SupplierMapper.fromEntityToModel(s)
    )

    // save area
    // console.log(JSON.stringify(suppliers, null, 2)) // .suppliers.toJSON())
    // console.log(suppliers.map(s => s.toJSON()))

    // console.log('ids das categories => ', categoriesIds)

    // product
    const productFake = Product.fake()
    const products = productFake
      .theProducts(300)
      .withCategoryIds(categoriesIds)
      .withSupplierIds(suppliersIds)
      .build()

    const productsModel: ProductModel[] = products.map(p =>
      ProductMapper.fromEntityToModel(p)
    )

    await this.categoryRepo.saveMany(categoriesModel)
    await this.supplierRepo.saveMany(suppliersModel)
    await this.productRepo.saveMany(productsModel)

    return { data: 'ok' }
    // console.log(data.toJSON())
    // console.log(categories.map(c => c.toJSON()))
  }
}
