import { ProductBlockedIntegrationEvent } from '@modules/logistic/modules/product/domain/events'

export const EVENTS_CONFIG = {
  [ProductBlockedIntegrationEvent.name]: {
    routing_key: ProductBlockedIntegrationEvent.name,
    exchange: 'amq.direct'
  }
}
