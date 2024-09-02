import { Test, TestingModule } from '@nestjs/testing'
import { CreateJobPositionUseCase } from './create-job-position-use-case'
import { IJobPositionRepository } from '@modules/rh/modules/job/domain/repositories'

describe('CreateJobPositionUseCase', () => {
  let service: CreateJobPositionUseCase
  let repo: IJobPositionRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateJobPositionUseCase,
        {
          provide: 'IJobPositionRepository',
          useValue: {
            save: jest.fn(),
            findByTitle: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<CreateJobPositionUseCase>(CreateJobPositionUseCase)
    repo = module.get<IJobPositionRepository>('IJobPositionRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be create a job position', async () => {
    const createSpy = jest.spyOn(repo, 'save')

    ;(repo.findByTitle as jest.Mock).mockReturnValue(null)

    const result = await service.execute({
      title: 'Developer'
    })

    expect(result.hasError).toBe(false)
    expect(result.ok).toBe(true)
    expect(result.data).toBeDefined()
    expect(createSpy).toHaveBeenCalled()
    expect(repo.findByTitle).toHaveBeenCalled()
  })
})
