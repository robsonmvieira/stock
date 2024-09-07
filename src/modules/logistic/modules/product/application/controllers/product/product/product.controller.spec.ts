import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from './product.controller'
import {
  BlockProductUseCase,
  CreateProductUseCase,
  ListProductUseCase
} from '../../../use-cases'

describe('ProductController', () => {
  let controller: ProductController
  let createProductUseCase: CreateProductUseCase
  let blockProductUseCase: BlockProductUseCase
  let listProductUseCase: ListProductUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: BlockProductUseCase,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: ListProductUseCase,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<ProductController>(ProductController)
    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase)
    blockProductUseCase = module.get<BlockProductUseCase>(BlockProductUseCase)
    listProductUseCase = module.get<ListProductUseCase>(ListProductUseCase)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(createProductUseCase).toBeDefined()
    expect(blockProductUseCase).toBeDefined()
    expect(listProductUseCase).toBeDefined()
  })
})
