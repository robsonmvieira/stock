import { EncryptRepository } from './encrypt.repository'

describe('Encrypt Repository Unit Test', () => {
  let encryptRepository: EncryptRepository

  beforeEach(() => {
    encryptRepository = new EncryptRepository()
  })

  it('should encrypt values', async () => {
    const value = '123'
    const hash = await encryptRepository.encrypt(value)

    expect(hash).not.toBe(value)
  })

  it('should compare values', async () => {
    const value = '123'
    const hash = await encryptRepository.encrypt(value)
    const result = await encryptRepository.compare(value, hash)
    expect(result).toBeTruthy()
  })
})
