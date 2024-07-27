import { UuidVO } from 'src/modules/core/domain/valueObject'

export class EmployeeId extends UuidVO {
  constructor(value?: string) {
    super(value)
  }
}
