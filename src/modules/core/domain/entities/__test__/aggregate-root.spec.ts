import { AggregateRoot, IDomainEvent } from '..'
import { UuidVO } from '../../valueObject'

class PriceChangedDomanEvent implements IDomainEvent {
  aggregateId: UuidVO
  aggregateName: string
  aggregateVersion: number
  createdAt: Date
  createdBy: string
  data: any

  constructor(
    aggregateId: UuidVO,
    aggregateName: string,
    aggregateVersion: number,
    data: any
  ) {
    this.aggregateId = aggregateId
    this.aggregateName = aggregateName
    this.aggregateVersion = aggregateVersion
    this.createdAt = new Date()
    this.createdBy = 'user Logged'
    this.data = data
  }
}

class StubAggregateRoot extends AggregateRoot {
  name: string

  price: number

  constructor(name: string, price: number) {
    super()
    this.name = name
    this.price = price
    this.registerHandlers(StubAggregateRoot.name, this.changePrice.bind(this))
  }

  get entity_id(): UuidVO {
    return this.id
  }
  toJSON() {
    return {
      name: this.name,
      price: this.price
    }
  }

  changePrice(price: number) {
    this.price = price
    this.applyEvent(
      new PriceChangedDomanEvent(this.id, StubAggregateRoot.name, 1, {
        price
      })
    )
  }
}

describe('AggregateRoot', () => {
  it('should dispatch events', () => {
    const aggregateRoot = new StubAggregateRoot('test', 10)
    aggregateRoot.changePrice(20)
    expect(aggregateRoot.events.size).toBe(1)
    expect(aggregateRoot.price).toBe(20)
  })
})
