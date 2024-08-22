import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { LoginUseCase } from './login.usecase'
import { JwtService } from '../../services/jwt.service'
import { IEmployeeRepository } from '@modules/employee/domain/repositories'
import { IEncryptPort } from '@modules/encrypt/domain/repositories/encrypt.port'

describe('LoginUseCase Integration Test', () => {
  let useCase: LoginUseCase
  let repo: Partial<IEmployeeRepository>
  let hash: Partial<IEncryptPort>
  let jwtService: Partial<JwtService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()], // Importa o ConfigModule para fornecer o ConfigService
      providers: [
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn()
          }
        },
        {
          provide: 'IEmployeeRepository',
          useValue: {
            findByEmail: jest.fn()
          }
        },
        {
          provide: 'IEncryptPort',
          useValue: {
            compare: jest.fn()
          }
        },
        {
          provide: LoginUseCase,
          useFactory: (
            jwtService: JwtService,
            encryptPort: IEncryptPort,
            employeeRepository: IEmployeeRepository
          ) => new LoginUseCase(encryptPort, jwtService, employeeRepository),
          inject: [JwtService, 'IEncryptPort', 'IEmployeeRepository']
        }
      ]
    }).compile()

    useCase = module.get<LoginUseCase>(LoginUseCase)
    repo = module.get<Partial<IEmployeeRepository>>('IEmployeeRepository')
    hash = module.get<Partial<IEncryptPort>>('IEncryptPort')
    jwtService = module.get<Partial<JwtService>>(JwtService)
  })

  it('should be defined', () => {
    expect(useCase).toBeDefined()
  })

  it('should return an error object if the employee does not exist', async () => {
    const payload = {
      email: 'johndoe@example.com',
      password: '123456789'
    }

    const result = await useCase.execute(payload, {} as any)
    expect(result.hasError).toBe(true)
  })

  it('should return an error object if the password is invalid', async () => {
    const payload = {
      email: 'johndoe@example.com',
      password: '123456789'
    }

    const result = await useCase.execute(payload, {} as any)
    expect(result.hasError).toBe(true)
  })

  it('should return a token if the login is successful', async () => {
    const payload = {
      email: 'johndoe@example.com',
      password: '123456789'
    }

    ;(repo.findByEmail as jest.Mock).mockResolvedValue({
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
    ;(hash.compare as jest.Mock).mockResolvedValue(true)
    ;(jwtService.signAsync as jest.Mock).mockResolvedValue('token')
    const result = await useCase.execute(payload, { cookie: jest.fn() } as any)
    expect(result.hasError).toBe(false)
  })
})
