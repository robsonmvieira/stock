import { Test, TestingModule } from '@nestjs/testing'
import { DeleteSupplierUseCase } from './delete-supplier-use-case'

describe('DeleteSupplierUseCase', () => {
  let service: DeleteSupplierUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteSupplierUseCase]
    }).compile()

    service = module.get<DeleteSupplierUseCase>(DeleteSupplierUseCase)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
