import { Test, TestingModule } from '@nestjs/testing'
import { BlockProductUseCase } from './block-product-use-case'
import { IUnitOfWork } from '@modules/core/domain/repositories'
import { DomainEventMediator } from '@modules/event/domain'
import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'

describe('BlockProductUseCase', () => {
  let service: BlockProductUseCase
  let repo: IProductRepository
  let uow: IUnitOfWork
  let eventMediator: DomainEventMediator

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockProductUseCase,
        {
          provide: 'IProductRepository',
          useValue: {
            find: jest.fn(),
            update: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: 'IUnitOfWork',
          useValue: {
            start: jest.fn(),
            commit: jest.fn(),
            rollback: jest.fn()
          }
        },
        {
          provide: DomainEventMediator,
          useValue: {
            publish: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<BlockProductUseCase>(BlockProductUseCase)
    repo = module.get<IProductRepository>('IProductRepository')
    uow = module.get<IUnitOfWork>('IUnitOfWork')
    eventMediator = module.get<DomainEventMediator>(DomainEventMediator)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
    expect(uow).toBeDefined()
    expect(eventMediator).toBeDefined()
  })
})
