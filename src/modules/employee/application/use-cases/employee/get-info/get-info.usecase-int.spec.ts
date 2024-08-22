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
            findById: jest.fn()
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
    const findByIdSpy = jest.spyOn(repo, 'findById')
    const result = await useCase.execute('123456789')
    expect(result.hasError).toBe(true)
    expect(result.ok).toBe(false)
    expect(result.data).toBeNull()
    expect(result.error).toBeDefined()
    expect(findByIdSpy).toHaveBeenCalled()
  })

  it('should return employee info', async () => {
    const findByIdSpy = jest.spyOn(repo, 'findById')
    ;(repo.findById as jest.Mock).mockResolvedValue({
      id: '123456789',
      name: 'John Doe',
      document: '123456789',
      email: 'zvzT3@example.com',
      phone: '123456789',
      hireDate: new Date(),
      gestorId: '123456789',
      jobPosition: 'Developer',
      credencialNumber: '123456789'
    })
    const result = await useCase.execute('123456789')
    expect(result.hasError).toBe(false)
    expect(result.ok).toBe(true)
    expect(result.data).toBeDefined()
    expect(findByIdSpy).toHaveBeenCalled()
  })
})
