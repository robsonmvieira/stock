import { ValueObject } from 'src/modules/core/valueObject'

export class EmailVO extends ValueObject {
  private readonly email: string
  constructor(data: string) {
    super()
    this.validate(data)
    this.email = data
  }

  static create(data: string): EmailVO {
    return new EmailVO(data)
  }

  private validate(data: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(data).toLowerCase())
  }

  isValid(): boolean {
    return this.validate(this.email)
  }

  get value(): string {
    return this.email
  }
}
