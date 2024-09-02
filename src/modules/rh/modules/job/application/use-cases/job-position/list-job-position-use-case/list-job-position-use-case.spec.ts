import { Test, TestingModule } from '@nestjs/testing'
import { ListJobPositionUseCase } from './list-job-position-use-case'
import { IJobPositionRepository } from '@modules/rh/modules/job/domain/repositories'

describe('ListJobPositionUseCase', () => {
  let service: ListJobPositionUseCase
  let repo: Partial<IJobPositionRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListJobPositionUseCase,
        {
          provide: 'IJobPositionRepository',
          useValue: {
            findAll: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<ListJobPositionUseCase>(ListJobPositionUseCase)
    repo = module.get<IJobPositionRepository>('IJobPositionRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be return a job position list', async () => {
    const listSpy = jest.spyOn(repo, 'findAll')
    ;(repo.findAll as jest.Mock).mockReturnValue([
      {
        id: '41e203b7-4eb8-41c7-9ca0-5808df90abe3',
        title: 'Developer',
        description: 'Develops software'
      }
    ])

    const result = await service.execute()
    expect(result.hasError).toBe(false)
    expect(result.ok).toBe(true)
    expect(listSpy).toHaveBeenCalled()
  })

  it('should be return a job empty list', async () => {
    const listSpy = jest.spyOn(repo, 'findAll')
    ;(repo.findAll as jest.Mock).mockReturnValue([])

    const result = await service.execute()
    expect(result.hasError).toBe(false)
    expect(result.ok).toBe(true)
    expect(listSpy).toHaveBeenCalled()
  })
})
