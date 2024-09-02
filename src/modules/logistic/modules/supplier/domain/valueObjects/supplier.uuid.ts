import { UuidVO } from 'src/modules/core/domain/valueObject'

export class SupplierId extends UuidVO {
  constructor(value?: string) {
    super(value)
  }
}
