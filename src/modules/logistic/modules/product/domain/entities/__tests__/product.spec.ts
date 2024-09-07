import { Product } from '../product.entity'

describe('Product Unit Test', () => {
  it('shoulde create a product with id', () => {
    const product = Product.fake().aProduct().build()

    expect(product.id).toBeDefined()
  })

  it('should block a product', () => {
    const product = Product.fake().aProduct().build()
    product.blockProduct('any_user_id')
    expect(product.is_blocked).toBeTruthy()
  })
})
