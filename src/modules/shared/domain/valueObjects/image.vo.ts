import { ValueObject } from '@modules/core/domain/valueObject'

export abstract class ImageVO extends ValueObject {
  private readonly _name: string
  private readonly _url: string

  constructor({ name, url }: { name: string; url: string }) {
    super()
    this._name = name
    this._url = url
  }

  get name(): string {
    return this._name
  }

  get url(): string {
    return this._url
  }
}
