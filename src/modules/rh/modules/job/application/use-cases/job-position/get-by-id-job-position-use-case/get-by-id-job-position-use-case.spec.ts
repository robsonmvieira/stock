import { Test, TestingModule } from '@nestjs/testing'
import { GetByIdJobPositionUseCase } from './get-by-id-job-position-use-case'

describe('GetByIdJobPositionUseCase', () => {
  let service: GetByIdJobPositionUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetByIdJobPositionUseCase]
    }).compile()

    service = module.get<GetByIdJobPositionUseCase>(GetByIdJobPositionUseCase)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
