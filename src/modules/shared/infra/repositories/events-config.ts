import { ProductBlockedEvent } from '@modules/logistic/modules/product/domain/events'

export const EVENTS_CONFIG = {
  [ProductBlockedEvent.name]: {
    routingKey: ProductBlockedEvent.name,
    exchange: 'amqp.direct'
  }
}
