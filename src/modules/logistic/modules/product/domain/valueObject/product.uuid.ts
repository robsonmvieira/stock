import { UuidVO } from 'src/modules/core/domain/valueObject'

export class ProductId extends UuidVO {
  constructor(value?: string) {
    super(value)
  }
}
