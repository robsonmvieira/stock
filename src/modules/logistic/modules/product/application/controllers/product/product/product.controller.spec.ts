import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from './product.controller'
import { CreateProductUseCase } from '../../../use-cases'

describe('ProductController', () => {
  let controller: ProductController
  let createProductUseCase: CreateProductUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<ProductController>(ProductController)
    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(createProductUseCase).toBeDefined()
  })
})
