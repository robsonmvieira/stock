import { Supplier } from './supplier.entity'

describe('Supplier Entity Unit Tests', () => {
  it('should create a supplier', () => {
    const supplier = Supplier.fake().aSupplier().build()
    console.log(supplier)
    expect(supplier).toBeDefined()
  })
})
