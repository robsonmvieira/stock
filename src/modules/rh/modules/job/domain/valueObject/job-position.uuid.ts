import { UuidVO } from 'src/modules/core/domain/valueObject'

export class JobPositionId extends UuidVO {
  constructor(value?: string) {
    super(value)
  }
}
