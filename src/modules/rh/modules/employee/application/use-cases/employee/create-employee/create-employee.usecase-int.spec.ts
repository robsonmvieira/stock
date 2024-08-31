/* eslint-disable prettier/prettier */

import { IEncryptPort } from '@modules/encrypt/domain/repositories/encrypt.port'
import { CreateEmployeeUseCase } from './create-employee.usecase'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateEmployeeDto } from './dto'
import { IEmployeeRepository } from '@modules/rh/modules/employee/domain/repositories'

describe('Create employee Use Case Integration Test', () => {
  let useCase: CreateEmployeeUseCase
  let repo: Partial<IEmployeeRepository>
  let hash: Partial<IEncryptPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEmployeeUseCase,
        {
          provide: 'IEmployeeRepository',
          useValue: {
            findByEmail: jest.fn(),
            findByDocument: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
          }
        },
        {
          provide: 'IEncryptPort',
          useValue: {
            encrypt: jest.fn()
          }
        }
      ]
    }).compile()

    useCase = module.get<CreateEmployeeUseCase>(CreateEmployeeUseCase)
    repo = module.get<IEmployeeRepository>('IEmployeeRepository')
    hash = module.get<IEncryptPort>('IEncryptPort')
  })

  it('should return an error if validation fails', async () => {
    const command = new CreateEmployeeDto({} as any) // Populate with invalid data
    const result = await useCase.execute(command)
    expect(result.hasError).toBe(true)
    expect(result.ok).toBe(false)
    expect(result.error).toBeDefined()
    expect(repo.findByEmail).not.toHaveBeenCalled()
    expect(repo.findByDocument).not.toHaveBeenCalled()
  })

  it('should return an error if email already exists', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      document: '123456789',
      email: 'johndoe@example.com',
      phone: '123456789',
      hireDate: new Date(),
      gestorId: '117e98b7-47c9-46fa-b5dc-14d8e1fe1438',
      jobPosition: 'e651f67c-992a-4835-9e56-41167019944a',
      credencialNumber: '3dea7800-e2da-4ce8-9662-2e8b8457e7c0',
      password: '123456789',
      department: 'RH'
    }
    
  
    const command = new CreateEmployeeDto(payload);
     
    
    
    
    (repo.findByEmail as jest.Mock).mockResolvedValue({
      id: '123456789',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      hireDate: new Date(),
      gestorId: '123456789',
      document: '123456789',
      jobPosition: 'Developer',
      credencialNumber: '123456789',
      initialPassword: '123456789',
      userChangePassword: false,
      password: null
    })
    const result = await useCase.execute(command)
    expect(result.hasError).toBe(true)
    expect(result.ok).toBe(false)
    expect(result.error).toBeDefined()
    expect(repo.findByEmail).toHaveBeenCalled()
    expect(repo.findByDocument).not.toHaveBeenCalled()
  })

  it('should return an error if document already exists', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      document: '123456789',
      email: 'johndoe@example.com',
      phone: '123456789',
      hireDate: new Date(),
      gestorId: '117e98b7-47c9-46fa-b5dc-14d8e1fe1438',
      jobPosition: 'e651f67c-992a-4835-9e56-41167019944a',
      credencialNumber: '3dea7800-e2da-4ce8-9662-2e8b8457e7c0',
      password: '123456789',
      department: 'RH'
    }
    
  
    const command = new CreateEmployeeDto(payload);
    
    (repo.findByDocument as jest.Mock).mockResolvedValue({
      id: '123456789',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      hireDate: new Date(),
      gestorId: '123456789',
      document: '123456789',
      jobPosition: 'Developer',
      credencialNumber: '123456789',
      initialPassword: '123456789',
      userChangePassword: false,
      password: null
    }) 
    const result = await useCase.execute(command)
    expect(result.hasError).toBe(true)
    expect(result.ok).toBe(false)
    expect(result.error).toBeDefined()
    expect(repo.findByEmail).toHaveBeenCalled()
    expect(repo.findByDocument).toHaveBeenCalled()
  })

  it('should create a new employee', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      document: '123456789',
      email: 'johndoe@example.com',
      phone: '123456789',
      hireDate: new Date(),
      gestorId: '117e98b7-47c9-46fa-b5dc-14d8e1fe1438',
      jobPosition: 'e651f67c-992a-4835-9e56-41167019944a',
      credencialNumber: '3dea7800-e2da-4ce8-9662-2e8b8457e7c0',
      password: '123456789',
      department: 'RH'
    }
    
  
    const command = new CreateEmployeeDto(payload);

    (hash.encrypt as jest.Mock).mockResolvedValueOnce('254fae0c9638a68d304ac0447525eae7')
    


    const result = await useCase.execute(command)
    expect(result.hasError).toBe(false)
    expect(result.ok).toBe(true)
    expect(result.data).toBeDefined()
    expect(repo.findByEmail).toHaveBeenCalled()
    expect(repo.findByDocument).toHaveBeenCalled()
    expect(repo.save).toHaveBeenCalled()
  })
})
