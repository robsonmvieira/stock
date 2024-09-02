import { UuidVO } from 'src/modules/core/domain/valueObject'

export class CategoryId extends UuidVO {
  constructor(value?: string) {
    super(value)
  }
}
