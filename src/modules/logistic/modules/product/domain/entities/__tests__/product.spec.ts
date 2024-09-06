import { Product } from '../product.entity'

describe('Product Unit Test', () => {
  it('shoulde create a product with id', () => {
    const product = Product.fake().aProduct().build()

    expect(product.id).toBeDefined()
  })
})
