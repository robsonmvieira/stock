export class SupplierAddressesOutputProps {
  street: string

  number?: string

  complement?: string

  neighborhood: string

  city: string

  state: string

  country: string

  postalCode: string

  isActive?: boolean
}

export class SupplierOutput {
  createdAt: Date
  updatedAt: Date
  id: string
  name: string
  lastName: string
  document: string
  email: string
  phone: string
  isActive: boolean
  addresses: SupplierAddressesOutputProps[]

  constructor(supplier: any) {
    this.createdAt = supplier?.created_at
    this.updatedAt = supplier?.updated_at
    this.id = supplier?.id
    this.name = supplier?.name
    this.lastName = supplier?.lastName
    this.document = supplier?.document
    this.email = supplier?.email
    this.phone = supplier?.phone
    this.isActive = supplier?.isActive
    this.addresses = supplier?.addresses
  }
}
