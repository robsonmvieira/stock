import { Entity } from 'src/modules/core/entities/entity'
import { ValueObject } from 'src/modules/core/valueObject'
import { EmployeeId } from '../valueObjects/employee.uuid'
import { EmailVO } from '../valueObjects/email.vo'
import { CPFVO } from '../valueObjects/cpf.vo'

export type CreateEmployeeCommand = {
  firstName: string
  lastName: string
  email: string
  phone: string
  hireDate: Date
  credencialNumber: string
  gestorId: string
  document: string
}

export type EmployeeProps = {
  id?: EmployeeId
  firstName: string
  lastName: string
  email: string
  phone: string
  hireDate: Date
  credencialNumber: string
  gestorId: string
  created_at?: Date
  updated_at?: Date
  document: string
}

export class Employee extends Entity {
  firstName: string
  lastName: string
  email: EmailVO
  phone: string
  hireDate: Date
  credencialNumber: string
  gestorId: string
  document: CPFVO

  constructor({
    firstName,
    lastName,
    email,
    phone,
    hireDate,
    credencialNumber,
    gestorId,
    document,
    id,
    created_at,
    updated_at
  }: EmployeeProps) {
    super(id, created_at, updated_at)
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = EmailVO.create(email)
    this.phone = phone
    this.hireDate = hireDate
    this.credencialNumber = credencialNumber
    this.gestorId = gestorId
    this.document = CPFVO.create(document)

    this.validate()
  }

  static create(command: CreateEmployeeCommand) {
    const employee = new Employee({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      phone: command.phone,
      hireDate: command.hireDate,
      credencialNumber: command.credencialNumber,
      gestorId: command.gestorId,
      document: command.document
    })
    return employee
  }

  validate() {
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
    const newDocument = CPFVO.create(document)
    if (!newDocument.isValid()) {
      this.addErrorOnContainer('Documento informado inválido', 'document')
    }
    this.document = newDocument
    this.validate()
  }

  private addErrorOnContainer(key: string, value: string): void {
    this.notification.addError(value, key)
  }

  get entity_id(): ValueObject {
    return this.id
  }
  toJSON() {
    return {
      id: this.id.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      hireDate: this.hireDate,
      credencialNumber: this.credencialNumber,
      gestorId: this.gestorId
    }
  }
}
