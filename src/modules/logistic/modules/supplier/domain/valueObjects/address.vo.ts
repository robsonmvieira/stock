import { ValueObject } from '@modules/core/domain/valueObject'

export type CreateSupplierAddressCommandType = {
  street: string
  number?: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  country: string
  postalCode: string
}

export class AddressVO extends ValueObject {
  private readonly street: string
  private readonly number?: string
  private readonly complement?: string
  private readonly neighborhood: string
  private readonly city: string
  private readonly state: string
  private readonly country: string
  private readonly postalCode: string

  private constructor(data: CreateSupplierAddressCommandType) {
    super()
    this.validate(data)
    this.street = data.street
    this.number = data.number
    this.complement = data.complement
    this.neighborhood = data.neighborhood
    this.city = data.city
    this.state = data.state
    this.country = data.country
    this.postalCode = data.postalCode
  }

  static create(data: CreateSupplierAddressCommandType): AddressVO {
    return new AddressVO(data)
  }

  private validate(data: CreateSupplierAddressCommandType): boolean {
    if (!data.street || data.street.trim().length === 0) {
      throw new Error('Street is required and cannot be empty.')
    }

    if (!data.neighborhood || data.neighborhood.trim().length === 0) {
      throw new Error('Neighborhood is required and cannot be empty.')
    }

    if (!data.city || data.city.trim().length === 0) {
      throw new Error('City is required and cannot be empty.')
    }

    if (!data.state || data.state.trim().length === 0) {
      throw new Error('State is required and cannot be empty.')
    }

    if (!data.country || data.country.trim().length === 0) {
      throw new Error('Country is required and cannot be empty.')
    }

    if (!data.postalCode || !/^\d{5}-\d{3}$/.test(data.postalCode)) {
      throw new Error(
        'Postal code is required and must be in the format 00000-000.'
      )
    }

    return true
  }

  isValid(): boolean {
    try {
      this.validate({
        street: this.street,
        number: this.number,
        complement: this.complement,
        neighborhood: this.neighborhood,
        city: this.city,
        state: this.state,
        country: this.country,
        postalCode: this.postalCode
      })
      return true
    } catch {
      return false
    }
  }
  get value(): CreateSupplierAddressCommandType {
    return {
      street: this.street,
      number: this.number,
      complement: this.complement,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      country: this.country,
      postalCode: this.postalCode
    }
  }
}
