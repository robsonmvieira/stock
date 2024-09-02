import { Entity } from '@modules/core/domain/entities'
import { EmailVO, ValueObject } from '@modules/core/domain/valueObject'
import { SupplierId } from '../valueObjects/supplier.uuid'
import {
  AddressVO,
  CreateSupplierAddressCommandType
} from '../valueObjects/address.vo'

import { CNPJVO } from '../valueObjects'
import { SupplierFakerBuilder } from '../tests/supplier.fake-builder'

export type CreateSupplierCommand = {
  name: string
  lastName: string
  email: string
  phone: string
  document: string
  isActive?: boolean
  addresses: CreateSupplierAddressCommandType[]
  products?: string[]
}

export type SupplierProps = {
  name: string
  lastName: string
  email: string
  phone: string
  document: string
  addresses: AddressVO[]
  products: string[]
  isActive?: boolean

  // entity properties
  id?: SupplierId
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
}

export class Supplier extends Entity {
  name: string
  lastName: string
  email: EmailVO
  phone: string
  isActive?: boolean
  document: CNPJVO
  addresses: AddressVO[]
  products?: string[]

  constructor({
    id,
    name,
    lastName,
    email,
    phone,
    addresses,
    products,
    document,
    isActive,
    created_at,
    updated_at,
    deleted_at,
    is_deleted,
    is_blocked
  }: SupplierProps) {
    super(id, created_at, updated_at, is_deleted, is_blocked, deleted_at)

    this.name = name
    this.lastName = lastName
    this.email = EmailVO.create(email)
    this.phone = phone
    this.document = CNPJVO.create(document)
    this.addresses = [...addresses]
    this.isActive = isActive ?? true
    this.products = [...products]
  }

  static create(command: CreateSupplierCommand) {
    const supplier = new Supplier({
      name: command.name,
      lastName: command.lastName,
      email: command.email,
      phone: command.phone,
      document: command.document,
      products: [...command.products],
      isActive: command.isActive,
      addresses: command.addresses.map(address => AddressVO.create(address)),
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
      is_deleted: false,
      is_blocked: false
    })
    return supplier
  }

  static fake() {
    return SupplierFakerBuilder
  }
  validate() {
    this.someAddressIsInvalid()
    this.emailIsValid()
  }

  emailIsValid(): boolean {
    if (!this.email.isValid()) {
      this.addErrorOnContainer('E-Mail inválido', 'email')
      return false
    }

    return true
  }

  updateEmail(email: string) {
    const newEmail = EmailVO.create(email)
    if (!newEmail.isValid()) {
      this.addErrorOnContainer('E-Mail inválido', 'email')
    }
    this.email = EmailVO.create(email)
    this.validate()
  }

  documentIsValid(): boolean {
    if (!this.document.isValid()) {
      this.addErrorOnContainer('Documento informado inválido', 'document')
      return false
    }
    return true
  }
  updateDocument(document: string) {
    const newDocument = CNPJVO.create(document)
    if (!newDocument.isValid()) {
      this.addErrorOnContainer('Documento informado inválido', 'document')
    }
    this.document = newDocument
    this.validate()
  }

  changeName(newName: string) {
    if (!newName) {
      this.addErrorOnContainer('Nome inválido', 'nome')
      return false
    }

    if (newName.length < 3) {
      this.addErrorOnContainer('Nome inválido', 'nome')
      return false
    }
    this.name = newName
  }

  addNewAddress(newAddress: CreateSupplierAddressCommandType) {
    const address = AddressVO.create(newAddress)
    if (!address.isValid()) {
      this.addErrorOnContainer('Endereço inválido', 'endereço')
      return false
    }

    this.addresses = [...this.addresses, address]
  }

  removeAddress(command: CreateSupplierAddressCommandType) {
    if (!this.addresses) return
    const add = AddressVO.create(command).value
    this.addresses = this.addresses.filter(address => address.value === add)
  }

  someAddressIsInvalid(): boolean {
    const invalidAddresses = this.addresses.some(address => !address.isValid())

    if (invalidAddresses) {
      this.addErrorOnContainer('Endereço inválido', 'endereço')
      return true
    }

    return false
  }

  get entity_id(): ValueObject {
    return this.id
  }
  toJSON() {
    return {
      id: this.id.id,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      addresses: this.addresses
    }
  }
}
