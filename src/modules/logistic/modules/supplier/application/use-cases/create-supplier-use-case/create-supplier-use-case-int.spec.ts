import { Test, TestingModule } from '@nestjs/testing'
import { CreateSupplierUseCase } from './create-supplier-use-case'
import { ISupplierRepository } from '../../../domain/repositories'
import { Supplier } from '../../../domain/entities'

describe('CreateSupplierUseCase', () => {
  let service: CreateSupplierUseCase
  let repo: ISupplierRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSupplierUseCase,
        {
          provide: 'ISupplierRepository',
          useValue: {
            findByDocument: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<CreateSupplierUseCase>(CreateSupplierUseCase)
    repo = module.get<ISupplierRepository>('ISupplierRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a supplier', async () => {
    ;(repo.save as jest.Mock).mockResolvedValue(null)

    const response = await service.execute({
      name: 'Marguerite Frank',
      lastName: 'John Walker',
      email: 'patozrow@example.com',
      phone: '07937 879679',
      isActive: true,
      document: '07088994442553',
      addresses: [
        {
          street: 'Jekji Trail',
          number: '1375 Kagam Square',
          complement: '755 Ronrak Manor',
          neighborhood: 'Lurmuwpi',
          city: 'Fofmiwgi',
          state: 'FL',
          country: 'PG',
          postalCode: '25525-581'
        }
      ],
      products: ['07483a23-0ba0-41b5-b5c9-7b422bd6eb52']
    })

    expect(repo.findByDocument).toHaveBeenCalled()

    expect(repo.save).toHaveBeenCalledTimes(1)
    expect(response.hasError).toEqual(false)
    expect(response.ok).toEqual(true)
  })

  it('should return an error if document already exists', async () => {
    const mockSupplier = Supplier.fake().aSupplier().build()

    const payload = {
      name: 'Marguerite Frank',
      lastName: 'John Walker',
      email: 'patozrow@example.com',
      phone: '07937 879679',
      isActive: true,
      document: '07088994442553',
      addresses: [
        {
          street: 'Jekji Trail',
          number: '1375 Kagam Square',
          complement: '755 Ronrak Manor',
          neighborhood: 'Lurmuwpi',
          city: 'Fofmiwgi',
          state: 'FL',
          country: 'PG',
          postalCode: '25525-581'
        }
      ],
      products: ['07483a23-0ba0-41b5-b5c9-7b422bd6eb52']
    }

    ;(repo.save as jest.Mock).mockResolvedValue(null)
    ;(repo.findByDocument as jest.Mock).mockResolvedValue(mockSupplier)

    const response = await service.execute(payload as any)

    expect(repo.findByDocument).toHaveBeenCalledWith(payload.document)
    expect(repo.save).not.toHaveBeenCalled()
    expect(response.hasError).toEqual(true)
    expect(response.ok).toEqual(false)
  })
})
