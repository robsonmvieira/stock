import { TestingModule, Test } from '@nestjs/testing'
import { GetInfoUseCase } from './get-info.usecase'
import { IEmployeeRepository } from '@modules/employee/domain/repositories'

describe('Get Info Use Case Integration Test', () => {
  let useCase: GetInfoUseCase
  let repo: Partial<IEmployeeRepository>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetInfoUseCase,
        {
          provide: 'IEmployeeRepository',
          useValue: {
            findById: jest.fn(),
            fetchDashboardDataById: jest.fn()
          }
        }
      ]
    }).compile()

    useCase = module.get<GetInfoUseCase>(GetInfoUseCase)
    repo = module.get<Partial<IEmployeeRepository>>('IEmployeeRepository')
  })
  it('should be defined', () => {
    expect(useCase).toBeDefined()
  })

  it('should return an error if employee not found', async () => {
    const findByIdSpy = jest.spyOn(repo, 'fetchDashboardDataById')
    const result = await useCase.execute('123456789')
    expect(result.hasError).toBe(true)
    expect(result.ok).toBe(false)
    expect(result.data).toBeNull()
    expect(result.error).toBeDefined()
    expect(findByIdSpy).toHaveBeenCalled()
  })

  it('should return employee info', async () => {
    const findByIdSpy = jest.spyOn(repo, 'fetchDashboardDataById')
    ;(repo.fetchDashboardDataById as jest.Mock).mockResolvedValue({
      id: '41e203b7-4eb8-41c7-9ca0-5808df90abe3',
      firstName: 'Robson',
      lastName: 'Vieira',
      email: 'robson@amazon.com',
      phone: '21994631811',
      document: '09488005777',
      jobPosition: 'af93c51b-71c8-478b-86d7-b7062806fa61',
      created_at: '2024-08-14T17:03:54.216Z',
      updated_at: null,
      deleted_at: null,
      is_blocked: false,
      is_deleted: false
    })
    const result = await useCase.execute('41e203b7-4eb8-41c7-9ca0-5808df90abe3')

    expect(result.hasError).toBe(false)
    expect(result.ok).toBe(true)
    expect(result.data).toBeDefined()
    expect(findByIdSpy).toHaveBeenCalled()
  })
})
