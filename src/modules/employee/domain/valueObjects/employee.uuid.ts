import { UuidVO } from 'src/modules/core/valueObject'

export class EmployeeId extends UuidVO {
  constructor(value?: string) {
    super(value)
  }
}
