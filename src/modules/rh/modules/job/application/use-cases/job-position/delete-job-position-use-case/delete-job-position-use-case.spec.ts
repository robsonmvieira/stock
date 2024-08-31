import { Test, TestingModule } from '@nestjs/testing'
import { DeleteJobPositionUseCase } from './delete-job-position-use-case'

describe('DeleteJobPositionUseCase', () => {
  let service: DeleteJobPositionUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteJobPositionUseCase]
    }).compile()

    service = module.get<DeleteJobPositionUseCase>(DeleteJobPositionUseCase)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
