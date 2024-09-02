import { Chance } from 'chance'
import { SupplierId } from '../valueObjects'
import { Supplier } from '../entities'

type PropertyOrFactory<T> = T | ((index: number) => T)

export class SupplierFakerBuilder<TBuild = any> {
  private countsObjs: number
  private chance: Chance.Chance

  private constructor(counts: number = 1) {
    this.countsObjs = counts
    this.chance = new Chance()
  }
  private _id: PropertyOrFactory<SupplierId> | undefined = undefined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _name: PropertyOrFactory<string> | undefined = _index =>
    this.chance.name({ nationality: 'en' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _lastName: PropertyOrFactory<string> | undefined = _index =>
    this.chance.name({ nationality: 'en' })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _email: PropertyOrFactory<string> | undefined = _index =>
    this.chance.email({ domain: 'example.com' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _phone: PropertyOrFactory<string> | undefined = _index =>
    this.chance.phone({ country: 'uk', mobile: true })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _document: PropertyOrFactory<string> | undefined = _index =>
    this.chance.string({ length: 14, numeric: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _addresses:
    | PropertyOrFactory<{
        street: string
        number?: string
        complement?: string
        neighborhood: string
        city: string
        state: string
        country: string
      }>
    | undefined =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index => ({
      street: this.chance.street(),
      number: this.chance.address(),
      complement: this.chance.address(),
      neighborhood: this.chance.city(),
      city: this.chance.city(),
      state: this.chance.state(),
      country: this.chance.country(),
      postalCode: this.formatZipCode(
        this.chance.string({ length: 8, numeric: true })
      )
    })

  private _products: PropertyOrFactory<string[]> | undefined =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index => [this.chance.guid({ version: 4 })]

  static aSupplier(): SupplierFakerBuilder {
    return new SupplierFakerBuilder()
  }

  static theEmployees(counts: number): SupplierFakerBuilder {
    return new SupplierFakerBuilder<Supplier[]>(counts)
  }

  withEmployeeId(employeeId: PropertyOrFactory<SupplierId>): this {
    this._id = employeeId
    return this
  }

  withFirstName(firstName: PropertyOrFactory<string>): this {
    this._name = firstName
    return this
  }

  withLastName(lastName: PropertyOrFactory<string>): this {
    this._lastName = lastName
    return this
  }

  withEmail(email: PropertyOrFactory<string>): this {
    this._email = email
    return this
  }

  withPhone(phone: PropertyOrFactory<string>): this {
    this._phone = phone
    return this
  }

  withPassword(phone: PropertyOrFactory<string>): this {
    this._phone = phone
    return this
  }

  withDocument(document: PropertyOrFactory<string>): this {
    this._document = document
    return this
  }

  withAddress(address: PropertyOrFactory<any>): this {
    this._addresses = address
    return this
  }

  build(): TBuild {
    const employees = new Array(this.countsObjs)
      .fill(undefined)
      .map((_, index) => {
        const employee = new Supplier({
          id: !this._id ? undefined : this.callFactory(this._id, index),
          name: this.callFactory(this._name, index),
          lastName: this.callFactory(this._lastName, index),
          email: this.callFactory(this._email, index),
          phone: this.callFactory(this._phone, index),
          addresses: [this.callFactory(this._addresses, index)],
          products: this.callFactory(this._products, index),
          document: this.callFactory(this._document, index),
          isActive: true,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: new Date(),
          is_deleted: false,
          is_blocked: false
        })

        return employee
      })
    return this.countsObjs === 1 ? (employees[0] as any) : employees
  }

  private callFactory(factoryOrValue: PropertyOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue
  }

  private getValue(prop: any) {
    const optional = ['id', 'created_at']
    const privateProp = `_${prop}` as keyof this
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(`Property ${prop} not have a factory, use 'with' methods`)
    }
    return this.callFactory(this[privateProp], 0)
  }

  private formatZipCode(postalCode: string) {
    return postalCode.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  // getters

  get id() {
    return this.getValue('id')
  }

  get name() {
    return this.getValue('firstName')
  }

  get lastName() {
    return this.getValue('lastName')
  }

  get email() {
    return this.getValue('email')
  }

  get phone() {
    return this.getValue('phone')
  }

  get document() {
    return this.getValue('document')
  }

  get created_at() {
    return this.getValue('created_at')
  }
}
