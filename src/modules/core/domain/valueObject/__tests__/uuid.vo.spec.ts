import { UuidException } from '../../exceptions'
import { UuidVO } from '../uuid.vo'

describe('Uuid Value Object', () => {
  it('should create a valid uuid', () => {
    const uuid = UuidVO.create()
    expect(uuid).toBeTruthy()
    expect(uuid.validate()).toBeTruthy()
  })

  it('should throw an uuid exceptions when uuid is invalid', async () => {
    expect(() => new UuidVO('invalid-uuid')).toThrow(UuidException)
  })

  it('should convert uuid to string', () => {
    const uuid = UuidVO.create()
    expect(uuid.toString()).toBeTruthy()
  })

  it('should create a valid uuid with uuid params', () => {
    const uuid = new UuidVO('b1c19374-d75f-48c2-87c7-9cfa02317ce5')
    expect(uuid).toBeTruthy()
    expect(uuid.validate()).toBeTruthy()
  })
})
