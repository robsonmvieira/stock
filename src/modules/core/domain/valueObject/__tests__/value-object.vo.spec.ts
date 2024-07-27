import { ValueObject } from '../value-object.vo'

class ConcreteValueObject extends ValueObject {
  constructor(public readonly value: any) {
    super()
  }
}
describe('Value Object Unit Tests', () => {
  it('should return true when comparing two identical objects', () => {
    const obj1 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value2' })
    const obj2 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value2' })

    expect(obj1.equals(obj2)).toBe(true)
  })

  it('should return false when comparing objects with different properties', () => {
    const obj1 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value2' })
    const obj2 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value3' })

    expect(obj1.equals(obj2)).toBe(false)
  })

  it('should return false when comparing objects with different properties', () => {
    const obj1 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value2' })
    const obj2 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value3' })

    expect(obj1.equals(obj2)).toBe(false)
  })

  it('should return false when comparing with null', () => {
    const obj1 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value2' })

    expect(obj1.equals(null as any)).toBe(false)
  })

  it('should return false when comparing with undefined', () => {
    const obj1 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value2' })

    expect(obj1.equals(undefined as any)).toBe(false)
  })

  it('should return false when comparing objects with different constructor names', () => {
    class AnotherValueObject extends ValueObject {
      constructor(public readonly value: any) {
        super()
      }
    }

    const obj1 = new ConcreteValueObject({ prop1: 'value1', prop2: 'value2' })
    const obj2 = new AnotherValueObject({ prop1: 'value1', prop2: 'value2' })

    expect(obj1.equals(obj2)).toBe(false)
  })
})
