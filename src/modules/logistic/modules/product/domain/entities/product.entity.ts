import { Entity } from '@modules/core/domain/entities'
import { ValueObject } from '@modules/core/domain/valueObject'

export class Product extends Entity {
  get entity_id(): ValueObject {
    throw new Error('Method not implemented.')
  }
  toJSON() {
    throw new Error('Method not implemented.')
  }
}
